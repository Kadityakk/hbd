import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // izinkan akses dev server dari device lain di jaringan lokal
  // (misal buka dari HP untuk cek tampilan mobile)
  allowedDevOrigins: ["*.*.*.*"],

  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/music/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
