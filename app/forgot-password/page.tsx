"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

function getOrigin() {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

export default function ForgotPasswordPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const trimmed = email.trim();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        trimmed,
        {
          redirectTo: `${getOrigin()}/reset-password`,
        }
      );

      if (resetError) throw resetError;
      setSent(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to send reset email";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-full flex flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-sm px-6 py-10">
        <div className="mb-8 text-center">
          <div className="text-3xl font-semibold tracking-tight">Huzly</div>
          <div className="mt-2 text-sm text-zinc-500">Forgot Password</div>
        </div>

        {sent ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              If an account exists for <span className="font-medium">{email}</span>
              , we sent a password reset link.
            </div>
            <Link className="text-sm text-zinc-600 underline" href="/login">
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <div className="mb-1 text-sm font-medium text-zinc-700">Email</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="you@domain.com"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
              />
            </label>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[#2F6FDB] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send reset link"}
            </button>

            <div className="text-center text-sm">
              <Link className="text-zinc-600 underline" href="/login">
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

