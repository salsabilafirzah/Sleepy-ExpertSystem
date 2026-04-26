# Sleepy — Expert System

Sleepy adalah sebuah Sistem Pakar berbasis **Forward Chaining** untuk mendeteksi berbagai jenis gangguan tidur (*sleep disorders*) berdasarkan gejala yang dialami pengguna, serta memberikan rekomendasi penanganan yang sesuai.

Proyek ini dibuat untuk memenuhi **Kebutuhan Responsi Praktikum Kecerdasan Buatan**.

## Live Demo
**[https://sleepy-expert-system.vercel.app/](https://sleepy-expert-system.vercel.app/)**

## Informasi Mahasiswa
- **Nama:** Salsabila Firzah Amanina
- **NIM:** H1D024069
- **Shift Awal:** Shift F
- **Shift Akhir:** Shift E

## Teknologi yang Digunakan
- **Backend:** Python (Flask)
- **Frontend:** HTML5, Vanilla CSS, JavaScript
- **Deployment:** Vercel

## Parameter & Basis Pengetahuan
Sistem ini menggunakan algoritma **Forward Chaining** untuk mencocokkan gejala yang dialami dengan basis pengetahuan yang mencakup 17 gejala klinis (*G01 - G17*). Hasil diagnosa mencakup 7 jenis gangguan tidur utama:
1. **Insomnia Kronis**
2. **Sleep Apnea Obstruktif**
3. **Restless Leg Syndrome**
4. **Narkolepsi**
5. **Parasomnia (REM Sleep Behavior Disorder)**
6. **Hipersomnia**
7. **Sleep Paralysis Terisolasi**

Sistem akan memberikan tingkat keyakinan (*confidence level*) berdasarkan rasio kecocokan gejala serta memberikan edukasi dan saran tindakan medis yang diperlukan.

## Cara Menjalankan Secara Lokal
Jika Anda ingin menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1. Clone repositori ini:
   ```bash
   git clone https://github.com/salsabilafirzah/Sleepy-ExpertSystem.git
   cd Sleepy-ExpertSystem
   ```
2. Pastikan Python sudah terinstall, lalu install Flask:
   ```bash
   pip install -r requirements.txt
   ```
3. Jalankan aplikasi:
   ```bash
   python sleepy.py
   ```
4. Buka browser dan akses `http://127.0.0.1:5000/`
