"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HINT_AFTER_ATTEMPTS, PIN } from "@/lib/content";
import { HeartMark } from "./media-slot";

const DEFAULT_HINT = "6 angka · petunjuk: tanggal lahirmu";
const WRONG_HINT = "Hmm, bukan itu. Coba tanggal lahirmu (hari, bulan, tahun).";
const SOFT_HINT = "Coba lagi sayang 🌸 — urutannya hari, bulan, lalu tahun (dua angka).";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "ok"] as const;

type Props = {
  onUnlock: () => void;
  onGuest: () => void;
};

export function LockScreen({ onUnlock, onGuest }: Props) {
  const [pin, setPin] = useState("");
  const [hint, setHint] = useState(DEFAULT_HINT);
  const [shaking, setShaking] = useState(false);
  const attemptsRef = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const check = useCallback(
    (candidate: string) => {
      if (candidate === PIN) {
        onUnlock();
        return;
      }
      attemptsRef.current += 1;
      setShaking(true);
      timers.current.push(setTimeout(() => setShaking(false), 470));
      setHint(attemptsRef.current >= HINT_AFTER_ATTEMPTS ? SOFT_HINT : WRONG_HINT);
      setPin("");
    },
    [onUnlock],
  );

  const push = useCallback(
    (key: string) => {
      if (key === "C") {
        setPin((prev) => prev.slice(0, -1));
        return;
      }
      if (key === "ok") {
        setPin((prev) => {
          check(prev);
          return prev;
        });
        return;
      }
      setPin((prev) => {
        if (prev.length >= 6) return prev;
        const next = prev + key;
        if (next.length === 6) timers.current.push(setTimeout(() => check(next), 260));
        return next;
      });
    },
    [check],
  );

  // Keypad di layar tetap jadi jalur utama, tapi keyboard fisik ikut jalan.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key >= "0" && event.key <= "9") push(event.key);
      else if (event.key === "Backspace") push("C");
      else if (event.key === "Enter") push("ok");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [push]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        background: "linear-gradient(170deg,#FFD1DC 0%,#FFF0F4 45%,#FFF7F9 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 22px",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <VirgoConstellation />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 320,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <svg
          viewBox="0 0 32 29"
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-13%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(120vw,520px)",
            height: "auto",
            opacity: 0.3,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <path
            d="M16 28.4S2.2 20 2.2 11.4C2.2 6.1 6 2.6 10.4 2.6c2.8 0 4.7 1.5 5.6 3 .9-1.5 2.8-3 5.6-3 4.4 0 8.2 3.5 8.2 8.8C29.8 20 16 28.4 16 28.4Z"
            fill="rgba(255,255,255,.42)"
            stroke="#FF8FAB"
            strokeWidth=".55"
          />
        </svg>

        <BigLily />

        <p
          style={{
            margin: "0 0 4px",
            font: "400 13px/1.4 var(--font-quicksand),sans-serif",
            letterSpacing: ".24em",
            textTransform: "uppercase",
            color: "#E85D8A",
          }}
        >
          Untuk kamu
        </p>
        <h1
          style={{
            margin: "0 0 4px",
            font: "400 clamp(24px,6.4vw,30px)/1.25 var(--font-playfair),serif",
            letterSpacing: ".02em",
            textAlign: "center",
            color: "#4A2E35",
          }}
        >
          Ada sesuatu di dalam
        </h1>
        <p
          style={{
            margin: "0 0 18px",
            font: "400 14px/1.55 var(--font-quicksand),sans-serif",
            textAlign: "center",
            color: "rgba(74,46,53,.66)",
            textWrap: "pretty",
          }}
        >
          Masukkan tanggal spesialmu <span style={{ color: "#E85D8A" }}>(hari, bulan, tahun)</span>
        </p>

        <div style={{ display: "flex", gap: 11, marginBottom: 20 }} aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                border: "1.5px solid #FF8FAB",
                transition: "background .2s ease-in-out,transform .2s ease-in-out",
                background: pin.length > i ? "#E85D8A" : "transparent",
                transform: pin.length > i ? "scale(1.1)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 10,
            width: "100%",
            animation: shaking ? "shakeX .45s ease-in-out" : undefined,
          }}
        >
          {KEYS.map((key) => (
            <KeypadButton key={key} value={key} onPress={push} />
          ))}
        </div>

        <p
          aria-live="polite"
          style={{
            margin: "16px 0 0",
            minHeight: 20,
            font: "400 13px/1.5 var(--font-quicksand),sans-serif",
            color: "rgba(74,46,53,.5)",
            textAlign: "center",
          }}
        >
          {hint}
        </p>

        <button
          type="button"
          onClick={onGuest}
          className="ghost-link"
          style={{
            margin: "18px 0 0",
            padding: "10px 18px",
            border: "1px solid rgba(232,93,138,.32)",
            borderRadius: 999,
            background: "rgba(255,255,255,.5)",
            color: "#E85D8A",
            font: "500 13px var(--font-quicksand),sans-serif",
            letterSpacing: ".04em",
            cursor: "pointer",
          }}
        >
          Masuk sebagai Teman →
        </button>
      </div>
    </div>
  );
}

function KeypadButton({ value, onPress }: { value: string; onPress: (key: string) => void }) {
  const base: React.CSSProperties = {
    height: "clamp(48px,13vw,62px)",
    border: "none",
    borderRadius: 22,
    color: "#4A2E35",
    cursor: "pointer",
  };

  if (value === "C") {
    return (
      <button
        type="button"
        onClick={() => onPress(value)}
        className="keypad-key keypad-key--soft"
        style={{
          ...base,
          background: "rgba(255,255,255,.42)",
          boxShadow: "0 3px 12px rgba(232,93,138,.09)",
          color: "rgba(74,46,53,.55)",
          font: "500 14px var(--font-quicksand),sans-serif",
          letterSpacing: ".1em",
        }}
      >
        hapus
      </button>
    );
  }

  if (value === "ok") {
    return (
      <button
        type="button"
        onClick={() => onPress(value)}
        aria-label="buka"
        className="keypad-key keypad-key--ok"
        style={{
          ...base,
          background: "linear-gradient(160deg,#FF8FAB,#E85D8A)",
          boxShadow: "0 6px 18px rgba(232,93,138,.34)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <HeartMark />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onPress(value)}
      className="keypad-key"
      style={{
        ...base,
        background: "rgba(255,255,255,.74)",
        boxShadow: "0 3px 12px rgba(232,93,138,.13)",
        font: "500 23px var(--font-space-grotesk),monospace",
      }}
    >
      {value}
    </button>
  );
}

/** Konstelasi Virgo tipis di background — dia lahir 28 Agustus (PRD 5.1). */
function VirgoConstellation() {
  const star = (
    left: number,
    top: number,
    size: number,
    color: string,
    dur?: number,
    delay?: number,
  ): React.CSSProperties => ({
    position: "absolute",
    left,
    top,
    width: size,
    height: size,
    borderRadius: "50%",
    background: color,
    animation: dur ? `twinkle ${dur}s ease-in-out ${delay ?? 0}s infinite` : undefined,
  });

  const link = (left: number, top: number, width: number, rotate: number, color: string): React.CSSProperties => ({
    position: "absolute",
    left,
    top,
    width,
    height: 1,
    background: color,
    transform: `rotate(${rotate}deg)`,
    transformOrigin: "left center",
  });

  return (
    <>
      <div
        aria-hidden="true"
        style={{ position: "absolute", top: "9%", right: "9%", width: 120, height: 150, opacity: 0.5 }}
      >
        <div style={star(12, 6, 5, "#D9B26A", 4)} />
        <div style={star(52, 24, 4, "#D9B26A", 5, 0.6)} />
        <div style={star(34, 66, 6, "#E85D8A", 4.4, 1.1)} />
        <div style={star(82, 58, 4, "#D9B26A", 5.6, 0.3)} />
        <div style={star(64, 112, 5, "#D9B26A", 4.8, 1.6)} />
        <div style={link(14, 8, 44, 23, "rgba(217,178,106,.65)")} />
        <div style={link(54, 26, 44, 115, "rgba(217,178,106,.65)")} />
        <div style={link(36, 68, 50, -11, "rgba(217,178,106,.65)")} />
        <div style={link(84, 60, 56, 112, "rgba(217,178,106,.5)")} />
      </div>
      <div
        aria-hidden="true"
        style={{ position: "absolute", bottom: "8%", left: "7%", width: 90, height: 90, opacity: 0.35 }}
      >
        <div style={star(8, 10, 4, "#E85D8A")} />
        <div style={star(48, 30, 4, "#E85D8A")} />
        <div style={star(26, 70, 4, "#E85D8A")} />
        <div style={link(10, 12, 44, 26, "rgba(232,93,138,.5)")} />
        <div style={link(50, 32, 46, 118, "rgba(232,93,138,.5)")} />
      </div>
    </>
  );
}

function BigLily() {
  const petal = (rotate: number, height: number, background: string): React.CSSProperties => ({
    position: "absolute",
    left: "50%",
    bottom: 0,
    width: 11,
    height,
    background,
    borderRadius: "60% 60% 50% 50%",
    transformOrigin: "bottom center",
    transform: `translateX(-50%) rotate(${rotate}deg)`,
  });

  return (
    <div aria-hidden="true" style={{ position: "relative", width: 40, height: 48, marginBottom: 4 }}>
      <div style={petal(0, 26, "#FFD1DC")} />
      <div style={petal(-52, 24, "rgba(255,143,171,.8)")} />
      <div style={petal(52, 24, "rgba(255,143,171,.8)")} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          width: 1.5,
          height: 16,
          background: "#D9B26A",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}
