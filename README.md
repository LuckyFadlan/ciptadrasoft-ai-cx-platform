# CiptadraSoft AI Customer Experience (CX) Platform
### Onebox-Inspired Role-Based Omnichannel Contact Center & Enterprise Solution

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 🌟 Ringkasan Eksekutif (Executive Overview)

**CiptadraSoft AI CX Platform** adalah platform purwarupa contact center & customer experience cerdas yang terinspirasi oleh arsitektur **Onebox CRM & CiptadraSoft**. Platform ini mendemonstrasikan integrasi penuh antara **AI Chatbot Generatif**, **Triage Tiket Otomatis**, **Agent Assist Copilot**, **Speech Analytics**, **Pemantauan Mutu (Quality Monitoring)**, serta **Portal Layanan Mandiri Pelanggan (Self-Service)** dalam satu alur kerja terpadu.

Berbeda dengan dasbor monolitik tradisional, aplikasi ini menerapkan **Role-Based Workspaces** di mana setiap persona organisasi (Agen CS, Supervisor, Marketing, dan Nasabah) mendapatkan antarmuka kerja kontekstual yang ringkas, kaya data, dan bebas dari blok teks penjelasan berlebih.

---

## 👥 4 Perspektif & Ruang Kerja Berbasis Peran (Role-Based Workspaces)

### 1. 🎧 CS Agent Desk (Andi Wijaya & Siti Rahmawati)
*Perspektif staf frontliner untuk pelayanan pelanggan multi-saluran.*
- **Antrean Berbasis Identitas**: Memisahkan tiket "Ditugaskan ke Saya" (Case A/B) dan "Antrean Triage Terbuka" (Queue).
- **Klasifikasi & Triage Otomatis (Case A vs Case B)**:
  - **Case A (Teknis/Mendesak)**: Masalah downtime SIP Trunk, database PBX, kuota interkoneksi, SLA 60 menit ditugaskan ke **CS A (Andi Wijaya)**.
  - **Case B (Billing/Invoicing)**: Rekonsiliasi BCA Virtual Account, faktur pajak, SLA 4 jam ditugaskan ke **CS B (Siti Rahmawati)**.
- **Agent Assist Copilot**: AI merekomendasikan draf balasan terstandarisasi, analisis sentimen, dan ringkasan riwayat percakapan.
- **Rekomendasi SOP & Knowledge Base**: Penelusuran langsung modul Ciptadra & Onebox dengan skor relevansi.
- **Customer 360**: Profil pelanggan enterprise, riwayat nilai kontrak, NPS, dan tiket sebelumnya.
- **Scorecard Pribadi Agen**: Memantau FCR (First Contact Resolution), ketaatan SLA, AHT, dan simulasi rating CSAT langsung.

---

### 2. 📊 Supervisor Cockpit (Ferry Darmawan)
*Pusat kendali operasional, pemantauan mutu, dan pembinaan tim.*
- **Team Monitoring (Live Operations)**: Okupansi agen real-time, status shift kerja, dan beban antrean tiket.
- **Quality Monitoring (QM)**: Audit otomatis kepatuhan SLA regulasi (OJK/BI), akurasi respon, dan skor AI Quality (skala 0-100).
- **Speech Analytics & Voice Call Intelligence**:
  - Transkrip rekaman panggilan otomatis (CS Support & Sales Negotiation).
  - Simulasi audio player interaktif dengan visualisasi gelombang suara (waveform).
  - Deteksi kecepatan bicara (WPM), interupsi, gaya bahasa, serta heatmap keberatan nasabah (objections) dan pertanyaan berulang.
- **Predictive Service & Churn Alert**: Peringatan dini AI terhadap risiko churn korporasi, lonjakan beban SLA, dan rekomendasi kontak proaktif.
- **Workforce Management (WFM)**: Jadwal shift harian (Pagi/Siang/Malam), pemantauan jam istirahat, dan utilisasi kapasitas.
- **Rencana Pelatihan AI (Training Plans)**: Kurikulum pembinaan yang dirancang otomatis berdasarkan area kelemahan agen.
- **Ringkasan Eksekutif Harian & Log Audit**: Ringkasan singkat otomatis (kejadian utama, akar masalah, rekomendasi tindakan) dan catatan audit trail keputusan AI.

---

### 3. 📈 Marketing Intelligence (Maya Putri)
*Pusat data pertumbuhan bisnis, sentimen sosial, dan perjalanan pelanggan.*
- **Social Sentiment & Media Monitoring**:
  - Pemantauan multi-platform (LinkedIn, Instagram, Twitter/X, TikTok).
  - Distribusi sentimen visual rasio positif/netral/negatif.
  - Ekstraksi sinyal kata kunci positif dan pain points konsumen.
  - Rekomendasi strategi preskriptif AI untuk tim komunikasi/PR.
- **Corong Perjalanan Pelanggan (Customer Journey AIDA Funnel)**:
  - Visualisasi 4 tahap corong: **Attention (10.000)** → **Interest (4.200)** → **Desire (1.900)** → **Action (540)**.
  - Analisis 3 lapis pada tiap tahapan: **Deskriptif**, **Prediktif**, dan **Preskriptif**.
  - Identifikasi faktor penghambat (drop-off barriers) konversi.
- **Outbound Campaigns (Simulation Mode)**:
  - Draf kampanye terpersonalisasi dengan variabel dinamis (`{{name}}`, `{{company}}`).
  - Simulasi pengiriman 1-klik dengan metrik estimasi Open Rate, Click Rate, dan Response Rate.
- **Wawasan Pasar (Market Insights)**: Tren industri perbankan/asuransi dan analisis diferensiasi kompetitif.

---

### 4. 🏢 Portal Layanan Mandiri Pelanggan (Customer Self-Service Portal)
*Dirancang berdasarkan cetak biru arsitektur Customer Experience (4 Pilar):*
- **Pilar 1: Manajemen Akun & Transaksi (Mandiri)**:
  - Pembaruan profil korporasi dan informasi kontak penanggung jawab.
  - Riwayat faktur tagihan & unduh e-faktur/tanda terima resmi (PDF).
  - Pelacakan status langganan dan sisa masa aktif lisensi.
- **Pilar 2: Pusat Informasi & Solusi (Edukasi)**:
  - Pencarian mandiri Knowledge Base & panduan teknis implementasi.
  - Smart FAQ interaktif seputar keamanan data, on-premise vs cloud, dan integrasi API.
  - **Kalkulator Biaya & Pemakaian**: Simulasi dinamis kebutuhan lisensi agen CS, saluran omnichannel, dan add-on GenAI.
- **Pilar 3: Dukungan & Penyelesaian Masalah (Akselerasi)**:
  - Formulir tiket baru dengan opsi unggah file lampiran (terkoneksi langsung ke antrean CS).
  - Akses cepat ke **AI Chatbot Virtual Assistant**.
  - **Booking Kunjungan Teknisi**: Jadwal janji temu implementasi teknisi on-site.
- **Pilar 4: Interaksi & Komunitas (Sosial)**:
  - Forum diskusi komunitas pengguna dengan badge solusi (Solved).
  - Kotak saran & ide fitur (Feedback Box) dengan sistem pemungutan suara (Upvoting).

---

## 💬 Floating Generative AI Chatbot ("Ciptadra AI")

Chatbot melayang di pojok kanan bawah tetap aktif di seluruh halaman dan dasbor:
- **3 Mode Ukuran Jendela**:
  - **Compact Popup**: Ideal untuk tanya jawab cepat.
  - **Expanded Mode (600–800px)**: Area percakapan lebih luas dengan panel dokumen.
  - **Fullscreen / Workspace Mode**: Tampilan layar penuh dengan konteks situs tetap terjaga.
- **Dukungan File & Multimodal**: Unggah dokumen (`.pdf`, `.docx`, `.txt`, `.csv`) dan gambar (`.png`, `.jpg`).
- **Grounded Enterprise Knowledge**: Mengambil informasi dari profil resmi CiptadraSoft dan Onebox CRM dengan sitasi terverifikasi.
- **Lead Capture Form**: Deteksi minat transaksi dan formulir penawaran harga terintegrasi.

---

## 🔑 Akun Demo Cepat (1-Click Login Accounts)

Anda dapat langsung mencoba semua peran menggunakan tombol 1-klik di halaman login atau menggunakan kredensial berikut:

| Peran | Nama Pengguna | Email | Password | Fokus Tugas Utama |
| :--- | :--- | :--- | :--- | :--- |
| **CS Agent A** | Andi Wijaya | `cs.a@ciptadra-demo.com` | `DemoCS123!` | Technical Support Specialist (Case A) |
| **CS Agent B** | Siti Rahmawati | `cs.b@ciptadra-demo.com` | `DemoCS123!` | Billing & Settlement Specialist (Case B) |
| **CS Supervisor** | Ferry Darmawan | `supervisor@ciptadra-demo.com` | `DemoSup123!` | Head of Contact Center & Operations QM |
| **Marketing Lead** | Maya Putri | `marketing@ciptadra-demo.com` | `DemoMkt123!` | Growth & Social Journey Lead |
| **Customer Portal** | Budi Santoso | `budi.santoso@megasolusi.co.id` | `DemoCustomer123!` | Enterprise Client (PT Mega Solusi) |

---

## 🚀 Panduan Instalasi & Menjalankan Lokal

### 1. Kebutuhan Sistem
- **Node.js** v18.18+ atau versi lebih baru
- **npm** atau **pnpm** / **yarn**

### 2. Instalasi Dependensi
```bash
git clone https://github.com/LuckyFadlan/ciptadrasoft-ai-cx-platform.git
cd ciptadrasoft-ai-cx-platform
npm install
```

### 3. Konfigurasi Lingkungan (.env.local)
Salin contoh berkas konfigurasi lingkungan:
```bash
cp .env.example .env.local
```
Sesuaikan penyedia AI yang diinginkan:
```env
# Gunakan Gemini (Rekomendasi)
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# Atau gunakan OpenAI
# AI_PROVIDER=openai
# OPENAI_API_KEY=your_openai_api_key_here
# OPENAI_MODEL=gpt-4o-mini
```
*Catatan Keamanan: Kunci API diproses secara privat di sisi server dan tidak pernah terekspos ke peramban klien. Jika kunci API tidak diisi, platform tetap beroperasi dalam mode simulasi cerdas.*

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Arsitektur Teknologi

- **Framework**: [Next.js 16.3.5](https://nextjs.org/) (App Router, Turbopack)
- **UI & Komponen**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Animasi & Interaktivitas**: [Framer Motion](https://www.framer.com/motion/)
- **Ikonografi**: [Lucide React](https://lucide.dev/)
- **Kecerdasan Buatan**: Google GenAI SDK (`@google/genai`) & OpenAI Node SDK (`openai`)

---

## 📄 Lisensi
Hak Cipta © 2026 PT Ciptadra Softindo. Dilindungi undang-undang.
Dibuat sebagai purwarupa solusi enterprise AI Customer Experience terpadu.
