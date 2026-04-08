import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

function getSupabaseHostname(url?: string) {
  if (!url) return "sygvsrqiwdsibqidwtho.supabase.co";

  try {
    return new URL(url).hostname;
  } catch {
    return "sygvsrqiwdsibqidwtho.supabase.co";
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: getSupabaseHostname(supabaseUrl),
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
