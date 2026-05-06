import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function NavIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-xl text-white/90 hover:bg-white/10">
      {children}
    </div>
  );
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  return (
    <div className="min-h-full flex">
      <aside className="w-16 bg-[#0C2A52] flex flex-col items-center py-4">
        <div className="mb-6 grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white font-bold">
          H
        </div>

        <nav className="flex flex-1 flex-col items-center gap-2">
          <Link href="/dashboard" aria-label="Home">
            <NavIcon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="M3 12l9-9 9 9" />
                <path d="M9 21V9h6v12" />
              </svg>
            </NavIcon>
          </Link>
          <Link href="/dashboard/account-created" aria-label="Account">
            <NavIcon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </NavIcon>
          </Link>
          <div className="h-2" />
          <NavIcon>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M4 9h16" />
              <path d="M9 4v16" />
            </svg>
          </NavIcon>
          <NavIcon>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M8 6h13" />
              <path d="M8 12h13" />
              <path d="M8 18h13" />
              <path d="M3 6h.01" />
              <path d="M3 12h.01" />
              <path d="M3 18h.01" />
            </svg>
          </NavIcon>
        </nav>

        <div className="mb-2">
          <NavIcon>
            <LogoutButton className="grid h-10 w-10 place-items-center" />
          </NavIcon>
        </div>
      </aside>

      <main className="flex-1 bg-[radial-gradient(circle_at_top,_#f2f6ff_0,_#eef3fb_40%,_#e8effa_100%)]">
        {children}
      </main>
    </div>
  );
}

