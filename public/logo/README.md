# Logo

Gambar poodle-nya ada di sini sebagai **`poodle.png`** — sudah dirapikan:
latar putihnya dibuat transparan, lalu dipotong pas dan diberi bingkai persegi
512×512 supaya utuh waktu ditaruh di dalam lingkaran (kuping kiri-kanannya pas
menyentuh tepi, tidak kepotong).

Path & framing-nya diatur di [`lib/content.ts`](../../lib/content.ts) → `LOGO`:

- `src` — path filenya (`/logo/poodle.png`)
- `focus` — titik fokus crop lingkaran. Sekarang `center` karena filenya sudah
  persegi. Kalau nanti diganti gambar potret, geser ke `center 40%` (kepala
  ketinggian) atau `center 60%` (kepotong di bawah).

Selama file ini belum ada, logonya otomatis jatuh ke lambang lily —
halamannya tidak akan menampilkan ikon rusak.

Dipakai di:

- lock screen (dengan halo yang bernapas) dan footer
- label tengah piringan hitam di tombol musik — ikut berputar selama lagu jalan
- favicon & ikon home screen, lewat `app/icon.png` (256px) dan
  `app/apple-icon.png` (180px, latar krem karena iOS tidak suka transparan).
  Dua file itu di-generate dari `poodle.png`; kalau logonya diganti, buat ulang
  keduanya dengan ukuran yang sama.
