import type { NextConfig } from "next";

/**
 * Cache panjang hanya dipasang di production. Waktu `next dev`, header ini
 * sengaja dilewati supaya foto/lagu yang baru kamu ganti langsung kelihatan
 * tanpa perlu hard-refresh.
 */
const isProd = process.env.NODE_ENV === "production";

/** Media di /public tidak punya hash di nama file, jadi cache-nya diatur manual. */
const MEDIA_PATHS = ["/photos/:path*", "/music/:path*", "/video/:path*"];

const securityHeaders = [
  // Halaman ini dibagikan lewat link, bukan lewat pencarian (PRD 9).
  // Pelengkap `metadata.robots` di app/layout.tsx — sebagian crawler lebih
  // patuh pada header daripada pada meta tag.
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Tidak ada alasan halaman ini di-embed di situs lain.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // AVIF didahulukan (paling kecil), WebP jadi cadangan untuk browser lama.
    // Ini yang paling terasa buat foto-foto besar di HP (PRD 9).
    formats: ["image/avif", "image/webp"],

    // Foto ulang tahun tidak akan berubah setelah diunggah, jadi hasil
    // optimasinya boleh disimpan lama.
    minimumCacheTTL: 2678400, // 31 hari

    // Hanya path ini yang boleh dioptimasi next/image.
    //
    // PERHATIAN: kalau kamu menaruh foto di folder lain (mis. /public/img/),
    // gambarnya akan balas 400 Bad Request. Tambahkan foldernya di sini, atau
    // hapus blok localPatterns ini kalau terasa mengganggu.
    localPatterns: [{ pathname: "/photos/**", search: "" }],

    // Catatan Next 16: kalau nanti kamu memakai prop `quality` di <Image>,
    // nilainya wajib didaftarkan di sini dulu, mis. qualities: [60, 75].
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      ...(isProd
        ? MEDIA_PATHS.map((source) => ({
            source,
            headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
          }))
        : []),
    ];
  },
};

export default nextConfig;
