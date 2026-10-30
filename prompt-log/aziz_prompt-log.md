# Prompt Log — Wireframe Modal Kata Kunci & Template CV ATS

Proyek: aplikasi pengecek CV berbasis ATS (hasil analisis CV, modal detail kata kunci, katalog template CV).
Alat bantu: Claude (pembuatan wireframe & panduan), Whimsical (penyusunan wireframe akhir).

## Riwayat Prompt

| No | Prompt Pengguna | Respons / Hasil dari Claude |
|----|-----------------|-----------------------------|
| 1 | Mengunggah wireframe "download result - riki" beserta deskripsi fitur #8 (Modal / Pop-up Detail Keyword) dan #9 (Halaman Template CV ATS). | Claude menanyakan tujuan. Pengguna memilih: buat mockup wireframe untuk layar #8 dan #9 dengan gaya yang sama dengan gambar yang diunggah. |
| 2 | Pemilihan opsi: "Create wireframe mockups for screens #8 and #9". | Dibuat halaman HTML wireframe (`wireframes-8-9.html`): modal kata kunci (tab Found/Missing, rekomendasi, tombol Tutup Modal) dan halaman template (filter, pencarian, grid kartu, tombol Pratinjau dan Unduh .DOCX). |
| 3 | "indonesia" | Seluruh teks wireframe diterjemahkan ke Bahasa Indonesia (contoh: "Preview" menjadi "Pratinjau"). Percakapan dilanjutkan dalam Bahasa Indonesia. |
| 4 | "cara memasukan di whimal gimana" | Dijelaskan bahwa Whimsical tidak dapat mengimpor HTML langsung. Alternatif: screenshot lalu masukkan sebagai gambar referensi, atau bangun ulang dengan komponen wireframe Whimsical. |
| 5 | Mengunggah screenshot "Dekstop - 9" + "enaknya rumpun nya itu diapakan" | Diberikan tiga pola filter Rumpun Karir: dropdown multi-select dengan badge, chip horizontal, dan tab. Rekomendasi: dropdown multi-select jika kategori banyak. |
| 6 | "caranya gimana" | Diberikan langkah umum membuat filter dropdown checkbox di Whimsical (panel, checkbox, dua state frame). |
| 7 | Mengunggah screenshot halaman Template CV ATS + "gimana caranya" | Claude menanyakan bagian yang dimaksud. Pengguna memilih: membuat "Rumpun Karir" menjadi dropdown/checkbox. Diberikan langkah rinci (chevron, panel, checkbox, group, frame tertutup/terbuka, interaksi). |
| 8 | Mengunggah screenshot yang sama + "buatkan versi html aja tanpa css dan buatkan prompt log nya" | Dibuat `template-cv-ats.html` (HTML murni tanpa CSS dan tanpa JavaScript) dan dokumen prompt log ini. |

## Keputusan Desain

- Filter Rumpun Karir memakai elemen `<details>` berisi daftar checkbox, sehingga berfungsi sebagai dropdown multi-select tanpa CSS.
- Tiga kartu template disusun dalam tabel agar tampil berjajar tiga kolom meski tanpa CSS.
- Area pratinjau template diwakili elemen `<pre>` sebagai placeholder.
- Tidak ada JavaScript, jadi filter dan pencarian belum menyaring kartu. Itu merupakan tahap pengembangan berikutnya.

## Prompt Ringkas untuk Mengulang Hasil

```
Buatkan halaman HTML murni (tanpa CSS dan tanpa JavaScript) untuk "Template CV ATS":
- Judul h1 "Template CV ATS" dan tautan kembali.
- Filter "Rumpun Karir" berupa dropdown multi-select (details + checkbox): IT, Pemasaran,
  Keuangan, Hukum, Teknik, Desain, Pendidikan, Kesehatan.
- Kolom pencarian dengan placeholder "Cari Template..".
- Tiga kartu template dalam satu baris (tabel), masing-masing berisi placeholder pratinjau,
  nama template, "Cocok untuk: ...", tombol "Pratinjau" dan "Unduh (.DOCX)".
- Teks bawah: "Menampilkan 3 dari 24 template — scroll untuk melihat lebih banyak".
- Gunakan elemen semantik (header, main, section, article, figure) dan Bahasa Indonesia.
```
