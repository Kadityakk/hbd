Prd website ulang tahun 19th · MD
PRD — Website Ucapan Ulang Tahun ke-19
Nama Proyek: Birthday Surprise Website Dibuat untuk: Pacar tersayang (ulang tahun ke-19) Tema Visual: Pink elegan, lily flower, romantis & personal Dokumen ini disusun oleh: [Nama kamu] Versi: 1.0

1. Ringkasan Proyek
   Website ucapan ulang tahun personal dan interaktif, dikunci dengan PIN tanggal lahir, berisi perjalanan hidup pacar dalam bentuk galeri foto beranimasi, ucapan personal, video, musik favorit, dan buku tamu digital tempat teman-temannya bisa memberi ucapan. Website ini dibuat sebagai kejutan yang hanya bisa diakses oleh orang yang tahu tanggal lahirnya (dan orang-orang yang diberi link olehnya).

2. Tujuan
   Memberikan kejutan ulang tahun yang berkesan dan personal secara digital.
   Merangkum perjalanan hidup pacar dari kecil hingga sekarang dengan cara yang emosional dan estetik.
   Menyediakan ruang bagi teman-temannya untuk ikut memberi ucapan (guestbook publik).
   Menonjolkan kesan "dibuat khusus untuknya", bukan template generik.
3. Target Pengguna
   Peran Deskripsi
   Primary user Pacar kamu — penerima utama kejutan
   Secondary user Teman-teman/keluarga yang diberi link — bisa masuk lewat mode "Masuk sebagai Teman" tanpa PIN, dengan akses terbatas (ucapan pembuka, galeri foto, dan comment section saja)
   Admin Kamu — mengunggah foto, video, lagu, dan memoderasi komentar
4. User Flow
   Website punya dua jalur akses: jalur utama (khusus pacar, pakai PIN, akses penuh) dan jalur tamu (untuk teman-teman, tanpa PIN, akses terbatas).

4.1 Jalur Utama (Pacar — via PIN)
Buka link website → muncul Lock Screen bergaya kalkulator dengan tema pink + lily.
Masukkan PIN tanggal lahir 28 08 07 → validasi.
Jika benar → transisi elegan ke halaman ucapan pembuka dengan efek ketik (typewriter), musik mulai diputar otomatis.
Scroll → galeri 5 foto perjalanan hidup dengan efek parallax/swipe-card.
Scroll → mood board galeri foto dua baris (fun facts tentang dia).
Scroll → video ucapan personal dari kamu.
Scroll → comment section / guestbook.
Scroll paling bawah → footer.
4.2 Jalur Tamu (Teman-teman — tanpa PIN)
Buka link website → muncul Lock Screen.
Alih-alih memasukkan PIN, klik tombol/link "Masuk sebagai Teman".
Langsung masuk ke halaman ucapan pembuka (typewriter, musik tetap main).
Scroll → galeri 5 foto perjalanan hidup (sama seperti jalur utama).
Scroll → langsung ke comment section / guestbook untuk memberi ucapan.
Scroll paling bawah → footer.
Catatan: jalur tamu melewati section Mood Board dan Video Ucapan Personal — dua section itu memang dikhususkan untuk pacar kamu saja.

Tombol floating mute/unmute musik tetap tersedia di kedua jalur, di semua section.

5. Fitur & Spesifikasi Detail
   5.1 Lock Screen (PIN Input)
   Desain menyerupai kalkulator/keypad angka.
   Elemen dekoratif: love/hati berwarna pink berisi ilustrasi bunga lily, floating di sekitar keypad.
   Input PIN 6 digit format DD MM YY → 28 08 07.
   Jika PIN salah: animasi shake halus + pesan lembut (misal: "Coba lagi sayang 🌸"), tanpa memberi tahu bagian mana yang salah (biar tetap surprise & aman).
   Jika PIN benar: transisi fade/scale ke halaman berikutnya, bukan reload kasar.
   Tambahkan elemen konstelasi bintang Virgo (♍) transparan tipis di background keypad sebagai personal touch tersembunyi (dia lahir 28 Agustus, zodiak Virgo).
   Sediakan tombol/link kecil "Masuk sebagai Teman →" di bawah keypad, untuk teman-teman yang tidak tahu PIN. Klik ini langsung membawa ke pengalaman versi tamu (skip PIN sepenuhnya), lihat detail jalur di bagian 4.2.
   Rekomendasi tambahan: batasi percobaan (misal beri hint lembut setelah 5x salah) supaya dia tidak frustrasi kalau lupa, tapi tetap terasa "terkunci khusus untuknya".
   Catatan teknis: gunakan state akses (misal mode: "pacar" | "teman") untuk menentukan section mana yang dirender — Mood Board & Video Ucapan hanya muncul jika mode === "pacar".
   5.2 Halaman Ucapan Pembuka
   Efek typewriter/ketik elegan, bukan muncul sekaligus.
   Teks pembuka: "Happy Birthday sayangku 🌸" + beberapa kalimat ucapan manis (kamu isi nanti).
   Background: video bunga lily (looping, muted, kamu upload nanti) dengan overlay gradient pink transparan agar teks tetap terbaca.
   Nuansa warna pink dominan, tipografi elegan (script/serif untuk judul, sans-serif untuk isi).
   Rekomendasi tambahan: tambahkan efek kelopak bunga lily dan daisy jatuh perlahan (petal falling animation) di atas video sebagai lapisan tambahan agar terasa hidup.
   5.3 Galeri Perjalanan Hidup (Parallax Scroll Gallery)
   Total 5 foto dengan urutan kronologis:
   No Fase Deskripsi
   1 Balita/kecil Foto masa kecil
   2 SD Foto masa SD
   3 SMP Foto masa SMP
   4 SMA Foto masa SMA
   5 Sekarang Foto masa kini
   Setiap foto punya caption manis & lucu custom sesuai foto (kamu isi nanti, PRD ini sediakan slot teksnya).
   Efek scroll: smooth scroll + parallax, foto seperti card yang di-swipe/geser ke atas dan berganti otomatis mengikuti posisi scroll (mirip story-scroll Apple product page).
   Tambahkan indikator progress kecil (misal 5 titik/dot) di pinggir layar menunjukkan sudah di foto keberapa.
   Rekomendasi tambahan:
   Beri label usia/tahun di tiap card ("Umur 5 tahun", "SD kelas 4", dst) untuk memperkuat rasa "perjalanan waktu".
   Gunakan frame foto ala polaroid dengan sedikit rotasi natural agar terasa scrapbook, bukan galeri kaku.
   5.4 Mood Board — Galeri Foto Dua Baris (Fun Facts Tentang Dia)
   Section transisi setelah galeri foto, sebelum video ucapan — hanya muncul di jalur utama (tidak tampil di jalur tamu, lihat 4.2).
   Format berupa galeri foto dua baris berjalan otomatis (efek marquee/infinite scroll horizontal):
   Baris atas bergerak perlahan ke kiri, looping tanpa henti.
   Baris bawah bergerak perlahan ke kanan, berlawanan arah dengan baris atas — menciptakan kesan visual yang hidup dan dinamis.
   Kecepatan gerak dibuat pelan dan smooth (bukan cepat), agar tiap foto masih sempat dilihat jelas.
   Foto/ilustrasi yang mengisi kedua baris merepresentasikan interest dia: zodiak Virgo (♍), bunga favorit (lily & daisy), makanan/minuman favorit (sushi, matcha, ramen, dimsum), tempat impian (Italy), hewan kesayangan (kucing & poodle), dan ikan cantik (koi/betta).
   Tiap foto boleh diberi label kecil di bawah/atasnya (misal "Ramen 🍜", "Virgo ♍") tanpa mengganggu gerakan berjalan.
   Rekomendasi tambahan:
   Gunakan teknik looping seamless (duplikasi list foto) supaya tidak ada jeda kosong saat baris mengulang dari awal.
   Saat foto di-hover (desktop) atau ditekan (mobile), gerakan baris tersebut bisa pause sejenak agar terlihat lebih jelas (opsional, nice-to-have).
   5.5 Video Ucapan dari Kamu
   Diletakkan setelah galeri foto, sebagai puncak emosional sebelum guestbook.
   Player custom bertema pink (bukan default browser player), dengan tombol play berbentuk hati/bunga lily.
   Rekomendasi tambahan: beri judul kecil sebelum video, misal "Ada satu hal yang ingin aku sampaikan langsung..." untuk membangun momen sebelum video diputar.
   5.6 Comment Section (Guestbook Digital)
   Form input kecil dengan elemen dekoratif bunga lily pink dan ilustrasi kue ulang tahun lucu.
   Field: Nama + Ucapan (opsional: emoji picker sederhana).
   Komentar tersimpan permanen dan realtime muncul untuk semua pengunjung (butuh backend/database, lihat bagian rekomendasi teknis).
   Section ini dapat diakses dari kedua jalur (pacar via PIN maupun teman via "Masuk sebagai Teman") — memang ditujukan agar semua orang bisa ikut memberi ucapan.
   Rekomendasi tambahan:
   Tambahkan sedikit moderasi dasar (filter kata kasar) karena section ini publik dan bisa diisi siapa saja yang punya link.
   Beri kamu (admin) akses tersembunyi untuk menghapus komentar tidak pantas.
   Tampilkan komentar dalam bentuk "kartu ucapan" kecil yang melayang lembut (staggered fade-in) agar terasa hidup, bukan list biasa.
   5.7 Musik Latar (Lagu Favorit)
   Diletakkan sebagai background audio yang mulai otomatis setelah PIN berhasil dimasukkan (momen ini penting secara teknis, lihat catatan di bawah).
   Sediakan folder khusus (misal /public/music/) dengan format mp3, playlist bisa lebih dari 1 lagu diputar berurutan (loop).
   Tombol floating mute/unmute + indikator lagu apa yang sedang main, tetap bertema pink, muncul di semua section.
   Catatan teknis: browser modern memblokir autoplay audio tanpa interaksi user. Karena PIN adalah interaksi pertama, musik dipicu tepat setelah submit PIN benar — ini otomatis menyelesaikan masalah autoplay.
   5.8 Footer
   Playful & tetap pink: bisa berisi tanggal spesial, tanda tangan digital kamu, ikon bunga lily kecil berulang sebagai border pattern.
   Rekomendasi tambahan: tambahkan easter egg kecil di footer, misal jika diklik memunculkan pesan rahasia tambahan ("pesan cinta tersembunyi").
6. Desain & Gaya Visual (Design System)
   Elemen Rekomendasi
   Warna utama Blush pink
   #FFD1DC, rose pink
   #FF8FAB, deep pink accent
   #E85D8A
   Warna latar Cream/off-white
   #FFF7F9
   Aksen tambahan Emas lembut
   #D9B26A untuk kesan elegan (opsional, dipakai tipis saja)
   Font judul Elegant script/serif (misal: Playfair Display, Dancing Script)
   Font isi Sans-serif lembut (misal: Poppins, Quicksand)
   Ikon/elemen dekoratif Bunga lily, hati, kue ulang tahun kecil, kelopak bunga
   Gaya animasi Smooth, lembut, tidak buru-buru — semua transisi easing "ease-in-out"
7. Konten yang Perlu Kamu Siapkan (Checklist)
   Jenis Konten Jumlah Status
   Video background bunga lily (untuk halaman ucapan) 1 ⬜
   Foto masa kecil 1 ⬜
   Foto masa SD 1 ⬜
   Foto masa SMP 1 ⬜
   Foto masa SMA 1 ⬜
   Foto sekarang 1 ⬜
   Caption manis/lucu per foto (5 teks) 5 ⬜
   Kalimat ucapan pembuka (typewriter) beberapa kalimat ⬜
   Video ucapan personal dari kamu 1 ⬜
   Lagu favorit (mp3) 1 atau lebih ⬜
   Foto/ilustrasi untuk mood board 2 baris (representasi zodiak, bunga, makanan, travel, hewan — kamu isi nanti) disarankan 8–12 gambar per baris agar looping mulus ⬜
   Tanggal PIN dikonfirmasi 28 08 07 ✅
8. Rekomendasi Teknis (Tech Stack)
   Kebutuhan Rekomendasi
   Framework React / Next.js (mudah dihosting gratis di Vercel)
   Animasi scroll & parallax Framer Motion atau GSAP + ScrollTrigger
   Efek galeri berjalan dua arah (marquee) CSS keyframe animation custom, atau library seperti react-fast-marquee
   Audio player Howler.js atau elemen <audio> custom
   Database komentar realtime Firebase Firestore atau Supabase (gratis untuk skala kecil)
   Hosting Vercel / Netlify (gratis, custom domain opsional)
   Optimasi media Kompres video & foto (WebP/MP4 H.264) agar loading cepat di HP
9. Pertimbangan Non-Fungsional
   Mobile-first: Kemungkinan besar dia dan teman-temannya membuka lewat HP → prioritaskan tampilan mobile.
   Performa: Video background & foto perlu dikompres agar tidak lambat saat load pertama kali.
   Privasi: Karena guestbook publik dan link bisa disebar teman-temannya, pastikan tidak ada data pribadi sensitif ditampilkan di comment section.
   Aksesibilitas link: Pertimbangkan apakah link ini akan private (hanya dibagikan manual) atau bisa ditemukan lewat search — sebaiknya private agar tetap eksklusif.
   Kontrol akses: PIN dan "Masuk sebagai Teman" adalah pembeda pengalaman (UX gate), bukan sistem keamanan sungguhan — siapapun yang tahu PIN atau memilih jalur tamu tetap bisa mengakses halaman-halaman publik (galeri foto, comment section).
10. Ringkasan Improvement dari Ide Awal
    Label usia/tahun di tiap foto galeri untuk memperkuat efek "perjalanan waktu".
    Efek kelopak bunga lily jatuh di halaman ucapan pembuka.
    Progress indicator (dot) selama scroll galeri foto.
    Frame foto ala polaroid dengan rotasi natural.
    Kalimat pembuka sebelum video ucapan untuk membangun momen.
    Moderasi dasar + akses hapus komentar untuk kamu sebagai admin.
    Animasi kartu komentar melayang lembut saat muncul.
    Easter egg pesan rahasia tambahan di footer.
    Strategi autoplay musik yang aman secara teknis (dipicu oleh submit PIN).
    Section mood board "fun facts" bertema zodiak Virgo, bunga lily & daisy, makanan favorit (sushi, matcha, ramen, dimsum), Italy, kucing, poodle, dan ikan cantik — memperkuat kesan personal yang sangat spesifik untuknya, bukan template umum.
    Mode akses "Masuk sebagai Teman" tanpa PIN, dengan pengalaman terbatas (ucapan pembuka, galeri foto, comment section) — menjaga mood board & video ucapan tetap eksklusif untuk pacar kamu saja.
    Mood board diubah menjadi galeri foto dua baris dengan efek marquee berlawanan arah, memberi kesan section yang lebih hidup dan dinamis dibanding kartu statis.
11. Timeline Sederhana (Saran)
    Tahap Estimasi Waktu
    Setup project & struktur halaman 1 hari
    Lock screen + validasi PIN 1 hari
    Halaman ucapan + typewriter effect 1 hari
    Galeri foto + parallax scroll 2 hari
    Mood board galeri 2 baris (marquee) + mode akses "Masuk sebagai Teman" 1 hari
    Video section + audio player 1 hari
    Comment section (realtime) 1–2 hari
    Footer + polish animasi & testing di HP 1 hari
    Total estimasi: ±8–10 hari kerja santai, bisa dipercepat sesuai waktu yang kamu punya sebelum tanggal ulang tahunnya.
