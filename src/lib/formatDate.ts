import { format, isValid, parseISO } from 'date-fns';

/**
 * Formats an ISO date string into a human-readable calendar date (R10.1).
 *
 * Pure and framework-free. Handles invalid input gracefully by returning an
 * empty string rather than throwing, so callers can omit the field when the
 * source value is missing or unparseable (R2.9, R10.5).
 *
 * @param iso - An ISO 8601 date string (e.g. GitHub's `updated_at`).
 * @returns A human-readable date such as "Jan 5, 2024", or "" when invalid.
 */
export function formatUpdatedDate(iso: string): string {
  if (typeof iso !== 'string' || iso.trim() === '') {
    return '';
  }

  // parseISO handles full ISO timestamps; fall back to the Date constructor
  // for other reasonable formats before giving up.
  let parsed = parseISO(iso);
  if (!isValid(parsed)) {
    parsed = new Date(iso);
  }
  if (!isValid(parsed)) {
    return '';
  }

  return format(parsed, 'MMM d, yyyy');
}
