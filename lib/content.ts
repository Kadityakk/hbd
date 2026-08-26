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

export const PIN = "280807191";

/** Berapa kali salah sebelum hint lembut muncul (PRD 5.1). */
export const HINT_AFTER_ATTEMPTS = 5;

/**
 * Logo situs — si poodle. Taruh filenya di public/logo/poodle.png.
 * Dipakai di lock screen, footer, tombol musik, dan favicon (app/layout.tsx).
 * Kalau filenya belum ada, komponennya otomatis jatuh ke lambang lily.
 */
export const LOGO = {
  src: "/logo/poodle.png",
  alt: "Logo poodle",
  /** Titik fokus crop lingkaran. Filenya sudah persegi, jadi "center" pas.
   *  Geser mis. ke "center 40%" kalau nanti diganti gambar berformat potret. */
  focus: "center",
};

export const HERO = {
  /** Baris kecil di atas judul. */

  title: "Happy Birthday, my sweetest love 💐😘",
  paragraph:
    "I hope this new year of your life brings you even more happiness, good health, and slowly turns all your dreams into reality. I want to stick around and watch it all happen with you, celebrating every little and big moment together. lopyuu lopyuuu lopyuuu 😘",
  /** Video/foto bunga lily sebagai background. Video akan diputar muted + loop. */
  background: {
    src: "/video/liliy%20blooms%20bg.mp4",
    placeholder: "lily video / photo (background)",
    alt: "Lily flowers",
  } satisfies Media,
};

export type JourneyPanel = {
  /** Tidak ditampilkan di halaman; cuma penanda/kunci tiap panel. */
  badge: string;
  caption: string;
  stampLabel: string;
  photo: Media;
  stamp: Media;
  /** 4 foto pemanis bergaya perangko: 2 di kiri, 2 di kanan panel (tampil di layar lebar). */
  decor: [Media, Media, Media, Media];
  /** Warna gradient panel, dari atas ke bawah. */
  gradient: [string, string];
  shadow: string;
  /** Foto polaroid di kiri (false) atau kanan (true). */
  flipped: boolean;
  photoRotate: number;
  stampRotate: number;
  stampShift: number;
};

const decorSet = (
  era: string,
  files: [string, string, string, string],
): [Media, Media, Media, Media] =>
  files.map((file, i) => ({
    src: `/photos/stamp/${file}`,
    placeholder: `pemanis ${era} ${i + 1}`,
    alt: `Foto pemanis ${era} ${i + 1}`,
  })) as [Media, Media, Media, Media];

export const JOURNEY: JourneyPanel[] = [
  {
    badge: "Candra Kcielz",
    caption:
      "Lihat siapa si cantik kecil ini, dari dulu udah cantik banget pacar akuh",
    stampLabel: "Little Princess",
    photo: {
      src: "/photos/journey/candrakecil.jpeg",
      placeholder: "candrakecil",
      alt: "Foto masa kecil",
    },
    stamp: {
      src: "/photos/stamp/candrakecilstamp.jpeg",
      placeholder: "candrakecilstamp",
      alt: "candrakecilstamp",
    },
    decor: decorSet("TK", [
      "stamp6.jpeg",
      "stamp18.jpg",
      "stamp8.jpeg",
      "stamp13.jpg",
    ]),
    gradient: ["#FFF7F9", "#FFEFF4"],
    shadow: "0 -20px 44px rgba(232,93,138,.12)",
    flipped: false,
    photoRotate: -3.2,
    stampRotate: 7,
    stampShift: 6,
  },
  {
    badge: "si cantik",
    caption: "omeigottt gaullnyaa pacarakuu waktuu ituuu😎",
    stampLabel: "😎🤘",
    photo: {
      src: "/photos/journey/candrasd.jpeg",
      placeholder: "candrasd",
      alt: "Foto masa SD",
    },
    stamp: {
      src: "/photos/stamp/candrasdstamp.jpeg",
      placeholder: "candrasdstamp",
      alt: "Foto masa SD lainnya",
    },
    decor: decorSet("SD", [
      "stamp9.jpg",
      "stamp3.jpeg",
      "stamp10.jpg",
      "stamp1.jpeg",
    ]),
    gradient: ["#FFF1F5", "#FFE6ED"],
    shadow: "0 -20px 44px rgba(232,93,138,.14)",
    flipped: true,
    photoRotate: 2.6,
    stampRotate: -8,
    stampShift: -8,
  },
  {
    badge: "cantik polos",
    caption: "pacar aku udah mulai remaja nih, makin gaul dan metal🤘",
    stampLabel: "😧💐",
    photo: {
      src: "/photos/journey/candrasmp.jpeg",
      placeholder: "candrasmp",
      alt: "Foto masa SMP",
    },
    stamp: {
      src: "/photos/stamp/candrasmpstamp.jpeg",
      placeholder: "candrasmpstamp",
      alt: "Foto masa SMP lainnya",
    },
    decor: decorSet("SMP", [
      "stamp4.jpeg",
      "stamp19.jpg",
      "stamp12.jpg",
      "stamp16.jpg",
    ]),
    gradient: ["#FFEAF1", "#FFDDE7"],
    shadow: "0 -20px 44px rgba(232,93,138,.16)",
    flipped: false,
    photoRotate: -2.2,
    stampRotate: 6,
    stampShift: 10,
  },
  {
    badge: "Si cantik sudah remaja",
    caption:
      "omaigoshhhhh udahh mulai dewasa sama udah keluar aura feminimnya, makin cantik, makin lutu 😍😍",
    stampLabel: "metal 🤤",
    photo: {
      src: "/photos/journey/candrasma.jpeg",
      placeholder: "candrasma",
      alt: "Foto masa SMA",
    },
    stamp: {
      src: "/photos/stamp/candrasmastamp.jpeg",
      placeholder: "candrasmastamp",
      alt: "Foto masa SMA lainnya",
    },
    decor: decorSet("SMA", [
      "stamp2.jpeg",
      "stamp7.jpg",
      "stamp20.jpg",
      "stamp17.jpg",
    ]),
    gradient: ["#FFE4EC", "#FFD1DC"],
    shadow: "0 -20px 44px rgba(232,93,138,.18)",
    flipped: true,
    photoRotate: 3,
    stampRotate: -7,
    stampShift: -6,
  },
  {
    badge: "19 tahun",
    caption:
      "dangggg inii nih iniii, pacar aku sekarang udah makin dewasa, makin cantik, makin lucu, makin sexy, makin hot, makin baddie😍💐🤤😘",
    stampLabel: "19 · 2026 ❤️",
    photo: {
      src: "/photos/journey/pacarakusekarang.jpeg",
      placeholder: "pacarakusekarang",
      alt: "Foto sekarang",
    },
    stamp: {
      src: "/photos/stamp/pacarakusekarangstamp.jpeg",
      placeholder: "pacarakusekarangstamp",
      alt: "Foto favorit",
    },
    decor: decorSet("19 tahun", [
      "stamp5.jpeg",
      "stamp11.jpg",
      "stamp15.jpg",
      "stamp14.jpg",
    ]),
    gradient: ["#FFD9E4", "#FFC7D6"],
    shadow: "0 -20px 44px rgba(232,93,138,.2)",
    flipped: false,
    photoRotate: -1.4,
    stampRotate: 9,
    stampShift: 8,
  },
];

export const VIDEO = {
  eyebrow: "One more thing",
  title: "There is a little video for you sayanggku",
  note: "cinematic 😎",
  /** Video ucapan personal (portrait 9:16). */
  src: "",
  poster: {
    src: "",
    placeholder: "birthday video (portrait)",
    alt: "Birthday video",
  } satisfies Media,
};

export type MoodCard = { label: string; photo: Media; rotate: number };

const moodRotations = [-2.4, 1.8, -1.4, 2.6, -2, 1.2];

/** [label yang tampil, nama file di /public/photos/gallery]. */
type MoodEntry = [label: string, file: string];

const moodCard = ([label, file]: MoodEntry, i: number): MoodCard => ({
  label,
  rotate: moodRotations[i % moodRotations.length],
  photo: { src: `/photos/gallery/${file}`, placeholder: label, alt: label },
});

export const MOOD = {
  eyebrow: "memories gallery",
  title: "All the little things that make you, you",
  subtitle:
    "Small pieces of us and of you, drifting past like a little film that never quite ends.",
  rowA: (
    [
      ["Matcha and Beautiful", "matchaandbeautiful.jpeg"],
      ["Mam nasgor", "mamnasgor.jpeg"],
      ["Cantik lutu", "cantiklutu.jpeg"],
      ["Lily is you", "Lilyisyou.jpeg"],
      ["Cantik mendaki", "cantikmendaki.jpeg"],
      ["Cantik di pantai", "cantikdipantai.jpeg"],
    ] satisfies MoodEntry[]
  ).map(moodCard),
  rowB: (
    [
      ["Lutunaa kita", "lutunakita.jpeg"],
      ["Hiking date ygy", "hikingdateygy.jpeg"],
      ["Mam sushii", "mamsushi.jpeg"],
      ["Buket bunga lutu", "buketbungalutu.jpeg"],
      ["Diesteria selfie", "diesteriaselfie.jpeg"],
      ["Fotbar pertama kita", "fotbarpertamakita.jpeg"],
    ] satisfies MoodEntry[]
  ).map(moodCard),
};

export const GUESTBOOK = {
  eyebrow: "Guestbook",
  title: "Greeting from all your friends",
  subtitle: "Leave her something sweet wish.",
};

/** Ucapan kamu sendiri — selalu tampil paling atas dan tidak bisa dihapus. */
export const PINNED_NOTE = {
  headline: "Happy nineteenth birthday, my love.",
  body: "I have never been very good at big surprises, so I made this instead slowly, one small piece at a time a little place with all of you inside it. Thank you for being the most patient, the warmest, the person I am proudest of. I hope everything you quietly wish for finds its way to you this year, and that I get to be standing right next to you when it does.",
  signature: "Your Bf Aditya",
};

export const FOOTER = {
  line: "Thank you for growing this far tayy. The rest of the way, we walk together.",
  signature: "from adit ganteng",
  /** Easter egg: muncul kalau tanda tangan di footer diklik. */
  secret:
    "If you found this, it means you were being curious and that is one of my favourite things about you. I love you, today and every day that comes after ❤️😘💐😍.",
};

export type Track = { title: string; artist: string; src: string };

/** Taruh mp3 di /public/music/ lalu daftarkan di sini. Diputar berurutan lalu mengulang. */
export const PLAYLIST: Track[] = [
  {
    title: "Love Like You",
    artist: "Rebecca Sugar",
    src: "/music/love-like-you.mp3",
  },
];
