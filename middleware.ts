import type { NextRequest } from "next/server";
import { updateSupabaseSession } from "./lib/supabase/middleware";

export function middleware(request: NextRequest) {
  return updateSupabaseSession(request);
}

export const config = {
  matcher: [
    /*
      Match all request paths except for:
      - _next/static (static files)
      - _next/image (image optimization files)
      - favicon.ico (favicon file)
      - public assets
    */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

