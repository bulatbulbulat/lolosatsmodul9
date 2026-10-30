# 📄 Dokumentasi Modul Upload - LolosATS.id
# ini repo baru yang udah ada integrasi apinya 

## 1. Deskripsi Singkat
Modul ini bertindak sebagai antarmuka utama pengguna untuk mengunggah file Curricula Vitae (CV) dalam format digital (`.pdf` / `.docx`) sebelum diproses oleh sistem analisis ATS. Halaman dirancang secara responsif, proporsional, dan terintegrasi langsung dengan penyimpanan cloud **Supabase Storage**.

---

## 2. Fitur Utama & Alur Kerja (Workflow)
- **Desain & Responsivitas:**
  - Layout *full-width* dengan kontainer proporsional dan batasan batas aman (*padding*).
  - Tampilan visual *card* bertema *navy dark* dengan modal popover peringatan kesalahan format/ukuran file.
- **Form Input Interaktif:**
  - Input pilihan file CV (`.pdf`, `.docx` - Max 5MB).
  - Field input teks untuk **Posisi Pekerjaan** yang dituju.
  - Field input teks untuk **Deskripsi Pekerjaan** (Job Description).
- **Trigger Pemicu Manual:**
  - Proses *upload* tidak berjalan secara otomatis (*onchange*), melainkan terpicu saat pengguna menekan tombol **"Mulai Analisis CV"**.
- **Integrasi Cloud:**
  - File yang diunggah dikirim secara langsung ke Supabase Storage bucket (`cv-bucket`).
  - Indikator teks *loading* interaktif pada tombol saat proses unggah berlangsung.
  - Pengarahan (*redirection*) otomatis ke `CV_Analysis_Results.html` setelah unggahan sukses.

---

## 3. Struktur File Terkait
- `uploadcv.html` : Antarmuka halaman depan *upload* CV.
- `js/cvUpload.js` : Logika validasi file, event handler tombol submit, dan proses *upload* ke Supabase.
- `js/supabaseClient.js` : Konfigurasi inisialisasi koneksi Supabase Anon Key & URL.

---

## 4. Panduan Pengujian (Testing Steps)
1. Buka halaman `uploadcv.html`.
2. Pilih file CV berformat `.pdf` atau `.docx` (kurang dari 5MB).
3. Isi kolom **Posisi Pekerjaan** dan **Deskripsi Pekerjaan**.
4. Klik tombol **"Mulai Analisis CV"**.
5. Amati tombol berubah menjadi *"Sedang Mengunggah & Menganalisis..."*, disusul notifikasi berhasil dan pengalihan ke halaman hasil.
