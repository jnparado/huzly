import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50">
      <main className="w-full max-w-sm px-6 py-10">
        <div className="text-center">
          <div className="text-4xl font-semibold tracking-tight">Huzly</div>
          <div className="mt-2 text-sm text-zinc-500">
            Email or phone sign up / login
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/onboarding"
            className="w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Start onboarding
          </Link>
          <Link
            href="/signup"
            className="w-full rounded-xl bg-[#2F6FDB] px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Sign up (email)
          </Link>
          <Link
            href="/login"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-900"
          >
            Log in (email)
          </Link>
          <div className="h-px bg-zinc-200 my-2" />
          <Link
            href="/signup/phone"
            className="w-full rounded-xl bg-[#2F6FDB] px-4 py-3 text-center text-sm font-semibold text-white"
          >
            Sign up (phone)
          </Link>
          <Link
            href="/login/phone"
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center text-sm font-semibold text-zinc-900"
          >
            Log in (phone)
          </Link>
        </div>
      </main>
    </div>
  );
}
