"use client";

import { POSTER } from "@/lib/content";
import { HeartMark, LilyMark, MediaSlot } from "./media-slot";

/** Titik gantung tiap bendera, dihitung di sepanjang tali melengkung di bawah. */
const FLAGS: { x: number; y: number; color: string }[] = [
  { x: 25.6, y: 10.1, color: "#FF8FAB" },
  { x: 64, y: 15, color: "#FFD1DC" },
  { x: 102.4, y: 18.2, color: "#D9B26A" },
  { x: 140.8, y: 19.8, color: "#E85D8A" },
  { x: 179.2, y: 19.8, color: "#FFC7D6" },
  { x: 217.6, y: 18.2, color: "#FF8FAB" },
  { x: 256, y: 15, color: "#FFD1DC" },
  { x: 294.4, y: 10.1, color: "#E85D8A" },
];

/** Confetti latar. Posisinya persen supaya ikut lebar layar. */
const CONFETTI: {
  left: string;
  top: string;
  size: number;
  color: string;
  delay: number;
}[] = [
  { left: "6%", top: "16%", size: 9, color: "#FF8FAB", delay: 0 },
  { left: "13%", top: "62%", size: 6, color: "#D9B26A", delay: 0.9 },
  { left: "4%", top: "82%", size: 11, color: "#FFC7D6", delay: 1.7 },
  { left: "92%", top: "22%", size: 7, color: "#E85D8A", delay: 0.4 },
  { left: "86%", top: "58%", size: 10, color: "#FFD1DC", delay: 1.3 },
  { left: "94%", top: "78%", size: 6, color: "#FF8FAB", delay: 2.1 },
];

/** Selotip washi di dua pojok atas poster. */
function tape(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: -13,
    [side]: -14,
    width: 96,
    height: 27,
    transform: `rotate(${side === "left" ? -21 : 19}deg)`,
    borderRadius: 3,
    background:
      "repeating-linear-gradient(115deg,rgba(255,143,171,.62) 0 7px,rgba(255,240,245,.72) 7px 14px)",
    border: "1px solid rgba(255,255,255,.55)",
    boxShadow: "0 3px 9px rgba(232,93,138,.18)",
    pointerEvents: "none",
  };
}

/**
 * Poster kolase ulang tahun — halaman tepat sesudah ucapan pembuka.
 * Sengaja tidak digerbang mode akses: tamu dan dia sama-sama lihat halaman ini.
 */
export function BirthdayPoster() {
  return (
    <section
      style={{
        position: "relative",
        padding: "84px 20px 96px",
        background:
          "linear-gradient(180deg,#FFF7F9 0%,#FFF1F5 32%,#FFEAF1 72%,#FFE0EA 100%)",
        borderRadius: "30px 30px 0 0",
        boxShadow: "0 -20px 44px rgba(232,93,138,.18)",
        overflow: "hidden",
      }}
    >
      {/* Confetti mengambang di belakang poster. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {CONFETTI.map((dot, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              background: dot.color,
              animation: `twinkle ${3.2 + i * 0.4}s ease-in-out ${dot.delay}s infinite`,
            }}
          />
        ))}
        <div
          className="poster-float"
          style={{
            position: "absolute",
            left: "8%",
            top: "34%",
            animationDuration: "5.4s",
          }}
        >
          <LilyMark width={30} height={37} opacity={0.5} />
        </div>
        <div
          className="poster-float"
          style={{
            position: "absolute",
            right: "7%",
            top: "40%",
            animationDuration: "6.2s",
            animationDelay: ".8s",
          }}
        >
          <HeartMark width={26} height={24} fill="rgba(255,143,171,.5)" />
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 560,
          margin: "0 auto",
        }}
      >
        {/* Bunting: talinya melengkung, benderanya menggantung tepat di kurva itu. */}
        <svg
          viewBox="0 0 320 46"
          aria-hidden="true"
          style={{
            display: "block",
            width: "100%",
            maxWidth: 460,
            height: "auto",
            margin: "0 auto 26px",
          }}
        >
          <path
            d="M0 6 Q160 34 320 6"
            fill="none"
            stroke="rgba(232,93,138,.42)"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          {FLAGS.map((flag, i) => (
            <polygon
              key={i}
              className="poster-flag"
              points={`${flag.x - 8},${flag.y} ${flag.x + 8},${flag.y} ${flag.x},${flag.y + 21}`}
              fill={flag.color}
              style={{
                transformBox: "view-box",
                transformOrigin: `${flag.x}px ${flag.y}px`,
                animationDelay: `${i * 0.22}s`,
              }}
            />
          ))}
        </svg>

        <div style={{ textAlign: "center" }}></div>

        {/* Posternya miring seperti ditempel; disentuh/hover jadi lurus. */}
        <div
          className="poster-card"
          style={{
            position: "relative",
            maxWidth: 460,
            margin: "0 auto",
            padding: "14px 14px 16px",
            borderRadius: 22,
            background: "#fff",
            border: "1px solid rgba(255,143,171,.4)",
            boxShadow: "0 26px 58px rgba(232,93,138,.22)",
          }}
        >
          <span aria-hidden="true" style={tape("left")} />
          <span aria-hidden="true" style={tape("right")} />

          <div
            style={{
              position: "relative",
              aspectRatio: POSTER.ratio,
              borderRadius: 14,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <MediaSlot
              media={POSTER.photo}
              radius={14}
              fit="contain"
              sizes="(min-width: 520px) 460px, 92vw"
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              margin: "14px 4px 0",
            }}
          >
            <p
              style={{
                margin: 0,
                font: "400 italic clamp(14px,3.6vw,16px)/1.5 var(--font-playfair),serif",
                color: "rgba(74,46,53,.72)",
                textWrap: "pretty",
              }}
            >
              {POSTER.caption}
            </p>

            {/* Segel emas — angka umurnya. */}
          </div>
        </div>

        {/* Tiga masa yang muncul di kolase. */}
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            listStyle: "none",
            margin: "34px 0 0",
            padding: 0,
          }}
        ></ul>
      </div>
    </section>
  );
}
