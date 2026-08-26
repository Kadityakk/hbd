"use client";

import { useEffect, useRef, useState } from "react";
import { PLAYLIST } from "@/lib/content";
import { BrandMark } from "./brand-mark";

type Props = {
  /** Menjadi true tepat setelah lock screen terbuka — itu gesture yang bikin autoplay diizinkan. */
  active: boolean;
  /** Diredam sementara, mis. saat video ucapan diputar. */
  ducked?: boolean;
};

/** Not-not kecil yang mengambang naik dari tombol selama lagunya jalan. */
const NOTES = [
  { glyph: "♪", left: 6, delay: "0s", duration: "2.9s", size: 13 },
  { glyph: "♫", left: 26, delay: ".9s", duration: "3.4s", size: 15 },
  { glyph: "♪", left: 44, delay: "1.8s", duration: "3.1s", size: 12 },
];

export function MusicPlayer({ active, ducked = false }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const track = PLAYLIST[trackIndex];
  const spinning = !muted && !paused;

  // Browser memblokir autoplay tanpa interaksi. Submit PIN adalah interaksi
  // pertama, jadi pemutaran dimulai di sini (PRD 5.7).
  useEffect(() => {
    if (!active || !track) return;
    audioRef.current?.play().catch(() => {
      // Kalau tetap ditolak, tombol di bawah tetap bisa dipakai manual.
    });
  }, [active, track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = ducked ? 0.12 : 1;
  }, [ducked]);

  if (PLAYLIST.length === 0) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    setMuted(next);
    audio.muted = next;
    if (!next && audio.paused) audio.play().catch(() => {});
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={track?.src}
        preload="auto"
        // Satu lagu tidak memicu ganti index, jadi biarkan elemen yang mengulang.
        loop={PLAYLIST.length === 1}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onEnded={() => setTrackIndex((i) => (i + 1) % PLAYLIST.length)}
      />

      <div
        className="music-fab"
        style={{
          position: "fixed",
          right: 16,
          bottom: 18,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {expanded && track && (
          <div
            style={{
              maxWidth: "56vw",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 15px 8px 13px",
              borderRadius: 999,
              background: "rgba(255,255,255,.94)",
              boxShadow: "0 10px 26px rgba(232,93,138,.24)",
              border: "1px solid rgba(255,143,171,.45)",
              animation: "cardIn .28s ease-out both",
            }}
          >
            <EqualizerBars active={spinning} color="#E85D8A" height={13} />
            <span style={{ minWidth: 0 }}>
              <span
                style={{
                  display: "block",
                  font: "500 8.5px/1 var(--font-quicksand),sans-serif",
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "rgba(232,93,138,.75)",
                }}
              >
                {spinning ? "now playing" : "paused"}
              </span>
              <span
                style={{
                  display: "block",
                  marginTop: 2,
                  font: "600 12px/1.35 var(--font-quicksand),sans-serif",
                  color: "rgba(74,46,53,.85)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {track.title}{" "}
                <span style={{ fontWeight: 400, color: "rgba(74,46,53,.45)" }}>
                  · {track.artist}
                </span>
              </span>
            </span>
          </div>
        )}

        <div style={{ position: "relative", width: 60, height: 60 }}>
          {/* Dua halo lembut yang berdenyut di belakang tombol. */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: -6,
              borderRadius: "50%",
              background: "rgba(255,143,171,.34)",
              animation: spinning ? "pulseSoft 2.8s ease-in-out infinite" : undefined,
              opacity: spinning ? 1 : 0.28,
              pointerEvents: "none",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,.75)",
              animation: spinning ? "pulseSoft 2.8s ease-in-out .7s infinite" : undefined,
              opacity: spinning ? 1 : 0,
              pointerEvents: "none",
            }}
          />

          {/* Not-not yang naik pelan selama lagunya jalan. */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 34,
              height: 60,
              pointerEvents: "none",
            }}
          >
            {spinning &&
              NOTES.map((note, i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    left: note.left,
                    bottom: 0,
                    font: `400 ${note.size}px var(--font-quicksand),sans-serif`,
                    color: "#E85D8A",
                    textShadow: "0 1px 3px rgba(255,255,255,.9)",
                    animation: `noteFloat ${note.duration} ease-in-out ${note.delay} infinite`,
                  }}
                >
                  {note.glyph}
                </span>
              ))}
          </span>

          <button
            type="button"
            onClick={toggle}
            onPointerEnter={() => setExpanded(true)}
            onPointerLeave={() => setExpanded(false)}
            onFocus={() => setExpanded(true)}
            onBlur={() => setExpanded(false)}
            aria-label={muted ? "Turn the music on" : "Turn the music off"}
            aria-pressed={!muted}
            className="play-button"
            style={{
              position: "relative",
              width: 60,
              height: 60,
              padding: 5,
              border: "none",
              borderRadius: "50%",
              background: muted
                ? "linear-gradient(160deg,#F2D8DF,#D7A7B6)"
                : "linear-gradient(160deg,#FFB3C6,#E85D8A)",
              boxShadow: muted
                ? "0 8px 20px rgba(167,124,138,.28)"
                : "0 10px 26px rgba(232,93,138,.42)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            {/* Piringan hitam mini: alurnya berputar, logo poodle jadi label tengahnya. */}
            <span
              aria-hidden="true"
              style={{
                position: "relative",
                display: "grid",
                placeItems: "center",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background:
                  "repeating-radial-gradient(circle at 50% 50%,rgba(255,255,255,.95) 0 2px,rgba(255,228,237,.9) 2px 4px)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,.9)",
                animation: "discSpin 9s linear infinite",
                animationPlayState: spinning ? "running" : "paused",
                filter: muted ? "saturate(.45)" : undefined,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "conic-gradient(from 0deg,rgba(255,255,255,0) 0deg,rgba(255,255,255,.85) 60deg,rgba(255,255,255,0) 130deg,rgba(255,255,255,0) 220deg,rgba(255,255,255,.6) 290deg,rgba(255,255,255,0) 360deg)",
                }}
              />
              <BrandMark
                size={32}
                ring={false}
                style={{ boxShadow: "0 0 0 2px rgba(255,255,255,.95)" }}
              />
            </span>

            {/* Lencana kecil: bar equalizer saat jalan, speaker dicoret saat mute. */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: -2,
                bottom: -1,
                width: 23,
                height: 23,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background: "#fff",
                border: "1.5px solid rgba(255,143,171,.6)",
                boxShadow: "0 4px 10px rgba(232,93,138,.28)",
              }}
            >
              {muted ? (
                <MutedMark />
              ) : (
                <EqualizerBars active={spinning} color="#E85D8A" height={10} />
              )}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

/** Tiga bar yang memantul — dipakai di lencana tombol dan di pill judul lagu. */
function EqualizerBars({
  active,
  color,
  height,
}: {
  active: boolean;
  color: string;
  height: number;
}) {
  const delays = ["0s", ".22s", ".44s"];
  return (
    <span aria-hidden="true" style={{ display: "flex", alignItems: "flex-end", gap: 2, height }}>
      {delays.map((delay) => (
        <span
          key={delay}
          style={{
            display: "block",
            width: 2.5,
            height: "100%",
            borderRadius: 999,
            background: color,
            transformOrigin: "bottom center",
            transform: active ? undefined : "scaleY(.35)",
            animation: active ? `eqBounce .9s ease-in-out ${delay} infinite` : undefined,
          }}
        />
      ))}
    </span>
  );
}

function MutedMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ width: 13, height: 13 }}
      fill="none"
      stroke="#C98BA0"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 9.5v5h3L12.5 18V6L8 9.5H5Z" fill="#C98BA0" />
      <path d="m16.5 9.5 4 5" />
      <path d="m20.5 9.5-4 5" />
    </svg>
  );
}
