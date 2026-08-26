"use client";

import { useEffect, useMemo, useState } from "react";
import { HERO } from "@/lib/content";
import { useClientValue } from "@/lib/use-client-value";
import { MediaSlot } from "./media-slot";

// Ritme ucapannya sengaja pelan — ini surat, bukan notifikasi. Judul diketik
// paling santai, paragrafnya sedikit lebih cepat supaya tetap enak dibaca.
const TITLE_SPEED = 78; // ms per karakter
const BODY_SPEED = 46;
const OPEN_DELAY = 900; // jeda sebelum huruf pertama judul
const BETWEEN_DELAY = 1100; // jeda setelah judul selesai, sebelum paragraf

/** Tanda baca dapat tarikan napas ekstra — ini yang bikin iramanya terasa halus. */
const PAUSE_AFTER: Record<string, number> = {
  ",": 300,
  ".": 460,
  "!": 460,
  "?": 460,
  "…": 520,
  "—": 300,
};

/** Emoji dihitung sebagai satu karakter — kalau tidak, ada frame di mana yang
 *  tampil cuma separuh pasangan surrogate-nya. */
const toChars = (text: string) => Array.from(text);

type Props = {
  /** Mengetik baru mulai setelah lock screen terbuka. */
  start: boolean;
};

export function HeroSection({ start }: Props) {
  const petals = useMemo(() => makePetals(), []);
  const titleChars = useMemo(() => toChars(HERO.title), []);
  const paragraphChars = useMemo(() => toChars(HERO.paragraph), []);

  const titleTyped = useTypewriter(titleChars, start, OPEN_DELAY, TITLE_SPEED);
  const paragraphDelay =
    OPEN_DELAY + estimateDuration(titleChars, TITLE_SPEED) + BETWEEN_DELAY;
  const paragraphTyped = useTypewriter(
    paragraphChars,
    start,
    paragraphDelay,
    BODY_SPEED,
  );

  const isVideo = /\.(mp4|webm|mov)$/i.test(HERO.background.src ?? "");

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        padding: "80px 22px",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        {isVideo ? (
          <video
            src={HERO.background.src}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <MediaSlot media={HERO.background} priority sizes="100vw" />
        )}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg,rgba(255,247,249,.9) 0%,rgba(255,209,220,.72) 40%,rgba(255,143,171,.55) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {petals.map((petal, i) => (
          <div
            key={i}
            data-petal
            style={{
              position: "absolute",
              top: 0,
              left: `${petal.left}%`,
              width: petal.size,
              height: petal.size,
              background: petal.color,
              opacity: petal.opacity,
              borderRadius: "50% 0 50% 50%",
              animation: `petalFall ${petal.duration}s linear ${petal.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 520,
          textAlign: "center",
        }}
      >
        {/* Video latarnya bergerak dan sebagian framenya gelap. Cahaya lembut
            ini yang menjaga teks tetap kontras, tanpa mengubah warna tintanya. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-10% -14%",
            zIndex: 0,
            background:
              "radial-gradient(62% 54% at 50% 48%,rgba(255,247,249,.94) 0%,rgba(255,243,247,.8) 46%,rgba(255,240,245,0) 78%)",
            filter: "blur(10px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              margin: "0 0 18px",
              font: "400 12px/1.4 var(--font-quicksand),sans-serif",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "#E85D8A",
            }}
          ></p>

          <TypedBlock
            as="h2"
            chars={titleChars}
            count={titleTyped}
            style={{
              margin: "0 0 22px",
              font: "400 clamp(34px,10vw,54px)/1.16 var(--font-playfair),serif",
              fontStyle: "italic",
              letterSpacing: ".01em",
              color: "#4A2E35",
              textWrap: "pretty",
            }}
          />

          <TypedBlock
            as="p"
            chars={paragraphChars}
            count={paragraphTyped}
            style={{
              margin: "0 auto",
              maxWidth: 420,
              font: "500 16.5px/1.85 var(--font-quicksand),sans-serif",
              color: "#4A2E35",
              // Teksnya duduk di atas video yang bergerak, jadi warnanya dipakai
              // penuh dan diberi halo putih tipis supaya tetap kebaca.
              textShadow:
                "0 1px 2px rgba(255,255,255,.92),0 0 18px rgba(255,247,249,.8)",
              textWrap: "pretty",
            }}
          />

          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 38 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                animation: "swayY 3.4s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 38,
                  background:
                    "linear-gradient(180deg,rgba(74,46,53,.35),transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Teks penuh dirender transparan sebagai penahan tinggi, teks yang sedang
 * diketik ditumpuk di atasnya — supaya layout tidak melompat saat mengetik.
 */
function TypedBlock({
  as: Tag,
  chars,
  count,
  style,
}: {
  as: "h2" | "p";
  chars: string[];
  count: number;
  style: React.CSSProperties;
}) {
  const done = count >= chars.length;
  return (
    <Tag style={{ ...style, position: "relative" }}>
      <span style={{ visibility: "hidden" }} aria-hidden="true">
        {chars.join("")}
      </span>
      <span style={{ position: "absolute", inset: 0 }}>
        {/* Tiap huruf muncul lewat fade pendek, bukan langsung nongol — itu yang
            menghilangkan kesan "kedutan" dari mengetik per karakter. */}
        {chars.slice(0, count).map((char, i) => (
          <span key={i} style={{ animation: "charIn .42s ease-out both" }}>
            {char}
          </span>
        ))}
        {!done && count > 0 && (
          <span
            aria-hidden="true"
            style={{
              animation: "caret 1s step-end infinite",
              color: "#E85D8A",
            }}
          >
            |
          </span>
        )}
      </span>
    </Tag>
  );
}

/** Perkiraan lama mengetik satu blok, dipakai untuk menjadwalkan blok sesudahnya. */
function estimateDuration(chars: string[], speed: number): number {
  return chars.reduce(
    (total, char) => total + speed + (PAUSE_AFTER[char] ?? 0),
    0,
  );
}

/**
 * Mengembalikan berapa karakter yang sudah tampil. Jadwalnya berbasis waktu dan
 * dijalankan di requestAnimationFrame — beda dengan setInterval, iramanya tidak
 * melar saat tab sibuk, dan jeda per karakter bisa berbeda-beda.
 */
function useTypewriter(
  chars: string[],
  start: boolean,
  delay: number,
  speed: number,
): number {
  const [count, setCount] = useState(0);
  const reduced = useClientValue(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    false,
  );

  useEffect(() => {
    // Kalau user minta gerakan dikurangi, teksnya langsung tampil utuh.
    if (!start || reduced) return;

    let frame = 0;
    let shown = 0;
    let dueAt = performance.now() + delay;

    const tick = (now: number) => {
      if (now >= dueAt) {
        const char = chars[shown];
        shown += 1;
        setCount(shown);
        dueAt = now + speed + (PAUSE_AFTER[char] ?? 0);
      }
      if (shown < chars.length) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [chars, start, delay, speed, reduced]);

  // Sebelum lock screen terbuka, teks memang belum boleh muncul sama sekali.
  if (!start) return 0;
  return reduced ? chars.length : count;
}

type Petal = {
  left: number;
  size: number;
  duration: string;
  delay: string;
  opacity: string;
  color: string;
};

/** Deterministik supaya render server dan client menghasilkan kelopak yang sama. */
function makePetals(): Petal[] {
  return Array.from({ length: 14 }, (_, i) => {
    const rand = (n: number) =>
      (((Math.sin(i * 12.9898 + n) * 43758.5453) % 1) + 1) % 1;
    const tint = i % 3;
    return {
      left: Math.round(rand(1) * 96),
      size: 7 + Math.round(rand(2) * 8),
      duration: (11 + rand(3) * 10).toFixed(1),
      delay: (rand(4) * 12).toFixed(1),
      opacity: (0.35 + rand(5) * 0.45).toFixed(2),
      color: tint === 0 ? "#FFD1DC" : tint === 1 ? "#FFFFFF" : "#FF8FAB",
    };
  });
}
