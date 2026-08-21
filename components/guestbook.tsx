"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { GUESTBOOK, PINNED_NOTE } from "@/lib/content";
import { GUESTBOOK_COLLECTION, getDb, isFirebaseConfigured } from "@/lib/firebase";
import { MAX_MESSAGE_LENGTH, MAX_NAME_LENGTH, validateEntry } from "@/lib/moderation";
import { useClientValue } from "@/lib/use-client-value";
import { HeartMark, LilyMark } from "./media-slot";

type Entry = { id: string; name: string; text: string };

const ROTATIONS = [-1.6, 1.3, -0.9, 2, -2.1, 1.7];

export function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<{ tone: "error" | "ok"; message: string } | null>(null);
  const [sending, setSending] = useState(false);

  // Akses admin tersembunyi: tambahkan ?admin=<kunci> di URL (PRD 5.6).
  // Ini hanya menampilkan tombol hapus — aturan aslinya harus ditegakkan
  // lewat Firestore security rules.
  const isAdmin = useClientValue(() => {
    const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY;
    if (!adminKey) return false;
    return new URLSearchParams(window.location.search).get("admin") === adminKey;
  }, false);

  useEffect(() => {
    const db = getDb();
    if (!db) return;

    const unsubscribe = onSnapshot(
      query(collection(db, GUESTBOOK_COLLECTION), orderBy("createdAt", "desc"), limit(200)),
      (snapshot) => {
        setEntries(
          snapshot.docs.map((entry) => {
            const data = entry.data();
            return {
              id: entry.id,
              name: typeof data.name === "string" && data.name ? data.name : "Anonim",
              text: typeof data.text === "string" ? data.text : "",
            };
          }),
        );
      },
      () => setStatus({ tone: "error", message: "Ucapan lama gagal dimuat. Coba refresh ya." }),
    );

    return unsubscribe;
  }, []);

  const submit = async () => {
    const trimmedName = name.trim();
    const trimmedText = text.trim();

    const validation = validateEntry(trimmedName, trimmedText);
    if (!validation.ok) {
      setStatus({ tone: "error", message: validation.message });
      return;
    }

    setSending(true);
    setStatus(null);

    const db = getDb();
    if (!db) {
      // Tanpa Firebase, ucapan hanya hidup di sesi ini.
      setEntries((prev) => [{ id: `local-${Date.now()}`, name: trimmedName || "Anonim", text: trimmedText }, ...prev]);
      setName("");
      setText("");
      setSending(false);
      setStatus({ tone: "ok", message: "Tersimpan sementara (Firebase belum diatur)." });
      return;
    }

    try {
      await addDoc(collection(db, GUESTBOOK_COLLECTION), {
        name: trimmedName || "Anonim",
        text: trimmedText,
        createdAt: serverTimestamp(),
      });
      setName("");
      setText("");
      setStatus({ tone: "ok", message: "Ucapanmu sudah masuk 🌸" });
    } catch {
      setStatus({ tone: "error", message: "Gagal mengirim. Coba lagi sebentar lagi ya." });
    } finally {
      setSending(false);
    }
  };

  const remove = async (id: string) => {
    const db = getDb();
    if (!db || id.startsWith("local-")) {
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
      return;
    }
    try {
      await deleteDoc(doc(db, GUESTBOOK_COLLECTION, id));
    } catch {
      setStatus({ tone: "error", message: "Gagal menghapus ucapan itu." });
    }
  };

  return (
    <section
      style={{
        position: "relative",
        padding: "92px 20px 100px",
        background: "linear-gradient(180deg,#FFEFF4,#FFDDE7)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 34 }}>
          <p
            style={{
              margin: "0 0 10px",
              font: "400 12px var(--font-quicksand),sans-serif",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "#E85D8A",
            }}
          >
            {GUESTBOOK.eyebrow}
          </p>
          <h3
            style={{
              margin: "0 0 8px",
              font: "400 clamp(26px,7vw,36px)/1.28 var(--font-playfair),serif",
              color: "#4A2E35",
            }}
          >
            {GUESTBOOK.title}
          </h3>
          <p
            style={{
              margin: "0 auto",
              maxWidth: 320,
              font: "400 14.5px/1.7 var(--font-quicksand),sans-serif",
              color: "rgba(74,46,53,.6)",
            }}
          >
            {GUESTBOOK.subtitle}
          </p>
        </div>

        <div
          style={{
            position: "relative",
            padding: "24px 20px 20px",
            borderRadius: 24,
            background: "#FFF7F9",
            border: "1px solid rgba(217,178,106,.4)",
            boxShadow: "0 14px 36px rgba(232,93,138,.14)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 10,
              left: 12,
              width: 26,
              height: 26,
              borderTop: "1.5px solid rgba(217,178,106,.7)",
              borderLeft: "1.5px solid rgba(217,178,106,.7)",
              borderRadius: "8px 0 0 0",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 10,
              right: 12,
              width: 26,
              height: 26,
              borderBottom: "1.5px solid rgba(217,178,106,.7)",
              borderRight: "1.5px solid rgba(217,178,106,.7)",
              borderRadius: "0 0 8px 0",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="text"
              value={name}
              maxLength={MAX_NAME_LENGTH}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nama kamu"
              aria-label="Nama kamu"
              className="field"
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1px solid rgba(255,143,171,.5)",
                borderRadius: 14,
                background: "#fff",
                font: "400 15px var(--font-quicksand),sans-serif",
                color: "#4A2E35",
                outline: "none",
              }}
            />
            <textarea
              rows={3}
              value={text}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(event) => setText(event.target.value)}
              placeholder="Ucapan manis buat dia..."
              aria-label="Ucapan"
              className="field"
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "1px solid rgba(255,143,171,.5)",
                borderRadius: 14,
                background: "#fff",
                font: "400 15px/1.6 var(--font-quicksand),sans-serif",
                color: "#4A2E35",
                outline: "none",
                resize: "vertical",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 2 }}>
              <BirthdayCake />
              <button
                type="button"
                onClick={submit}
                disabled={sending}
                className="send-button"
                style={{
                  flex: 1,
                  minHeight: 48,
                  padding: "14px 20px",
                  border: "none",
                  borderRadius: 16,
                  background: "linear-gradient(160deg,#FF8FAB,#E85D8A)",
                  color: "#fff",
                  font: "600 14.5px var(--font-quicksand),sans-serif",
                  letterSpacing: ".04em",
                  cursor: "pointer",
                  boxShadow: "0 8px 22px rgba(232,93,138,.32)",
                }}
              >
                {sending ? "Mengirim..." : "Kirim ucapan"}
              </button>
            </div>

            {status && (
              <p
                aria-live="polite"
                style={{
                  margin: 0,
                  font: "500 13px/1.5 var(--font-quicksand),sans-serif",
                  color: status.tone === "error" ? "#E85D8A" : "rgba(74,46,53,.6)",
                }}
              >
                {status.message}
              </p>
            )}

            {!isFirebaseConfigured && (
              <p style={{ margin: 0, font: "400 12px/1.5 var(--font-quicksand),sans-serif", color: "rgba(74,46,53,.45)" }}>
                Firebase belum diatur, jadi ucapan belum tersimpan permanen.
              </p>
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 28 }}>
          <PinnedNote />

          {entries.map((entry, i) => (
            <article
              key={entry.id}
              className="wish-card"
              style={{
                position: "relative",
                padding: "18px 18px 16px",
                borderRadius: 16,
                background: "#fff",
                boxShadow: "0 10px 26px rgba(232,93,138,.14)",
                transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`,
                animation: "cardIn .5s ease-in-out both",
                animationDelay: `${Math.min(i, 6) * 0.07}s`,
              }}
            >
              <p
                style={{
                  margin: "0 0 8px",
                  font: "400 14.5px/1.7 var(--font-quicksand),sans-serif",
                  color: "rgba(74,46,53,.85)",
                  textWrap: "pretty",
                  whiteSpace: "pre-wrap",
                }}
              >
                {entry.text}
              </p>
              <p
                style={{
                  margin: 0,
                  font: "600 12px var(--font-quicksand),sans-serif",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "#E85D8A",
                }}
              >
                {entry.name}
              </p>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => remove(entry.id)}
                  aria-label={`Hapus ucapan dari ${entry.name}`}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 26,
                    height: 26,
                    border: "1px solid rgba(232,93,138,.3)",
                    borderRadius: "50%",
                    background: "#fff",
                    color: "#E85D8A",
                    font: "600 13px var(--font-quicksand),sans-serif",
                    lineHeight: 1,
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PinnedNote() {
  return (
    <article
      className="wish-card"
      style={{
        position: "relative",
        padding: "22px 22px 20px",
        borderRadius: 18,
        background: "linear-gradient(168deg,#FFF7F9,#FFE9F0)",
        border: "1px solid rgba(217,178,106,.55)",
        boxShadow: "0 14px 34px rgba(232,93,138,.2)",
        transform: "rotate(-0.6deg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -11,
          left: 20,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 11px",
          borderRadius: 12,
          background: "linear-gradient(160deg,#FF8FAB,#E85D8A)",
          boxShadow: "0 5px 14px rgba(232,93,138,.34)",
        }}
      >
        <HeartMark width={11} height={10} />
        <span
          style={{
            font: "600 10px var(--font-quicksand),sans-serif",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          Disematkan
        </span>
      </div>

      <div style={{ position: "absolute", top: 14, right: 16 }}>
        <LilyMark width={26} height={32} opacity={0.5} />
      </div>

      <p
        style={{
          margin: "10px 0 12px",
          font: "400 italic 18px/1.6 var(--font-playfair),serif",
          color: "#4A2E35",
          textWrap: "pretty",
        }}
      >
        {PINNED_NOTE.headline}
      </p>
      <p
        style={{
          margin: "0 0 14px",
          font: "400 15px/1.85 var(--font-quicksand),sans-serif",
          color: "rgba(74,46,53,.8)",
          textWrap: "pretty",
        }}
      >
        {PINNED_NOTE.body}
      </p>
      <p
        style={{
          margin: 0,
          font: "600 12px var(--font-quicksand),sans-serif",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "#E85D8A",
        }}
      >
        {PINNED_NOTE.signature}
      </p>
    </article>
  );
}

function BirthdayCake() {
  return (
    <div aria-hidden="true" style={{ position: "relative", width: 44, height: 40, flex: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 4,
          bottom: 2,
          width: 36,
          height: 18,
          borderRadius: "5px 5px 8px 8px",
          background: "#FFD1DC",
          border: "1.5px solid rgba(74,46,53,.28)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 4,
          bottom: 18,
          width: 36,
          height: 8,
          borderRadius: 6,
          background: "#fff",
          border: "1.5px solid rgba(74,46,53,.22)",
        }}
      />
      <div style={{ position: "absolute", left: 21, bottom: 25, width: 2, height: 8, background: "#D9B26A" }} />
      <div
        style={{
          position: "absolute",
          left: 19,
          bottom: 32,
          width: 6,
          height: 6,
          borderRadius: "50% 50% 50% 0",
          background: "#E85D8A",
          transform: "rotate(-45deg)",
          animation: "twinkle 2.2s ease-in-out infinite",
        }}
      />
    </div>
  );
}
