"use client";

import { useEffect, useMemo, useState } from "react";
import { HERO } from "@/lib/content";
import { useClientValue } from "@/lib/use-client-value";
import { MediaSlot } from "./media-slot";

const TYPE_SPEED = 34; // ms per karakter
const LINE_DELAY = 420;

type Props = {
  /** Mengetik baru mulai setelah lock screen terbuka. */
  start: boolean;
};

export function HeroSection({ start }: Props) {
  const petals = useMemo(() => makePetals(), []);
  const titleTyped = useTypewriter(HERO.title, start, LINE_DELAY);
  const paragraphDelay = LINE_DELAY + HERO.title.length * TYPE_SPEED + LINE_DELAY;
  const paragraphTyped = useTypewriter(HERO.paragraph, start, paragraphDelay);

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

      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden="true">
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

      <div style={{ position: "relative", width: "100%", maxWidth: 520, textAlign: "center" }}>
        <p
          style={{
            margin: "0 0 18px",
            font: "400 12px/1.4 var(--font-quicksand),sans-serif",
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "#E85D8A",
          }}
        >
          {HERO.date}
        </p>

        <TypedBlock
          as="h2"
          full={HERO.title}
          typed={titleTyped}
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
          full={HERO.paragraph}
          typed={paragraphTyped}
          style={{
            margin: "0 auto",
            maxWidth: 420,
            font: "400 16.5px/1.85 var(--font-quicksand),sans-serif",
            color: "rgba(74,46,53,.82)",
            textWrap: "pretty",
          }}
        />

        <div style={{ display: "flex", justifyContent: "center", marginTop: 38 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              animation: "swayY 3.4s ease-in-out infinite",
            }}
          >
            <span
              style={{
                font: "400 11px var(--font-quicksand),sans-serif",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "rgba(74,46,53,.5)",
              }}
            >
              scroll
            </span>
            <div
              style={{ width: 1, height: 38, background: "linear-gradient(180deg,rgba(74,46,53,.35),transparent)" }}
            />
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
  full,
  typed,
  style,
}: {
  as: "h2" | "p";
  full: string;
  typed: string;
  style: React.CSSProperties;
}) {
  const done = typed.length === full.length;
  return (
    <Tag style={{ ...style, position: "relative" }}>
      <span style={{ visibility: "hidden" }} aria-hidden="true">
        {full}
      </span>
      <span style={{ position: "absolute", inset: 0 }}>
        {typed}
        {!done && typed.length > 0 && (
          <span aria-hidden="true" style={{ animation: "caret 1s step-end infinite", color: "#E85D8A" }}>
            |
          </span>
        )}
      </span>
    </Tag>
  );
}

function useTypewriter(full: string, start: boolean, delay: number): string {
  const [count, setCount] = useState(0);
  const reduced = useClientValue(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, false);

  useEffect(() => {
    // Kalau user minta gerakan dikurangi, teksnya langsung tampil utuh.
    if (!start || reduced) return;

    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= full.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, TYPE_SPEED);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [full, start, delay, reduced]);

  // Sebelum lock screen terbuka, teks memang belum boleh muncul sama sekali.
  if (!start) return "";
  return reduced ? full : full.slice(0, count);
}

type Petal = { left: number; size: number; duration: string; delay: string; opacity: string; color: string };

/** Deterministik supaya render server dan client menghasilkan kelopak yang sama. */
function makePetals(): Petal[] {
  return Array.from({ length: 14 }, (_, i) => {
    const rand = (n: number) => (((Math.sin(i * 12.9898 + n) * 43758.5453) % 1) + 1) % 1;
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
