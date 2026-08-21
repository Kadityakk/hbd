"use client";

import { useRef, useState } from "react";
import { VIDEO } from "@/lib/content";
import { HeartMark, MediaSlot } from "./media-slot";

type Props = {
  /** Musik latar diredam selama video diputar. */
  onPlayingChange?: (playing: boolean) => void;
};

export function VideoSection({ onPlayingChange }: Props) {
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const start = () => {
    if (!VIDEO.src) return;
    setStarted(true);
    onPlayingChange?.(true);
    // Elemen video baru ada setelah render berikutnya.
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  return (
    <section
      data-panel="6"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 6,
        minHeight: "100svh",
        justifyContent: "center",
        borderRadius: "30px 30px 0 0",
        boxShadow: "0 -22px 46px rgba(232,93,138,.22)",
        padding: "88px 22px 96px",
        background: "linear-gradient(180deg,#FFC7D6 0%,#FFF2F6 24%,#FFF7F9 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p
        style={{
          margin: "0 0 10px",
          font: "400 12px var(--font-quicksand),sans-serif",
          letterSpacing: ".3em",
          textTransform: "uppercase",
          color: "#E85D8A",
        }}
      >
        {VIDEO.eyebrow}
      </p>
      <h3
        style={{
          margin: "0 0 34px",
          font: "400 clamp(26px,7vw,36px)/1.3 var(--font-playfair),serif",
          fontStyle: "italic",
          color: "#4A2E35",
          textAlign: "center",
        }}
      >
        {VIDEO.title}
      </h3>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 340,
          padding: 12,
          borderRadius: 26,
          background: "#fff",
          border: "1px solid rgba(255,143,171,.45)",
          boxShadow: "0 20px 46px rgba(232,93,138,.16)",
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "9/16",
            borderRadius: 18,
            overflow: "hidden",
            background: "#FFE6ED",
          }}
        >
          {started && VIDEO.src ? (
            <video
              ref={videoRef}
              src={VIDEO.src}
              controls
              playsInline
              onEnded={() => onPlayingChange?.(false)}
              onPause={() => onPlayingChange?.(false)}
              onPlay={() => onPlayingChange?.(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 18 }}
            />
          ) : (
            <>
              <MediaSlot media={VIDEO.poster} radius={18} sizes="340px" />
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                <div style={{ position: "relative", width: 76, height: 76, display: "grid", placeItems: "center" }}>
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,.5)",
                      animation: "pulseSoft 2.8s ease-in-out infinite",
                    }}
                  />
                  <button
                    type="button"
                    aria-label="putar video"
                    onClick={start}
                    className="play-button"
                    style={{
                      position: "relative",
                      width: 60,
                      height: 60,
                      border: "none",
                      borderRadius: "50%",
                      background: "linear-gradient(160deg,#FF8FAB,#E85D8A)",
                      boxShadow: "0 8px 22px rgba(232,93,138,.4)",
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <HeartMark />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <p
          style={{
            margin: "14px 6px 6px",
            font: "400 13px/1.6 var(--font-quicksand),sans-serif",
            textAlign: "center",
            color: "rgba(74,46,53,.6)",
          }}
        >
          {VIDEO.src ? VIDEO.note : "Videonya belum diunggah — isi VIDEO.src di lib/content.ts."}
        </p>
      </div>
    </section>
  );
}
