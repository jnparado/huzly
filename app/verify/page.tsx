"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

function VerifyInner() {
  const router = useRouter();
  const params = useSearchParams();
  const email = (params.get("email") ?? "").trim();

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (!email) throw new Error("Missing email. Go back and enter your email.");
      const token = code.trim();
      if (!token) throw new Error("Enter the code from your email.");

      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });

      if (verifyError) throw verifyError;

      setSuccess(true);
      window.setTimeout(() => router.push("/onboarding"), 800);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to verify code";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm px-6 py-10">
      <div className="mb-6 text-center">
        <div className="text-3xl font-semibold tracking-tight">Enter Code</div>
        <div className="mt-2 text-sm text-zinc-500">
          We sent a login code to{" "}
          <span className="font-medium text-zinc-700">{email || "your email"}</span>
        </div>
      </div>

      {success ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Success! Redirecting…
        </div>
      ) : (
        <form onSubmit={onVerify} className="space-y-4">
          <label className="block">
            <div className="mb-1 text-sm font-medium text-zinc-700">Code</div>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="123456"
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
            {submitting ? "Verifying..." : "Verify Code"}
          </button>

          <div className="text-center text-sm">
            <Link className="text-zinc-600 underline" href="/login">
              Back to login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-full flex flex-col bg-zinc-50">
      <Suspense fallback={null}>
        <VerifyInner />
      </Suspense>
    </div>
  );
}

