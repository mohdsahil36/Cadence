/**
 * Auth actions — implement these yourself.
 *
 * Suggested flow:
 *   client form → call these → Express/API route (Zod validate) → Clerk/Supabase → response
 *
 * Do not put LLM or scoring logic here. Keep secrets on the server.
 */

export type AuthMode = "login" | "signup";

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

/** Sign in with email/password. */
export async function loginWithEmail(_input: LoginInput): Promise<void> {
  // Implement: POST credentials to your auth route, then redirect (e.g. /dashboard).
}

/** Create account with email/password. */
export async function signupWithEmail(_input: SignupInput): Promise<void> {
  // Implement: validate confirmPassword match client-side, then POST to signup route.
}

/** Google OAuth / social sign-in. */
export async function loginWithGoogle(): Promise<void> {
  // Implement: start OAuth (Clerk/Google), handle callback redirect.
}
