import Image from "next/image";
import type { Media } from "@/lib/content";

type Props = {
  media: Media;
  /** Radius sudut dalam px. */
  radius?: number;
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
};

/**
 * Pengganti <image-slot> dari file desain. Mengisi penuh parent-nya
 * (parent harus position:relative). Selama `media.src` kosong, yang tampil
 * adalah placeholder bertema pink dengan keterangan foto apa yang dibutuhkan.
 */
export function MediaSlot({ media, radius = 0, fit = "cover", sizes = "100vw", priority = false }: Props) {
  if (!media.src) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          display: "grid",
          placeItems: "center",
          gap: 6,
          padding: 12,
          background: "linear-gradient(150deg,#FFF1F5,#FFE0E9)",
          border: "1.5px dashed rgba(232,93,138,.4)",
          textAlign: "center",
        }}
      >
        <div style={{ display: "grid", justifyItems: "center", gap: 8 }}>
          <LilyMark />
          <span
            style={{
              font: "500 11px/1.45 var(--font-quicksand), sans-serif",
              letterSpacing: ".04em",
              color: "rgba(74,46,53,.55)",
              textWrap: "pretty",
            }}
          >
            {media.placeholder}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: fit, borderRadius: radius }}
    />
  );
}

/** Bunga lily kecil — dipakai sebagai ikon placeholder dan dekorasi. */
export function LilyMark({ width = 26, height = 32, opacity = 0.75 }: { width?: number; height?: number; opacity?: number }) {
  const petal = (rotate: number, h: number, background: string): React.CSSProperties => ({
    position: "absolute",
    left: "50%",
    bottom: height * 0.19,
    width: width * 0.31,
    height: h,
    background,
    borderRadius: "60% 60% 50% 50%",
    transformOrigin: "bottom center",
    transform: `translateX(-50%) rotate(${rotate}deg)`,
  });

  return (
    <div aria-hidden="true" style={{ position: "relative", width, height, opacity }}>
      <div style={petal(0, height * 0.53, "#FFD1DC")} />
      <div style={petal(-52, height * 0.47, "#FF8FAB")} />
      <div style={petal(52, height * 0.47, "#FF8FAB")} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          width: 1.5,
          height: height * 0.25,
          background: "#D9B26A",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}

/** Hati — dipakai di tombol buka, tombol play, dan badge "disematkan". */
export function HeartMark({ width = 24, height = 22, fill = "#fff", stroke }: { width?: number; height?: number; fill?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 32 29" aria-hidden="true" style={{ width, height, pointerEvents: "none" }}>
      <path
        d="M16 28.4S2.2 20 2.2 11.4C2.2 6.1 6 2.6 10.4 2.6c2.8 0 4.7 1.5 5.6 3 .9-1.5 2.8-3 5.6-3 4.4 0 8.2 3.5 8.2 8.8C29.8 20 16 28.4 16 28.4Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={stroke ? 0.55 : undefined}
      />
    </svg>
  );
}
