import Link from "next/link";

export default function AccountCreatedPage() {
  return (
    <div className="min-h-full flex items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-zinc-100 overflow-hidden">
        <div className="p-10 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#E8F0FF] text-[#2F6FDB]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-9 w-9"
            >
              <path d="M12 2l4 7H8l4-7Z" />
              <path d="M4 9l4 13h8l4-13" />
            </svg>
          </div>

          <div className="text-xl font-semibold text-zinc-900">
            Your account has been created!
          </div>
          <div className="mt-3 text-sm leading-6 text-zinc-500">
            Congrats! As you start your journey in Huzly, you can start creating
            your Organization and Location before you can start posting your
            gigs.
          </div>
          <div className="mt-4 text-sm text-zinc-500">
            If you need help you can email{" "}
            <a className="text-[#2F6FDB] underline" href="mailto:support@huzly.com">
              support@huzly.com
            </a>{" "}
            and we’ll get back to you ASAP.
          </div>

          <div className="mt-8">
            <Link
              href="/onboarding"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#2F6FDB] px-5 py-3 text-sm font-semibold text-white"
            >
              Add an Organization
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

