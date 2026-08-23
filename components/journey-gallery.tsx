"use client";

import { useEffect, useRef } from "react";
import { JOURNEY, type JourneyPanel, type Media } from "@/lib/content";
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

    const panels = Array.from(
      gallery.querySelectorAll<HTMLElement>("[data-panel]"),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = gallery.getBoundingClientRect();
      const viewport = window.innerHeight;
      const panelHeight = Math.max(1, viewport);
      const scrolled = -rect.top;

      const inside =
        rect.top < viewport * 0.4 &&
        rect.bottom > viewport * 0.6 &&
        scrolled < panelHeight * 4.6;
      dots.style.opacity = inside ? "1" : "0";

      panels.forEach((el, i) => {
        // 0 → panel ini yang paling atas; 1 → sudah tertutup penuh oleh foto berikutnya.
        const progress = Math.min(
          1,
          Math.max(0, (scrolled - i * panelHeight) / panelHeight),
        );
        const eased = progress * progress * (3 - 2 * progress);
        el.style.transform = `scale(${1 - 0.075 * eased}) translateY(${-22 * eased}px)`;
        el.style.filter = `brightness(${1 - 0.14 * eased})`;
        el.style.borderRadius = `${30 + 14 * eased}px ${30 + 14 * eased}px 0 0`;
        el.style.zIndex = String(i + 1);
      });

      const active = Math.min(
        JOURNEY.length - 1,
        Math.max(0, Math.round(scrolled / panelHeight)),
      );
      Array.from(dots.children).forEach((dot, i) => {
        const node = dot as HTMLElement;
        node.style.background =
          i === active ? "#E85D8A" : "rgba(232,93,138,.28)";
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
    const captions =
      galleryRef.current?.querySelectorAll<HTMLElement>("[data-cap]");
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

function JourneySection({
  panel,
  index,
}: {
  panel: JourneyPanel;
  index: number;
}) {
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
      <DecorStamps panel={panel} index={index} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          // Dikurangi padding panel (22px + 22px): dengan `94vw` baris ini lebih
          // lebar dari ruang isi panel di HP, jadi perangko sampingnya kepotong
          // di tepi layar.
          width: "min(100vw - 60px,438px)",
          display: "flex",
          flexDirection: panel.flipped ? "row-reverse" : "row",
          alignItems: "center",
          gap: "clamp(10px,3vw,18px)",
        }}
      >
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
            <MediaSlot
              media={panel.photo}
              sizes="(max-width: 480px) 70vw, 340px"
            />
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

/**
 * Tepi bergerigi perangko.
 *
 * Tiap sisi punya satu layer mask yang menutupi SELURUH elemen (tile-nya
 * 100% di sumbu yang tidak berulang), dengan setengah lingkaran transparan
 * berulang di satu tepi. Keempat layer lalu di-`intersect`: hasilnya seluruh
 * perangko dikurangi lubang di keempat tepinya.
 *
 * Ini bagian yang bikin perangko tidak muncul sebelumnya: tile-nya dulu
 * `step x step`, jadi tiap layer cuma menutupi pita setebal 13px di satu tepi.
 * Irisan pita atas dan pita bawah kosong -> mask kosong -> seluruh perangko
 * (foto samping polaroid maupun empat pemanis) hilang total walau ada di DOM.
 */
function perforationMask(hole: number, step: number) {
  const dot = (at: string) =>
    `radial-gradient(circle ${hole}px at ${at},#0000 96%,#000 100%)`;

  return {
    image: [dot("50% 0"), dot("50% 100%"), dot("0 50%"), dot("100% 50%")].join(
      ",",
    ),
    size: [
      `${step}px 100%`,
      `${step}px 100%`,
      `100% ${step}px`,
      `100% ${step}px`,
    ].join(","),
    // `round` menyesuaikan jarak gigi ke ukuran perangko, biar lubang terakhir
    // tidak terpotong di tengah.
    repeat: [
      "round no-repeat",
      "round no-repeat",
      "no-repeat round",
      "no-repeat round",
    ].join(","),
  };
}

type StampFrameProps = {
  media: Media;
  sizes: string;
  label?: string;
  /** Jarak antar gigi; ikut menentukan besar lubangnya. */
  step?: number;
  padding?: number;
};

/** Bingkai putih bergerigi + garis emas tipis, isinya satu foto 4:5. */
function StampFrame({
  media,
  sizes,
  label,
  step = 13,
  padding = 8,
}: StampFrameProps) {
  const mask = perforationMask(step * 0.31, step);

  return (
    <div
      style={{
        padding,
        background: "#FFFDF8",
        WebkitMaskImage: mask.image,
        WebkitMaskSize: mask.size,
        WebkitMaskRepeat: mask.repeat,
        WebkitMaskComposite: "source-in",
        maskImage: mask.image,
        maskSize: mask.size,
        maskRepeat: mask.repeat,
        // Ditaruh paling akhir: harus menang atas versi -webkit- di browser
        // yang meng-alias keduanya.
        maskComposite: "intersect",
      }}
    >
      <div style={{ padding: 4, border: "1px solid rgba(217,178,106,.6)" }}>
        <div style={{ position: "relative", aspectRatio: "4/5" }}>
          <MediaSlot media={media} sizes={sizes} />
        </div>
        {label ? (
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
            {label}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Foto kecil bergaya perangko yang menempel di samping polaroid. */
function StampPhoto({ panel }: { panel: JourneyPanel }) {
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
      <StampFrame media={panel.stamp} sizes="94px" label={panel.stampLabel} />
    </div>
  );
}

type DecorSpot = {
  side: "left" | "right";
  anchorY: "top" | "bottom";
  /** Layar sempit: perangko duduk di sudut panel, x = jarak dari tepi. */
  sm: { x: string; y: string };
  /** Layar lebar: perangko mengapit polaroid, offset = jarak tengah panel ke sisi dalamnya (px). */
  lg: { offset: number; y: string };
  /** Pengali lebar dasar, biar keempatnya tidak sama besar. */
  scale: number;
  rotate: number;
  /** Beda-beda supaya melayangnya tidak barengan. */
  delay: number;
};

// Dua susunan yang dipakai bergantian antar panel, biar tiap slide terasa lain.
const DECOR_LAYOUTS: DecorSpot[][] = [
  [
    {
      side: "left",
      anchorY: "top",
      sm: { x: "2vw", y: "4%" },
      lg: { offset: 238, y: "13%" },
      scale: 1,
      rotate: -8,
      delay: 0,
    },
    {
      side: "left",
      anchorY: "bottom",
      sm: { x: "5vw", y: "5%" },
      lg: { offset: 284, y: "16%" },
      scale: 0.84,
      rotate: 6,
      delay: 1.6,
    },
    {
      side: "right",
      anchorY: "top",
      sm: { x: "4vw", y: "7%" },
      lg: { offset: 252, y: "20%" },
      scale: 0.9,
      rotate: 7,
      delay: 0.8,
    },
    {
      side: "right",
      anchorY: "bottom",
      sm: { x: "1.5vw", y: "4%" },
      lg: { offset: 230, y: "12%" },
      scale: 1.05,
      rotate: -6,
      delay: 2.4,
    },
  ],
  [
    {
      side: "left",
      anchorY: "top",
      sm: { x: "4.5vw", y: "6%" },
      lg: { offset: 256, y: "19%" },
      scale: 0.88,
      rotate: 5,
      delay: 1.1,
    },
    {
      side: "left",
      anchorY: "bottom",
      sm: { x: "1.5vw", y: "4%" },
      lg: { offset: 232, y: "13%" },
      scale: 1.04,
      rotate: -7,
      delay: 2.7,
    },
    {
      side: "right",
      anchorY: "top",
      sm: { x: "2vw", y: "4%" },
      lg: { offset: 234, y: "12%" },
      scale: 1,
      rotate: -6,
      delay: 0.3,
    },
    {
      side: "right",
      anchorY: "bottom",
      sm: { x: "5vw", y: "6%" },
      lg: { offset: 280, y: "17%" },
      scale: 0.86,
      rotate: 8,
      delay: 1.9,
    },
  ],
];

/**
 * Empat perangko pemanis per panel: dua di kiri, dua di kanan.
 *
 * Posisinya dua versi, dipilih lewat media query (didefinisikan langsung di
 * komponen `JourneyGallery`, lihat `<style>` di sana):
 * - layar lebar → mengapit polaroid, mengisi ruang kosong kiri-kanan;
 * - layar sempit → pindah ke empat sudut panel, di atas dan di bawah polaroid,
 *   karena di sana tidak ada ruang samping sama sekali.
 *
 * Nilainya dititipkan sebagai custom property (`--x-sm`/`--x-lg` dst.) supaya
 * satu elemen bisa punya dua tata letak tanpa media query per perangko.
 */
function DecorStamps({ panel, index }: { panel: JourneyPanel; index: number }) {
  const spots = DECOR_LAYOUTS[index % DECOR_LAYOUTS.length];

  return (
    <div className="journey-decor" aria-hidden="true">
      {spots.map((spot, i) => (
        <div
          key={i}
          className="journey-decor-item"
          style={
            {
              [spot.side]: "var(--x)",
              [spot.anchorY]: "var(--y)",
              // Cuma rotate: ukurannya sudah diatur `width: calc(var(--w) *
              // var(--s))` di globals.css, kalau di-scale lagi jadi dobel.
              transform: `rotate(${spot.rotate}deg)`,
              "--s": spot.scale,
              // Batas minimum biar di layar sempit perangkonya tidak nempel
              // (dan kepotong) di tepi panel.
              "--x-sm": `max(16px, ${spot.sm.x})`,
              "--y-sm": spot.sm.y,
              // Sedikit menjauh dari polaroid saat layar melebar, tapi tidak pernah
              // sampai keluar panel di layar yang lebih sempit.
              "--x-lg": `max(4px, 50% - ${spot.lg.offset}px - 3vw - var(--w) * var(--s))`,
              "--y-lg": spot.lg.y,
            } as React.CSSProperties
          }
        >
          <div
            className="journey-decor-float"
            style={{
              animationDelay: `${spot.delay}s`,
              animationDuration: `${7 + (i % 3)}s`,
            }}
          >
            <StampFrame
              media={panel.decor[i]}
              sizes="(max-width: 767px) 92px, 138px"
              step={11}
              padding={7}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
