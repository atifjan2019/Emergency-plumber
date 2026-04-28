'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction, type LoginState } from './actions';

const initial: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-primary px-5 py-3 text-base font-semibold text-white shadow hover:bg-primary-dark disabled:opacity-60"
    >
      {pending ? 'Checking...' : 'Sign in'}
    </button>
  );
}

export default function LoginForm() {
  const [state, action] = useActionState(loginAction, initial);
  return (
    <form action={action} className="space-y-4">
      <label className="block">
        <span className="text-sm font-semibold text-ink">Passcode</span>
        <input
          type="password"
          name="passcode"
          required
          autoComplete="off"
          inputMode="numeric"
          autoFocus
          className="mt-1.5 w-full rounded-lg border border-gray-line bg-white px-3.5 py-2.5 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </label>
      {state.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
