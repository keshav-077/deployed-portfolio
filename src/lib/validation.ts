// Contact form validation — pure, framework-free logic (aside from zod).
// Implements the client + server validation contract from design.md
// (Correctness Property 19) and Requirements R6.1 and R6.6.
//
// Validity rules (all must hold for a submission to be valid):
//   - name    length in [1, 100]
//   - email   length in [1, 254] AND a non-empty local part, exactly one '@'
//             separator, and a domain containing at least one dot
//   - message length in [1, 2000]
// The honeypot `website` field is a separate concern (handled in the email
// transport / serverless endpoint) and is not validated here.

import { z } from 'zod';
import type { ContactFormValues } from '@/data/types';

/**
 * Result of validating a contact submission.
 *
 * When invalid, `field` identifies the offending field so the UI can surface a
 * targeted validation message (R6.6). Fields are checked in the order
 * name -> email -> message, so `field` is the first field that failed.
 */
export type ValidationResult =
  | { valid: true }
  | { valid: false; field: 'name' | 'email' | 'message' };

/** Bounds sourced from R6.1 / R6.6. */
const NAME_MIN = 1;
const NAME_MAX = 100;
const EMAIL_MIN = 1;
const EMAIL_MAX = 254;
const MESSAGE_MIN = 1;
const MESSAGE_MAX = 2000;

/**
 * Structural email check (R6.6): a non-empty local part, exactly one '@'
 * separator, and a domain containing at least one dot. Length limits are
 * enforced separately by {@link validateContact}.
 */
export function isValidEmail(email: string): boolean {
  const parts = email.split('@');
  // Exactly one '@' separator => split yields exactly two segments.
  if (parts.length !== 2) return false;

  const [local, domain] = parts;
  // Non-empty local part.
  if (local.length === 0) return false;
  // Domain must contain at least one dot.
  if (!domain.includes('.')) return false;

  return true;
}

/**
 * Zod schema describing a valid {@link ContactFormValues} submission.
 * The honeypot `website` field accepts any string (validated elsewhere).
 *
 * Note: the type is left to Zod's inference rather than annotated as
 * `z.ZodType<ContactFormValues>` because this project compiles with
 * `strict: false`, under which Zod infers object properties as optional and an
 * explicit `z.ZodType<ContactFormValues>` annotation fails the invariance
 * check. The runtime shape validated here is exactly `ContactFormValues`.
 */
export const contactSchema = z.object({
  name: z.string().min(NAME_MIN).max(NAME_MAX),
  email: z
    .string()
    .min(EMAIL_MIN)
    .max(EMAIL_MAX)
    .refine(isValidEmail, { message: 'Invalid email address' }),
  message: z.string().min(MESSAGE_MIN).max(MESSAGE_MAX),
  website: z.string(),
});

/**
 * Validates contact form values. Returns `{ valid: true }` when every field
 * satisfies its rule, otherwise `{ valid: false, field }` identifying the first
 * offending field. See Correctness Property 19.
 */
export function validateContact(values: ContactFormValues): ValidationResult {
  const { name, email, message } = values;

  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    return { valid: false, field: 'name' };
  }

  if (email.length < EMAIL_MIN || email.length > EMAIL_MAX || !isValidEmail(email)) {
    return { valid: false, field: 'email' };
  }

  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    return { valid: false, field: 'message' };
  }

  return { valid: true };
}
