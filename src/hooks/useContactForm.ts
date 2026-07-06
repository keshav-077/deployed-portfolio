import { useCallback, useState } from "react";

import { validateContact, type ValidationResult } from "@/lib/validation";
import { sendContact } from "@/lib/emailClient";
import type { ContactFormValues, SendResult } from "@/data/types";

/**
 * useContactForm — contact form state, client-side validation, and submission
 * lifecycle (R6.3, R6.4, R6.5, R6.6).
 *
 * State machine:
 *   - `idle`       initial state before any submission attempt
 *   - `error`      client validation failed, or delivery failed (values retained)
 *   - `submitting` a submission is in flight (duplicate submissions prevented)
 *   - `success`    delivery confirmed (input fields cleared)
 *   - `rate_limited` the email service rejected the submission as rate limited
 *
 * Behavior:
 *   - `setField` updates a single field and clears that field's error (R6.6).
 *   - `submit` runs {@link validateContact} first; on invalid it sets the
 *     offending field's error message and status `error`, and does NOT call
 *     `sendContact` (R6.6). On valid it enters `submitting`, prevents duplicate
 *     submissions while in flight (R6.3), and calls `sendContact`:
 *       - `{ ok: true }`                    -> `success`, input fields cleared (R6.4)
 *       - `{ ok: false, reason: 'rate_limited' }` -> `rate_limited`, values retained
 *       - any other failure                 -> `error`, values retained (R6.5)
 */

export type ContactStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "rate_limited";

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

export interface UseContactForm {
  values: ContactFormValues;
  errors: ContactErrors;
  status: ContactStatus;
  setField: (field: keyof ContactFormValues, value: string) => void;
  submit: () => Promise<void>;
}

/** Empty form: every field starts as an empty string (including the honeypot). */
const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  message: "",
  website: "",
};

/** Per-field validation messages surfaced to the visitor (R6.6). */
const FIELD_MESSAGES: Record<"name" | "email" | "message", string> = {
  name: "Please enter your name (1–100 characters).",
  email: "Please enter a valid email address.",
  message: "Please enter a message (1–2000 characters).",
};

export function useContactForm(): UseContactForm {
  const [values, setValues] = useState<ContactFormValues>({ ...INITIAL_VALUES });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<ContactStatus>("idle");

  const setField = useCallback(
    (field: keyof ContactFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      // Clear this field's error as the visitor edits it (R6.6).
      setErrors((prev) => {
        if (!(field in prev)) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  const submit = useCallback(async () => {
    // Prevent duplicate submissions while a request is in flight (R6.3).
    if (status === "submitting") return;

    // Client-side validation runs first; on failure we do not call the
    // transport and we surface a per-field message (R6.6).
    const result = validateContact(values);
    if (!result.valid) {
      // Explicit cast: this project compiles with `strictNullChecks: false`,
      // under which TypeScript does not narrow discriminated unions on a
      // boolean discriminant.
      const { field } = result as Extract<ValidationResult, { valid: false }>;
      setErrors({ [field]: FIELD_MESSAGES[field] });
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const sendResult = await sendContact(values);

      if (sendResult.ok) {
        // Clear input fields on confirmed delivery (R6.4).
        setValues({ ...INITIAL_VALUES });
        setStatus("success");
        return;
      }

      // Explicit cast for the failure member (see note above re: strictNullChecks).
      const { reason } = sendResult as Extract<SendResult, { ok: false }>;
      if (reason === "rate_limited") {
        // Retain values so the visitor can retry once the window resets.
        setStatus("rate_limited");
        return;
      }

      // Validation/delivery failure — retain entered values (R6.5).
      setStatus("error");
    } catch {
      // Network/timeout or unexpected failure — retain values (R6.5).
      setStatus("error");
    }
  }, [status, values]);

  return { values, errors, status, setField, submit };
}
