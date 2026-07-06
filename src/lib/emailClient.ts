import type { ContactFormValues, SendResult } from '@/data/types';

/**
 * Client transport to the serverless contact endpoint (R6.2, R6.5, R6.7).
 *
 * Framework-free and testable: the only external dependency is the global
 * `fetch`/`AbortController`, both of which are available in the browser and in
 * the test environment. All non-success outcomes are normalized into the
 * `SendResult` discriminated union so callers never see raw network errors.
 */

/** Endpoint contract path (see design.md "Serverless endpoint"). */
const CONTACT_ENDPOINT = '/api/contact';

/** Delivery must be confirmed within 30 seconds or it is treated as a failure (R6.2, R6.5). */
const REQUEST_TIMEOUT_MS = 30_000;

/**
 * Submits a contact message.
 *
 * Behavior:
 * - If the honeypot `website` field is non-empty, the submission is silently
 *   dropped and resolves to `{ ok: true }` WITHOUT any network call. This is
 *   the client half of the honeypot defense (Property 20 / R6.7): the email
 *   transport is never invoked for bot submissions.
 * - Otherwise the payload is POSTed as JSON to `/api/contact` with a 30s
 *   timeout enforced via `AbortController`.
 *
 * Response mapping:
 * - `200` -> `{ ok: true }`
 * - `429` (or a `{ rateLimited: true }` body) -> `{ ok: false, reason: 'rate_limited' }`
 * - `400` (or a `{ error, field }` body) -> `{ ok: false, reason: 'validation' }`
 * - any other status, network error, or timeout -> `{ ok: false, reason: 'delivery' }`
 */
export async function sendContact(payload: ContactFormValues): Promise<SendResult> {
  // Honeypot short-circuit: drop silently before any transport (R6.7, Property 20).
  // A filled honeypot indicates an automated submission; we mimic success to the
  // caller and never contact the email service.
  if (payload.website != null && payload.website !== '') {
    return { ok: true };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        website: payload.website,
      }),
      signal: controller.signal,
    });

    if (response.status === 200) {
      return { ok: true };
    }

    if (response.status === 429) {
      return { ok: false, reason: 'rate_limited' };
    }

    if (response.status === 400) {
      return { ok: false, reason: 'validation' };
    }

    // Any other status (500, unexpected codes, etc.) is a delivery failure (R6.5).
    return { ok: false, reason: 'delivery' };
  } catch {
    // Network error or timeout abort -> delivery failure (R6.5).
    return { ok: false, reason: 'delivery' };
  } finally {
    clearTimeout(timeoutId);
  }
}
