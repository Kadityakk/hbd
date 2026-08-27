"use client";

import { useCallback, useEffect, useState } from "react";
import { useClientValue } from "@/lib/use-client-value";
import { BirthdayPoster } from "./birthday-poster";
import { Guestbook } from "./guestbook";
import { HeroSection } from "./hero-section";
import { JourneyGallery } from "./journey-gallery";
import { LockScreen } from "./lock-screen";
import { MoodBoard } from "./mood-board";
import { MusicPlayer } from "./music-player";
import { SiteFooter } from "./site-footer";
import { VideoSection } from "./video-section";

/**
 * "pacar" = jalur PIN, akses penuh.
 * "teman" = jalur tamu: hanya ucapan pembuka, mood board, dan guestbook —
 *   galeri perjalanan hidup dan video ucapan tetap khusus buat dia.
 * null = masih terkunci.
 */
export type AccessMode = "pacar" | "teman";

const STORAGE_KEY = "birthday-access-mode";

export function BirthdayExperience() {
  const [chosen, setChosen] = useState<AccessMode | null>(null);

  // Akses bertahan selama tab masih terbuka, jadi refresh tidak mengunci ulang.
  // Di server nilainya selalu null, artinya render pertama tetap terkunci.
  const restored = useClientValue(() => sessionStorage.getItem(STORAGE_KEY), null);
  const mode = chosen ?? (restored === "pacar" || restored === "teman" ? restored : null);

  useEffect(() => {
    document.body.style.overflow = mode ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mode]);

  const enter = useCallback((next: AccessMode) => {
    sessionStorage.setItem(STORAGE_KEY, next);
    window.scrollTo(0, 0);
    setChosen(next);
  }, []);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const isPartner = mode === "pacar";

  return (
    <div style={{ position: "relative", width: "100%", overflowX: "clip" }}>
      {!mode && <LockScreen onUnlock={() => enter("pacar")} onGuest={() => enter("teman")} />}

      <HeroSection start={mode !== null} />

      {/* Poster kolase: tepat sesudah ucapan pembuka, dan tidak digerbang mode
          akses — tamu dan dia sama-sama lihat halaman ini. */}
      <BirthdayPoster />

      {isPartner && (
        <JourneyGallery>
          <VideoSection onPlayingChange={setVideoPlaying} />
        </JourneyGallery>
      )}

      <MoodBoard raised={!isPartner} />

      <Guestbook />

      <SiteFooter />

      {mode && <MusicPlayer active ducked={videoPlaying} />}
    </div>
  );
}
