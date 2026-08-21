// Moderasi dasar untuk guestbook publik (PRD 5.6). Bukan filter sempurna —
// tujuannya menyaring yang paling kasar sebelum tampil di halaman ulang tahun.

const BLOCKED = [
  "anjing",
  "anjay",
  "asu",
  "bajingan",
  "bangsat",
  "bego",
  "bodoh",
  "goblok",
  "kampret",
  "kontol",
  "memek",
  "ngentot",
  "pepek",
  "pukimak",
  "tolol",
  "babi",
  "jancok",
  "jancuk",
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "cunt",
  "dick",
];

/** Cocokkan kata utuh supaya "bego" tidak menandai "begonia". */
const PATTERN = new RegExp(`(?:^|[^a-z0-9])(${BLOCKED.join("|")})(?:[^a-z0-9]|$)`, "i");

/** Normalisasi leetspeak sederhana supaya "b3g0" ikut tersaring. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[0]/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/[3]/g, "e")
    .replace(/[4@]/g, "a")
    .replace(/[5$]/g, "s")
    .replace(/[7]/g, "t");
}

export function containsProfanity(text: string): boolean {
  return PATTERN.test(normalize(text));
}

export const MAX_NAME_LENGTH = 40;
export const MAX_MESSAGE_LENGTH = 400;

export type ValidationResult = { ok: true } | { ok: false; message: string };

export function validateEntry(name: string, text: string): ValidationResult {
  if (!text.trim()) return { ok: false, message: "Ucapannya belum diisi 🌸" };
  if (text.length > MAX_MESSAGE_LENGTH)
    return { ok: false, message: `Ucapannya kepanjangan (maks ${MAX_MESSAGE_LENGTH} karakter).` };
  if (name.length > MAX_NAME_LENGTH) return { ok: false, message: `Namanya kepanjangan (maks ${MAX_NAME_LENGTH} karakter).` };
  if (containsProfanity(text) || containsProfanity(name))
    return { ok: false, message: "Yuk pakai kata yang lebih manis 🌸" };
  return { ok: true };
}
