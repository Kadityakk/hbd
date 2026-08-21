// Semua teks & path media dikumpulkan di sini supaya kamu tinggal isi satu file.
// Taruh file aslinya di /public sesuai path di bawah, lalu isi `src`.
// Selama `src` masih kosong, slot-nya tampil sebagai placeholder bertema pink.

export type Media = {
  /** Path relatif dari /public, mis. "/photos/tk.jpg". Kosongkan kalau belum ada. */
  src?: string;
  /** Teks yang tampil di placeholder selama `src` masih kosong. */
  placeholder: string;
  alt: string;
};

export const PIN = "280807";

/** Berapa kali salah sebelum hint lembut muncul (PRD 5.1). */
export const HINT_AFTER_ATTEMPTS = 5;

export const HERO = {
  date: "28 Agustus",
  title: "Selamat ulang tahun ke-19, sayang.",
  paragraph:
    "Sembilan belas tahun kamu ada di dunia ini, dan sebagian kecilnya kebetulan aku ikut menemani. Halaman ini aku buat pelan-pelan — supaya kamu tahu, kamu selalu jadi hal yang paling aku syukuri.",
  /** Video/foto bunga lily sebagai background. Video akan diputar muted + loop. */
  background: {
    src: "",
    placeholder: "video / foto bunga lily (background)",
    alt: "Bunga lily",
  } satisfies Media,
};

export type JourneyPanel = {
  badge: string;
  caption: string;
  stampLabel: string;
  photo: Media;
  stamp: Media;
  /** Warna gradient panel, dari atas ke bawah. */
  gradient: [string, string];
  shadow: string;
  /** Foto polaroid di kiri (false) atau kanan (true). */
  flipped: boolean;
  badgeStyle: { background: string; color: string; rotate: number; shadow: string };
  photoRotate: number;
  stampRotate: number;
  stampShift: number;
};

export const JOURNEY: JourneyPanel[] = [
  {
    badge: "TK",
    caption: "Belum kenal aku, tapi senyumnya sudah sama.",
    stampLabel: "TK · 2012",
    photo: { src: "", placeholder: "foto masa kecil", alt: "Foto masa kecil" },
    stamp: { src: "", placeholder: "foto kecil", alt: "Foto masa kecil lainnya" },
    gradient: ["#FFF7F9", "#FFEFF4"],
    shadow: "0 -20px 44px rgba(232,93,138,.12)",
    flipped: false,
    badgeStyle: { background: "#FFD1DC", color: "#4A2E35", rotate: -6, shadow: "0 4px 12px rgba(232,93,138,.2)" },
    photoRotate: -3.2,
    stampRotate: 7,
    stampShift: 6,
  },
  {
    badge: "SD",
    caption: "Rambut dikuncir dua, dunia masih sesederhana itu.",
    stampLabel: "SD · 2015",
    photo: { src: "", placeholder: "foto masa SD", alt: "Foto masa SD" },
    stamp: { src: "", placeholder: "foto SD lain", alt: "Foto masa SD lainnya" },
    gradient: ["#FFF1F5", "#FFE6ED"],
    shadow: "0 -20px 44px rgba(232,93,138,.14)",
    flipped: true,
    badgeStyle: { background: "#fff", color: "#E85D8A", rotate: 5, shadow: "0 4px 12px rgba(232,93,138,.2)" },
    photoRotate: 2.6,
    stampRotate: -8,
    stampShift: -8,
  },
  {
    badge: "SMP",
    caption: "Fase paling banyak drama, paling banyak tumbuh.",
    stampLabel: "SMP · 2019",
    photo: { src: "", placeholder: "foto masa SMP", alt: "Foto masa SMP" },
    stamp: { src: "", placeholder: "foto SMP lain", alt: "Foto masa SMP lainnya" },
    gradient: ["#FFEAF1", "#FFDDE7"],
    shadow: "0 -20px 44px rgba(232,93,138,.16)",
    flipped: false,
    badgeStyle: { background: "#4A2E35", color: "#FFF7F9", rotate: -5, shadow: "0 4px 12px rgba(74,46,53,.24)" },
    photoRotate: -2.2,
    stampRotate: 6,
    stampShift: 10,
  },
  {
    badge: "SMA",
    caption: "Di sini aku mulai jatuh, dan belum berhenti sampai sekarang.",
    stampLabel: "SMA · 2023",
    photo: { src: "", placeholder: "foto masa SMA", alt: "Foto masa SMA" },
    stamp: { src: "", placeholder: "foto SMA lain", alt: "Foto masa SMA lainnya" },
    gradient: ["#FFE4EC", "#FFD1DC"],
    shadow: "0 -20px 44px rgba(232,93,138,.18)",
    flipped: true,
    badgeStyle: { background: "#fff", color: "#E85D8A", rotate: 6, shadow: "0 4px 12px rgba(232,93,138,.2)" },
    photoRotate: 3,
    stampRotate: -7,
    stampShift: -6,
  },
  {
    badge: "19 tahun",
    caption: "Dan tahun ini, aku yang paling beruntung bisa ikut merayakan.",
    stampLabel: "19 · 2026",
    photo: { src: "", placeholder: "foto kita sekarang", alt: "Foto sekarang" },
    stamp: { src: "", placeholder: "foto favorit", alt: "Foto favorit" },
    gradient: ["#FFD9E4", "#FFC7D6"],
    shadow: "0 -20px 44px rgba(232,93,138,.2)",
    flipped: false,
    badgeStyle: {
      background: "linear-gradient(160deg,#FF8FAB,#E85D8A)",
      color: "#fff",
      rotate: -4,
      shadow: "0 4px 14px rgba(232,93,138,.34)",
    },
    photoRotate: -1.4,
    stampRotate: 9,
    stampShift: 8,
  },
];

export const VIDEO = {
  eyebrow: "Satu lagi",
  title: "Ada video buat kamu",
  note: "1 menit 12 detik · tonton sampai habis ya",
  /** Video ucapan personal (portrait 9:16). */
  src: "",
  poster: { src: "", placeholder: "video ucapan (portrait)", alt: "Video ucapan" } satisfies Media,
};

export type MoodCard = { label: string; photo: Media; rotate: number };

const moodRotations = [-2.4, 1.8, -1.4, 2.6, -2, 1.2];

const moodCard = (label: string, i: number): MoodCard => ({
  label,
  rotate: moodRotations[i % moodRotations.length],
  photo: { src: "", placeholder: "foto", alt: label },
});

export const MOOD = {
  eyebrow: "Fun facts",
  title: "Hal-hal yang bikin kamu, kamu",
  subtitle: "Sepotong-sepotong momen yang bikin kamu, kamu — jalan terus kayak film kecil.",
  rowA: ["matcha, tanpa gula", "sushi date", "si kucing", "ramen malam", "bunga lily", "ketawa kamu"].map(moodCard),
  rowB: ["poodle kesayangan", "koi di kolam", "Italy, someday", "daisy kecil", "dimsum favorit", "kita, random hari"].map(
    moodCard,
  ),
};

export const GUESTBOOK = {
  eyebrow: "Guestbook",
  title: "Titipan dari yang lain",
  subtitle: "Tulis ucapanmu, nanti dia baca semuanya.",
};

/** Ucapan kamu sendiri — selalu tampil paling atas dan tidak bisa dihapus. */
export const PINNED_NOTE = {
  headline: "Selamat ulang tahun ke-19, cintaku.",
  body: "Aku nggak pandai bikin kejutan besar, jadi aku bikin ini pelan-pelan — halaman kecil yang isinya kamu semua. Terima kasih sudah jadi orang yang paling sabar, paling hangat, paling aku banggakan. Semoga tahun ini semua yang kamu doakan pelan-pelan datang, dan aku boleh terus ada di sebelahmu saat itu terjadi.",
  signature: "Dari aku · selalu",
};

export const FOOTER = {
  line: "Terima kasih sudah tumbuh sejauh ini. Sisanya, kita jalani bareng.",
  signature: "— dari aku, selalu",
  /** Easter egg: muncul kalau tanda tangan di footer diklik. */
  secret:
    "Kalau kamu nemu pesan ini, berarti kamu iseng — dan itu salah satu hal yang paling aku suka dari kamu. Aku sayang kamu, hari ini dan sisa hari yang lain. 🌸",
};

export type Track = { title: string; artist: string; src: string };

/** Taruh mp3 di /public/music/ lalu daftarkan di sini. Diputar berurutan lalu mengulang. */
export const PLAYLIST: Track[] = [
  // { title: "Judul lagu", artist: "Penyanyi", src: "/music/lagu-1.mp3" },
];
