# Prompt Log - Sesi Refactoring & Pembuatan Struktur HTML5

# Laporan Pengerjaan & Log Prompt - Modul 06 Konversi Figma ke HTML5
**Nama:** Mochamad Riqky Fernando  
**Kelompok:** Kelompok 25 (`LolosATS.id`)

Dokumen ini mencatat riwayat instruksi (prompt), analisis, dan perbaikan kode HTML5 semantik berdasarkan desain Figma untuk proyek **LolosATS.id**.

---

## 1. Pembuatan Struktur HTML5 Halaman Utama Berdasarkan Figma
* **Prompt Pengguna:** Meminta pembuatan struktur kode HTML5 murni untuk Hero Section, Navbar, Footer, card keunggulan web, section berita, dan CTA berdasarkan desain Figma, dengan aturan mutlak tanpa CSS eksternal, inline style, pembungkus `div` berlebihan (*div-soup*), serta menggunakan tag `<img>` dengan format jalur yang ditentukan.
* **Tindakan AI:** Menyusun kode HTML semantik (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) yang bersih dari pembungkus div berlebih.

## 2. Refactoring Kode HTML untuk Standar W3C & Penghapusan Div-Soup
* **Prompt Pengguna:** Melakukan refactoring pada kode HTML sebelumnya (`riki.html`) agar memenuhi standar W3C, bersih dari *div-soup*, memiliki hierarki heading yang runut (`<h1>` hingga `<h3>`), memenuhi standar aksesibilitas (a11y), dan bebas dari tag usang.
* **Tindakan AI:** Merapikan struktur heading dokumen, menambahkan atribut aksesibilitas seperti `aria-label` pada elemen navigasi, serta memastikan tag form (`<fieldset>` dan `<legend>`) terstruktur dengan baik.

## 3. Pembuatan Struktur HTML5 Komponen Notifikasi / Pop-Up
* **Prompt Pengguna:** Meminta pembuatan struktur kode HTML5 murni untuk komponen notifikasi (hasil analisis skor CV) berdasarkan desain Figma.
* **Tindakan AI:** Membuat struktur menggunakan elemen semantik `<aside>`, `<button>`, `<section>`, `<article>`, dan `<footer>` tanpa menyertakan gaya CSS inline atau eksternal.

## 4. Validasi & Perbaikan Peringatan W3C (File 1: Halaman Utama)
* **Prompt Pengguna:** Melaporkan pesan *warning* dari W3C validator: *"Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections..."* pada bagian Footer/CTA.
* **Tindakan AI:** Menambahkan elemen heading tersembunyi (`<h2 hidden>`) di dalam tag `<section>` pada area Footer agar lolos validasi hierarki section W3C.

## 5. Validasi & Perbaikan Peringatan W3C (File 2: Komponen Notifikasi)
* **Prompt Pengguna:** Melaporkan beberapa *error* dan *warning* dari W3C validator terkait file kedua (tidak ada tag `<!DOCTYPE html>`, tidak ada atribut `lang`, tidak ada `<title>`, *section lacks heading*, serta heading tingkat 1 tidak ditemukan).
* **Tindakan AI:** Menambahkan struktur dokumen HTML standar (`<!DOCTYPE html>`, `<html lang="id">`, `<head>`, `<title>`), serta memperbaiki hierarki heading dari `<h2>` hingga `<h4>` secara runut.
* **Revisi Lanjutan:** Memperbaiki peringatan *heading level 1* dengan mengubah judul utama notifikasi menjadi `<h1>` agar urutan hierarki heading dokumen terpenuhi dengan sempurna.