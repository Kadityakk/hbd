"use client";

import { useEffect, useRef } from "react";
import { JOURNEY, type JourneyPanel } from "@/lib/content";
import { MediaSlot } from "./media-slot";

type Props = {
  /** Panel video disisipkan di ujung tumpukan sticky (hanya untuk jalur pacar). */
  children?: React.ReactNode;
};

export function JourneyGallery({ children }: Props) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    const dots = dotsRef.current;
    if (!gallery || !dots) return;

    const panels = Array.from(gallery.querySelectorAll<HTMLElement>("[data-panel]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = gallery.getBoundingClientRect();
      const viewport = window.innerHeight;
      const panelHeight = Math.max(1, viewport);
      const scrolled = -rect.top;

      const inside = rect.top < viewport * 0.4 && rect.bottom > viewport * 0.6 && scrolled < panelHeight * 4.6;
      dots.style.opacity = inside ? "1" : "0";

      panels.forEach((el, i) => {
        // 0 → panel ini yang paling atas; 1 → sudah tertutup penuh oleh foto berikutnya.
        const progress = Math.min(1, Math.max(0, (scrolled - i * panelHeight) / panelHeight));
        const eased = progress * progress * (3 - 2 * progress);
        el.style.transform = `scale(${1 - 0.075 * eased}) translateY(${-22 * eased}px)`;
        el.style.filter = `brightness(${1 - 0.14 * eased})`;
        el.style.borderRadius = `${30 + 14 * eased}px ${30 + 14 * eased}px 0 0`;
        el.style.zIndex = String(i + 1);
      });

      const active = Math.min(JOURNEY.length - 1, Math.max(0, Math.round(scrolled / panelHeight)));
      Array.from(dots.children).forEach((dot, i) => {
        const node = dot as HTMLElement;
        node.style.background = i === active ? "#E85D8A" : "rgba(232,93,138,.28)";
        node.style.transform = i === active ? "scale(1.5)" : "scale(1)";
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Caption muncul pelan begitu panelnya benar-benar terlihat.
  useEffect(() => {
    const captions = galleryRef.current?.querySelectorAll<HTMLElement>("[data-cap]");
    if (!captions?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        });
      },
      { threshold: 0.45 },
    );

    captions.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={galleryRef} style={{ position: "relative" }}>
      <div
        ref={dotsRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          right: 14,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: 9,
          opacity: 0,
          transition: "opacity .4s ease-in-out",
          pointerEvents: "none",
        }}
      >
        {JOURNEY.map((panel) => (
          <div
            key={panel.badge}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "rgba(232,93,138,.28)",
              transition: "all .3s ease-in-out",
            }}
          />
        ))}
      </div>

      {JOURNEY.map((panel, i) => (
        <JourneySection key={panel.badge} panel={panel} index={i} />
      ))}

      {children}
    </div>
  );
}

function JourneySection({ panel, index }: { panel: JourneyPanel; index: number }) {
  return (
    <section
      data-panel={index + 1}
      style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "56px 22px",
        background: `linear-gradient(180deg,${panel.gradient[0]},${panel.gradient[1]})`,
        borderRadius: "30px 30px 0 0",
        boxShadow: panel.shadow,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(94vw,438px)",
          display: "flex",
          flexDirection: panel.flipped ? "row-reverse" : "row",
          alignItems: "center",
          gap: "clamp(10px,3vw,18px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -16,
            [panel.flipped ? "right" : "left"]: panel.flipped ? -12 : -14,
            zIndex: 2,
            padding: "6px 13px",
            borderRadius: 14,
            background: panel.badgeStyle.background,
            color: panel.badgeStyle.color,
            font: "600 11px var(--font-quicksand),sans-serif",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            boxShadow: panel.badgeStyle.shadow,
            transform: `rotate(${panel.badgeStyle.rotate}deg)`,
          }}
        >
          {panel.badge}
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            background: "#fff",
            padding: "14px 14px 0",
            borderRadius: 5,
            boxShadow: "0 20px 44px rgba(74,46,53,.16)",
            transform: `rotate(${panel.photoRotate}deg)`,
          }}
        >
          <div style={{ position: "relative", aspectRatio: "4/5" }}>
            <MediaSlot media={panel.photo} sizes="(max-width: 480px) 70vw, 340px" />
          </div>
          <p
            data-cap
            style={{
              margin: 0,
              padding: "16px 6px 20px",
              font: "500 14.5px/1.55 var(--font-quicksand),sans-serif",
              textAlign: "center",
              color: "rgba(74,46,53,.78)",
              opacity: 0,
              transform: "translateY(10px)",
              transition: "opacity .7s ease-in-out,transform .7s ease-in-out",
            }}
          >
            {panel.caption}
          </p>
        </div>

        <StampPhoto panel={panel} />
      </div>
    </section>
  );
}

/** Foto kecil bergaya perangko, dengan tepi bergerigi dari mask CSS. */
function StampPhoto({ panel }: { panel: JourneyPanel }) {
  const perforation = [
    "radial-gradient(circle 4px at 50% 0,#0000 96%,#000) 0 0/13px 13px repeat-x",
    "radial-gradient(circle 4px at 50% 100%,#0000 96%,#000) 0 100%/13px 13px repeat-x",
    "radial-gradient(circle 4px at 0 50%,#0000 96%,#000) 0 0/13px 13px repeat-y",
    "radial-gradient(circle 4px at 100% 50%,#0000 96%,#000) 100% 0/13px 13px repeat-y",
  ].join(",");

  return (
    <div
      style={{
        position: "relative",
        flex: "none",
        zIndex: 3,
        width: "clamp(68px,18vw,94px)",
        transform: `rotate(${panel.stampRotate}deg) translateY(${panel.stampShift}px)`,
        filter: "drop-shadow(0 8px 18px rgba(74,46,53,.22))",
      }}
    >
      <div
        style={{
          padding: 8,
          background: "#FFFDF8",
          mask: perforation,
          WebkitMask: perforation,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <div style={{ padding: 4, border: "1px solid rgba(217,178,106,.6)" }}>
          <div style={{ position: "relative", aspectRatio: "4/5" }}>
            <MediaSlot media={panel.stamp} sizes="94px" />
          </div>
          <p
            style={{
              margin: "4px 0 0",
              font: "500 10px var(--font-space-grotesk),monospace",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "rgba(74,46,53,.72)",
              textAlign: "center",
            }}
          >
            {panel.stampLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
