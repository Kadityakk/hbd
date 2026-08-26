"use client";

import { useState } from "react";
import { FOOTER } from "@/lib/content";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  const [secretOpen, setSecretOpen] = useState(false);

  return (
    <footer
      style={{
        position: "relative",
        padding: "44px 22px 56px",
        background: "#FFD1DC",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <p
        aria-hidden="true"
        style={{
          margin: "0 0 22px",
          font: "400 14px/1 var(--font-playfair),serif",
          letterSpacing: "1.1em",
          color: "rgba(74,46,53,.32)",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {"❀".repeat(20)}
      </p>

      <BrandMark size={58} style={{ marginBottom: 18 }} />

      <p
        style={{
          margin: "0 auto 12px",
          maxWidth: 340,
          font: "400 15.5px/1.8 var(--font-quicksand),sans-serif",
          color: "rgba(74,46,53,.72)",
          textWrap: "pretty",
        }}
      >
        {FOOTER.line}
      </p>

      {/* Easter egg: tanda tangan ini bisa diklik (PRD 5.8). */}
      <button
        type="button"
        onClick={() => setSecretOpen((open) => !open)}
        aria-expanded={secretOpen}
        style={{
          margin: 0,
          padding: 0,
          border: "none",
          background: "none",
          font: "400 italic 22px var(--font-playfair),serif",
          color: "#4A2E35",
          cursor: "pointer",
        }}
      >
        {FOOTER.signature}
      </button>

      {secretOpen && (
        <p
          style={{
            margin: "18px auto 0",
            maxWidth: 340,
            padding: "16px 18px",
            borderRadius: 16,
            background: "rgba(255,255,255,.7)",
            border: "1px solid rgba(217,178,106,.5)",
            font: "400 14.5px/1.8 var(--font-quicksand),sans-serif",
            color: "rgba(74,46,53,.82)",
            textWrap: "pretty",
            animation: "cardIn .45s ease-in-out both",
          }}
        >
          {FOOTER.secret}
        </p>
      )}
    </footer>
  );
}
