"use client";

import { MOOD, type MoodCard } from "@/lib/content";
import { MediaSlot } from "./media-slot";

type Props = {
  /**
   * Di jalur tamu, mood board langsung menempel di bawah hero yang ujungnya
   * masih rose — sudut membulat + bayangan angkat bikin peralihannya rapi,
   * sama seperti panel-panel di galeri.
   */
  raised?: boolean;
};

export function MoodBoard({ raised = false }: Props) {
  return (
    <section
      style={{
        position: "relative",
        padding: "96px 20px 104px",
        background: "linear-gradient(180deg,#FFF7F9,#FFEFF4)",
        overflow: "hidden",
        borderRadius: raised ? "30px 30px 0 0" : undefined,
        boxShadow: raised ? "0 -20px 44px rgba(232,93,138,.16)" : undefined,
      }}
    >
      <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            margin: "0 0 10px",
            font: "400 12px var(--font-quicksand),sans-serif",
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "#E85D8A",
          }}
        >
          {MOOD.eyebrow}
        </p>
        <h3
          style={{
            margin: "0 0 8px",
            font: "400 clamp(27px,7vw,38px)/1.25 var(--font-playfair),serif",
            color: "#4A2E35",
          }}
        >
          {MOOD.title}
        </h3>
        <p
          style={{
            margin: "0 auto 44px",
            maxWidth: 360,
            font: "400 15px/1.75 var(--font-quicksand),sans-serif",
            color: "rgba(74,46,53,.6)",
            textWrap: "pretty",
          }}
        >
          {MOOD.subtitle}
        </p>
      </div>

      <MarqueeRow cards={MOOD.rowA} direction="left" duration={68} />
      <MarqueeRow cards={MOOD.rowB} direction="right" duration={82} />
    </section>
  );
}

/**
 * Daftar kartu digandakan dua kali dan baris digeser 50% — itu yang bikin
 * loop-nya mulus tanpa jeda kosong saat mengulang.
 */
function MarqueeRow({
  cards,
  direction,
  duration,
}: {
  cards: MoodCard[];
  direction: "left" | "right";
  duration: number;
}) {
  const doubled = [...cards, ...cards];

  return (
    <div
      className="marquee-viewport"
      style={{
        overflow: "hidden",
        margin: "0 -20px",
        maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)",
        WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)",
      }}
    >
      <div
        className="marquee-row"
        style={{ animation: `${direction === "left" ? "marqueeL" : "marqueeR"} ${duration}s linear infinite` }}
      >
        {doubled.map((card, i) => (
          <div
            key={`${card.label}-${i}`}
            aria-hidden={i >= cards.length}
            style={{
              flex: "none",
              width: "clamp(124px,26vw,176px)",
              background: "#fff",
              padding: "9px 9px 0",
              borderRadius: 4,
              boxShadow: "0 12px 28px rgba(74,46,53,.14)",
              transform: `rotate(${card.rotate}deg)`,
            }}
          >
            <div style={{ position: "relative", aspectRatio: "4/5" }}>
              <MediaSlot media={card.photo} sizes="176px" />
            </div>
            <p
              style={{
                margin: 0,
                padding: "9px 3px 11px",
                font: "500 11.5px/1.4 var(--font-quicksand),sans-serif",
                textAlign: "center",
                color: "rgba(74,46,53,.65)",
              }}
            >
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
