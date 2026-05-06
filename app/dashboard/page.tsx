import Link from "next/link";

export default function DashboardHome() {
  return (
    <div className="min-h-full flex items-center justify-center p-8">
      <div className="w-full max-w-lg rounded-2xl bg-white/80 backdrop-blur border border-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-8 text-center">
        <div className="text-2xl font-semibold text-zinc-900">Dashboard</div>
        <div className="mt-2 text-sm text-zinc-500">
          Placeholder home. Jump to the success screen.
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            href="/dashboard/account-created"
            className="rounded-xl bg-[#2F6FDB] px-5 py-3 text-sm font-semibold text-white"
          >
            View account created screen
          </Link>
        </div>
      </div>
    </div>
  );
}

