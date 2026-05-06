"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function ForgotPasswordOtpPhonePage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const trimmed = phone.trim();
      const { error: authError } = await supabase.auth.signInWithOtp({
        phone: trimmed,
      });
      if (authError) throw authError;

      router.push(`/reset-password-phone-otp?phone=${encodeURIComponent(trimmed)}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to send reset code";
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

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <div className="mb-1 text-sm font-medium text-zinc-700">Phone</div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="+63 9xx xxx xxxx"
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
            {submitting ? "Sending..." : "Send code"}
          </button>

          <div className="text-center text-sm">
            <Link className="text-zinc-600 underline" href="/login/phone">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

