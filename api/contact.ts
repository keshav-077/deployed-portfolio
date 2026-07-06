/**
 * /api/contact — Vercel serverless function for contact form delivery.
 *
 * Implements the serverless endpoint contract from design.md and
 * Requirements R6.2, R6.6, R6.7, R6.8, R6.10:
 *
 *   1. Only POST is accepted; other methods -> 405.
 *   2. Parse the JSON body { name, email, message, website (honeypot) }.
 *   3. If the honeypot `website` field is non-empty  -> 200 { ok: true }
 *      WITHOUT contacting Resend (silently dropped).             [R6.7]
 *   4. Re-validate name/email/message server-side; on invalid   [R6.6]
 *      -> 400 { error: 'validation', field }.
 *   5. Rate limit by client key (IP) over a rolling 10-minute    [R6.8]
 *      window, max 5, using rateLimit.ts -> 429 { rateLimited: true }.
 *   6. Send via Resend using RESEND_API_KEY from the environment [R6.2, R6.10];
 *      missing key or a Resend error -> 500 { error: 'delivery' }.
 *   7. On success -> 200 { ok: true }.
 *
 * The RESEND_API_KEY secret is read only from process.env and is never
 * hardcoded or shipped in client source (R6.10). It must be configured in
 * the deployment environment (e.g. Vercel Project Environment Variables).
 *
 * Note: this file lives under `api/` which is outside the app's
 * `tsconfig.app.json` (`include: ["src"]`) scope. It is compiled by the
 * host's serverless build (Vercel `@vercel/node`), which resolves
 * dependencies and type-only imports independently of the app build.
 */

import { Resend } from 'resend';
import { validateContact } from '../src/lib/validation';
import { isRateLimited, recordSubmission } from '../src/lib/rateLimit';
import type { ContactFormValues } from '../src/data/types';

/** Owner destination address for contact submissions (R6.2). */
const OWNER_EMAIL = 'keshavardhan777@gmail.com';

/**
 * Resend requires a verified sender. `onboarding@resend.dev` is Resend's
 * shared testing sender that works without domain verification; replace with
 * a verified domain sender once configured.
 */
const FROM_ADDRESS = 'Portfolio Contact <onboarding@resend.dev>';

/**
 * Module-scoped in-memory store mapping a client key (IP) to the timestamps
 * of its recent submissions. Serverless instances are ephemeral, so this is a
 * best-effort rolling-window limiter per warm instance (R6.8).
 */
const submissionStore = new Map<string, number[]>();

/** Minimal request/response shapes for the Node serverless runtime. */
interface ApiRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
}

/**
 * Derives a client key from the request. Prefers the first entry of
 * `x-forwarded-for` (the original client IP behind proxies), falling back to
 * the socket remote address, then a constant so limiting still applies.
 */
function getClientKey(req: ApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const forwardedValue = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  if (forwardedValue) {
    const first = forwardedValue.split(',')[0].trim();
    if (first) return first;
  }
  return req.socket?.remoteAddress || 'unknown';
}

/** Parses the request body into an object, tolerating string or object bodies. */
function parseBody(body: unknown): Record<string, unknown> {
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
    } catch {
      return {};
    }
  }
  if (body && typeof body === 'object') {
    return body as Record<string, unknown>;
  }
  return {};
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  // 1. Only accept POST.
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  // 2. Parse the JSON body.
  const raw = parseBody(req.body);
  const values: ContactFormValues = {
    name: typeof raw.name === 'string' ? raw.name : '',
    email: typeof raw.email === 'string' ? raw.email : '',
    message: typeof raw.message === 'string' ? raw.message : '',
    website: typeof raw.website === 'string' ? raw.website : '',
  };

  // 3. Honeypot: silently drop without contacting Resend (R6.7).
  if (values.website.trim().length > 0) {
    res.status(200).json({ ok: true });
    return;
  }

  // 4. Server-side re-validation (R6.6).
  const result = validateContact(values);
  if (result.valid === false) {
    res.status(400).json({ error: 'validation', field: result.field });
    return;
  }

  // 5. Rolling-window rate limiting by client key (R6.8).
  const clientKey = getClientKey(req);
  const now = Date.now();
  const history = submissionStore.get(clientKey) ?? [];
  if (isRateLimited(history, now)) {
    res.status(429).json({ rateLimited: true });
    return;
  }
  submissionStore.set(clientKey, recordSubmission(history, now));

  // 6. Send via Resend using the env secret (R6.2, R6.10).
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'delivery' });
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      replyTo: values.email,
      subject: `Portfolio contact from ${values.name}`,
      text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
    });

    if (error) {
      res.status(500).json({ error: 'delivery' });
      return;
    }
  } catch {
    res.status(500).json({ error: 'delivery' });
    return;
  }

  // 7. Success.
  res.status(200).json({ ok: true });
}
