import { z } from 'zod';

// ---------------------------------------------------------------------------
// Sanitization
// ---------------------------------------------------------------------------
//
// Supabase's query builder (used everywhere in this app) parameterizes every
// query, so classic SQL injection isn't possible through it — and React
// escapes all rendered text by default, so stored values can't execute as
// script in this app's own UI. `sanitizeText` is still applied to free-text
// fields (name, message, etc.) as defense in depth: it strips control
// characters and raw HTML tags so nothing unexpected survives into exports,
// emails, admin tooling, or any future consumer of this data that might not
// escape output as carefully.
export function sanitizeText(input: string): string {
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // control chars
    .replace(/<[^>]*>/g, '') // strip HTML/script tags
    .trim();
}

// ---------------------------------------------------------------------------
// Field schemas
// ---------------------------------------------------------------------------

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .max(160, 'Email is too long')
  .email('Enter a valid email')
  .transform((v) => v.toLowerCase());

// Passwords are never run through sanitizeText/trim beyond what zod does
// implicitly (a stray leading/trailing space is significant to a user's
// intended password) — only length- and character-class-checked. Actual
// hashing/storage is handled entirely by Supabase Auth (bcrypt), never by
// this app's own code.
export const strongPasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must be under 72 characters') // bcrypt's own input limit
  .regex(/[a-z]/, 'Password must include a lowercase letter')
  .regex(/[A-Z]/, 'Password must include an uppercase letter')
  .regex(/[0-9]/, 'Password must include a number')
  .regex(/[^A-Za-z0-9]/, 'Password must include a special character');

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'Please enter your name')
  .max(80, 'Name is too long')
  .regex(/^[\p{L}\p{M}\s'.-]+$/u, 'Name contains invalid characters');

// ---------------------------------------------------------------------------
// Form schemas
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  email: emailSchema,
  // Intentionally lenient on the login path itself — an existing account's
  // password might predate the current strength policy. Strength is only
  // enforced at signup/password-change time.
  password: z.string().min(1, 'Password is required').max(200, 'Password is too long'),
});

export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: strongPasswordSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
