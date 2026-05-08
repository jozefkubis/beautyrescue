import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function getSupabaseProxyConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return { supabaseUrl, supabaseAnonKey };
}

// Slovensky: Proxy middleware funkcia, ktorá rieši synchronizáciu session a ochranu admin routy
export async function proxy(request: NextRequest) {
  // Vytvorí odpoveď, ktorú môžeme neskôr upraviť (napr. pridať cookies)
  let response = NextResponse.next({
    request,
  });
  const { supabaseUrl, supabaseAnonKey } = getSupabaseProxyConfig();

  // Inicializuje Supabase klienta na serveri, aby vedel získať info o userovi zo session
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      // Získa všetky cookies z requestu
      getAll() {
        return request.cookies.getAll();
      },
      // Nastaví cookies do odpovede (napr. po prihlásení/odhlásení)
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // Získa usera zo Supabase session (ak je prihlásený, bude tu objekt, inak null)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pre debug – vypíše do konzoly, či je user prihlásený
  if (process.env.NODE_ENV !== "production") {
    console.log(
      user ? `Authenticated as ${user.email}` : "No authenticated user",
    );
  }

  // Zistí, či ide o admin stránku
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  // Ak user nie je prihlásený a ide na /admin, redirectne ho na hlavnú stránku s query parametrami
  if (isAdminRoute && !user) {
    const homeUrl = new URL("/", request.url);
    // homeUrl.searchParams.set("login", "1"); // Môžeš použiť na zobrazenie login modalu
    // homeUrl.searchParams.set("redirectTo", request.nextUrl.pathname); // Po prihlásení môžeš usera vrátiť späť

    return NextResponse.redirect(homeUrl);
  }

  // Ak je všetko OK, pokračuje v requeste
  return response;
}

// Matcher určuje, na ktoré requesty sa proxy/middleware aplikuje (ignoruje statické assety)
export const config = {
  matcher: ["/admin/:path*"],
};
