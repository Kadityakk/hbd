"use client";

import { useEffect, useRef, useState } from "react";
import { PLAYLIST } from "@/lib/content";

type Props = {
  /** Menjadi true tepat setelah lock screen terbuka — itu gesture yang bikin autoplay diizinkan. */
  active: boolean;
  /** Diredam sementara, mis. saat video ucapan diputar. */
  ducked?: boolean;
};

export function MusicPlayer({ active, ducked = false }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const track = PLAYLIST[trackIndex];

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
        onEnded={() => setTrackIndex((i) => (i + 1) % PLAYLIST.length)}
      />

      <div
        style={{
          position: "fixed",
          right: 16,
          bottom: 18,
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {expanded && track && (
          <div
            style={{
              maxWidth: "52vw",
              padding: "9px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,.92)",
              boxShadow: "0 8px 22px rgba(232,93,138,.22)",
              border: "1px solid rgba(255,143,171,.4)",
              font: "500 12px/1.4 var(--font-quicksand),sans-serif",
              color: "rgba(74,46,53,.78)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {track.title} · <span style={{ color: "rgba(74,46,53,.5)" }}>{track.artist}</span>
          </div>
        )}

        <button
          type="button"
          onClick={toggle}
          onPointerEnter={() => setExpanded(true)}
          onPointerLeave={() => setExpanded(false)}
          onFocus={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
          aria-label={muted ? "Nyalakan musik" : "Matikan musik"}
          className="play-button"
          style={{
            width: 48,
            height: 48,
            border: "none",
            borderRadius: "50%",
            background: "linear-gradient(160deg,#FF8FAB,#E85D8A)",
            boxShadow: "0 8px 22px rgba(232,93,138,.38)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <SpeakerIcon muted={muted} />
        </button>
      </div>
    </>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: 21, height: 21 }} fill="none" stroke="#fff" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9.5v5h3.2L12 18.5v-13L7.2 9.5H4Z" fill="#fff" />
      {muted ? (
        <>
          <path d="m16 9.5 4 5" />
          <path d="m20 9.5-4 5" />
        </>
      ) : (
        <>
          <path d="M15.6 8.8a4.2 4.2 0 0 1 0 6.4" />
          <path d="M18.2 6.4a7.6 7.6 0 0 1 0 11.2" />
        </>
      )}
    </svg>
  );
}
