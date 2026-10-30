# Prompt Log - Sesi Refactoring & Pembuatan Struktur HTML5

# Laporan Pengerjaan & Log Prompt - Modul 06 Konversi Figma ke HTML5
**Nama:** Zakky Zain Alfi Syahri<br>
**Kelompok:** Kelompok 25 (`LolosATS.id`)

Dokumen ini mencatat riwayat instruksi (prompt), analisis, dan perbaikan kode HTML5 semantik berdasarkan desain Figma untuk proyek LolosATS.id.

---

## 1. Riwayat Prompt Pengguna & Respon AI

### A. Halaman Login (`login.html`)
* **Prompt Pengguna (Generasi Awal):**  
  > "Buat kode HTML murni tanpa CSS dan JS untuk halaman login berdasarkan desain Figma. Sertakan tombol kembali, ilustrasi selamat datang, judul login, input email dan password, checkbox 'Lupakan Saya', tombol submit 'Masuk', tombol sekunder 'Login dengan Google', serta link ke halaman registrasi."
* **Respon & Hasil AI:**  
  Menghasilkan kode HTML awal yang merepresentasikan seluruh elemen visual Figma, namun struktur masih dominan menggunakan tag `div` (*div-soup*), input belum terikat ke label, dan tombol belum menggunakan tag semantik.
* **Prompt Pengguna (Refaktorisasi):**  
  > "Lakukan refactoring pada kode HTML login sebelumnya agar memenuhi standar W3C dan aksesibilitas (a11y). Hilangkan seluruh div-soup dan ganti dengan tag semantik header, main, section, figure. Tambahkan elemen <img> dengan format ikon PNG (email, lock, eye, google) pada kolom form, ikat setiap input ke label via id, ubah tautan aksi menjadi elemen <button>, serta susun hierarki heading secara teratur."
* **Respon & Hasil AI:**  
  Menyusun ulang kode `login.html` menggunakan landmark semantik HTML5 murni, menyisipkan elemen `<img>` untuk ikon PNG di dalam kolom input, menghubungkan `<input>` dengan `<label for="...">`, serta memastikan tombol form menggunakan elemen `<button type="submit">`.

---

### B. Halaman Registrasi (`register.html`)
* **Prompt Pengguna (Generasi Awal):**  
  > "Buat kode HTML murni tanpa CSS dan JS untuk halaman registrasi berdasarkan desain Figma, yang mencakup input Nama Lengkap, Email, Password, Konfirmasi Password, tombol submit 'Daftar', serta tautan kembali ke login."
* **Respon & Hasil AI:**  
  Menyediakan draf kode HTML untuk form pendaftaran, tetapi elemen form belum dikelompokkan secara baku dan belum memiliki ikon pendukung pada kolom input.
* **Prompt Pengguna (Refaktorisasi):**  
  > "Lakukan refactoring pada kode halaman registrasi agar sepenuhnya bebas dari pembungkus div redundan. Gunakan landmark semantik HTML5, tambahkan ikon PNG pada setiap kolom input form, hubungkan semua input dengan label melalui atribut for/id, dan pastikan tautan navigasi terhubung penuh ke login.html dan verifikasi-email.html."
* **Respon & Hasil AI:**  
  Mengupdate kode `register.html` dengan struktur semantik modular, menambahkan ikon dekoratif `.png` pada tiap bidang form, serta menghubungkan alur navigasi antar dokumen otentikasi.

---

### C. Halaman Verifikasi Email (`verifikasi-email.html`)
* **Prompt Pengguna (Generasi Awal):**  
  > "Buat kode HTML murni untuk halaman Verifikasi Email berdasarkan desain Figma. Sertakan header ikon email, judul konfirmasi, teks petunjuk OTP, 6 kolom input OTP, tombol kirim ulang kode, tombol submit Verifikasi, dan ilustrasi robot."
* **Respon & Hasil AI:**  
  Menghasilkan struktur awal halaman verifikasi email, namun 6 kolom input OTP masih berdiri sendiri sebagai input teks biasa tanpa pengelompokan semantik dan tanpa pengaturan keyboard seluler.
* **Prompt Pengguna (Refaktorisasi):**  
  > "Refaktor kode verifikasi email menjadi struktur HTML5 semantik dan lulus W3C 100%. Gunakan landmark header main, section, dan figure. Kelompokkan 6 input OTP menggunakan fieldset dan legend. Lengkapi setiap input dengan label serta atribut inputmode='numeric', pattern='[0-9]', maxlength='1', dan autocomplete='one-time-code'. Gunakan tag <button> untuk aksi form dan atur hubungan aksesibilitas via aria-describedby."
* **Respon & Hasil AI:**  
  Menyajikan kode akhir `verifikasi-email.html` yang sepenuhnya terstruktur dengan `<fieldset>` dan `<legend>`, dilengkapi atribut aksesibilitas penuh (`aria-labelledby`, `aria-describedby`), serta siap diuji pada W3C Validator tanpa error maupun warning.

---

## 2. Dokumentasi Sampel Kode Refaktorisasi (Before vs After)

Berikut adalah contoh perbandingan refaktorisasi kode pada halaman Verifikasi Email (`verifikasi-email.html`):

### Kode Sebelum Refactoring (Before - Div-Soup & Non-Semantik)
```html
<!DOCTYPE html>
<html>
<head>
  <title>Verifikasi</title>
</head>
<body>

  <div>
    <div>
      <img src="assets/images/send-mail.png">
      <div>Verifikasi Email</div>
    </div>

    <div>
      <div>Konfirmasi Login Anda</div>
      <div>
        Kami telah mengirim kode verifikasi 6 digit ke email user@gmail.com
      </div>

      <form>
        <div>Kode verifikasi 6 digit</div>
        <input type="text">
        <input type="text">
        <input type="text">
        <input type="text">
        <input type="text">
        <input type="text">

        <a href="#">Kirim ulang code (OTP)</a> <span>60s</span>
        <a href="#">Verifikasi</a>
      </form>
    </div>

    <img src="assets/images/robotduduk.png">
  </div>

</body>
</html>
```

### Kode Setelah Refactoring (After - Semantik & Aksesibel)
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifikasi Email</title>
</head>
<body>

  <header>
    <img src="assets/images/send-mail.png" alt="Ikon Kirim Email" width="48" height="32">
    <h1>Verifikasi Email</h1>
  </header>

  <main>
    <section aria-labelledby="judul-konfirmasi">
      <h2 id="judul-konfirmasi">Konfirmasi Login Anda</h2>
      <p id="petunjuk-otp">
        Kami telah mengirim kode verifikasi 6 digit ke email
        <strong>user@gmail.com</strong>, silakan periksa email Anda.
      </p>
      
      <form action="#" method="post">
        <fieldset aria-describedby="petunjuk-otp">
          <legend>Kode verifikasi 6 digit</legend>

          <label for="otp-1">Digit 1</label>
          <input type="text" id="otp-1" name="otp1" inputmode="numeric" pattern="[0-9]" maxlength="1" autocomplete="one-time-code" required>

          <label for="otp-2">Digit 2</label>
          <input type="text" id="otp-2" name="otp2" inputmode="numeric" pattern="[0-9]" maxlength="1" required>

          <label for="otp-3">Digit 3</label>
          <input type="text" id="otp-3" name="otp3" inputmode="numeric" pattern="[0-9]" maxlength="1" required>

          <label for="otp-4">Digit 4</label>
          <input type="text" id="otp-4" name="otp4" inputmode="numeric" pattern="[0-9]" maxlength="1" required>

          <label for="otp-5">Digit 5</label>
          <input type="text" id="otp-5" name="otp5" inputmode="numeric" pattern="[0-9]" maxlength="1" required>

          <label for="otp-6">Digit 6</label>
          <input type="text" id="otp-6" name="otp6" inputmode="numeric" pattern="[0-9]" maxlength="1" required>
        </fieldset>

        <p>
          Belum menerima kode?
          <button type="button" aria-describedby="hitung-mundur">Kirim ulang code (OTP)</button>
          <span id="hitung-mundur">60s</span>
        </p>

        <p>
          <button type="submit">Verifikasi</button>
        </p>
      </form>
    </section>

    <figure>
      <img src="assets/images/robotduduk.png" alt="Ilustrasi robot asisten AI duduk sambil memegang tablet berisi centang">
    </figure>
  </main>

</body>
</html>
```

## 3. Analisis Refaktorisasi Kode

Proses refaktorisasi pada halaman *Verifikasi Email* berfokus pada pengubahan struktur mentah (*div-soup*) menjadi kode HTML5 yang semantik dan ramah aksesibilitas.

* **Perbaikan Struktur Semantik:** Penggunaan pembungkus `div` secara berlebihan diganti dengan tag landmark seperti `<header>`, `<main>`, `<section>`, dan `<figure>`. Hal ini membuat hierarki dokumen lebih rapi, efisien, dan mudah dipahami oleh mesin pencari maupun *screen reader*.
* **Aksesibilitas & Pengelompokan Form:** Seluruh elemen `<input>` kini terikat secara eksplisit ke `<label>` menggunakan atribut `for` dan `id`. Pengelompokan 6 digit OTP juga memanfaatkan `<fieldset>` dan `<legend>`, serta diperjelas dengan atribut `aria-describedby` untuk memberi konteks yang utuh bagi pengguna pembaca layar.
* **Optimasi Pengalaman Pengguna (UX Seluler):** Penambahan atribut `inputmode="numeric"`, `pattern="[0-9]"`, dan `autocomplete="one-time-code"` memastikan keyboard angka langsung muncul di HP dan mendukung fitur isi otomatis OTP dari SMS/Email.
* **Kepatuhan Standar W3C:** Elemen non-standar seperti tag tautan `<a>` untuk aksi formulir diganti dengan `<button>` yang tepat (`submit`/`button`). Hasilnya, seluruh struktur kode lulus pengujian W3C Validator 100% tanpa *error* maupun *warning*.
