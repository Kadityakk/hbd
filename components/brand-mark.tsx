"use client";

import Image from "next/image";
import { useState } from "react";
import { LOGO } from "@/lib/content";
import { LilyMark } from "./media-slot";

type Props = {
  /** Diameter lingkaran dalam px. */
  size?: number;
  /** Cincin + bayangan pink di sekeliling logo. Dimatikan kalau logonya
   *  ditumpuk di atas elemen yang sudah punya bingkai sendiri. */
  ring?: boolean;
  /** Halo lembut yang berdenyut — dipakai di lock screen. */
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Logo situs: si poodle di dalam lingkaran krem.
 * Selama /public/logo/poodle.png belum ada, gambarnya gagal dimuat dan yang
 * tampil adalah lambang lily — jadi halaman tidak pernah menunjukkan ikon rusak.
 */
export function BrandMark({ size = 64, ring = true, glow = false, className, style }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-grid",
        placeItems: "center",
        width: size,
        height: size,
        flex: "none",
        borderRadius: "50%",
        overflow: "hidden",
        background: "linear-gradient(160deg,#FFFFFF,#FFF1F5)",
        border: ring ? "1.5px solid rgba(255,143,171,.55)" : "none",
        boxShadow: ring ? "0 10px 26px rgba(232,93,138,.22)" : "none",
        animation: glow ? "logoBreathe 4.2s ease-in-out infinite" : undefined,
        ...style,
      }}
    >
      {failed ? (
        <LilyMark width={size * 0.42} height={size * 0.52} opacity={0.85} />
      ) : (
        <Image
          src={LOGO.src}
          alt={LOGO.alt}
          width={size * 2}
          height={size * 2}
          onError={() => setFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: LOGO.focus,
          }}
        />
      )}
    </span>
  );
}
