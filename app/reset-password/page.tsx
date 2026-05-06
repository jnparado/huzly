"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Supabase sets a session from the recovery link tokens in URL.
    // We just check if we have a session before allowing password update.
    let cancelled = false;
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setError(error.message);
        } else if (!data.session) {
          setError("Invalid or expired reset link. Please request a new one.");
        }
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      if (!password) throw new Error("Enter a new password.");
      if (password.length < 8) throw new Error("Password must be at least 8 characters.");
      if (password !== confirm) throw new Error("Passwords do not match.");

      setSubmitting(true);
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) throw updateError;

      setSuccess(true);
      window.setTimeout(() => router.push("/login"), 900);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to update password";
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
          <div className="mt-2 text-sm text-zinc-500">New Password</div>
        </div>

        {success ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Password updated. Redirecting…
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <div className="mb-1 text-sm font-medium text-zinc-700">
                New password
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                required
                disabled={!ready || !!error}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 disabled:bg-zinc-100"
              />
            </label>

            <label className="block">
              <div className="mb-1 text-sm font-medium text-zinc-700">
                Confirm password
              </div>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type="password"
                autoComplete="new-password"
                required
                disabled={!ready || !!error}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 disabled:bg-zinc-100"
              />
            </label>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting || !ready || !!error}
              className="w-full rounded-xl bg-[#2F6FDB] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update password"}
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

