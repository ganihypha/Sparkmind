# SparkMind V3 — AI Strategic Guide Platform

## Project Overview
- **Name**: SparkMind V3
- **Goal**: Platform AI yang menganalisis tantangan pengguna dan memberikan action plan strategis yang terukur
- **Niche**: Personal development, strategic planning, & productivity untuk pasar Indonesia
- **Built by**: Haidar

## URLs
- **Production**: https://sparkmind-v2.pages.dev
- **Sandbox Preview**: https://3000-iko7hskxx56eejc7fbydx-8f57ffe2.sandbox.novita.ai
- **GitHub**: https://github.com/ganihypha/Sparkmind

## Fitur yang Sudah Dibangun

### Landing Page (`/`)
- Cinematic dark mode design dengan neon glow effects
- Animated floating orbs & glassmorphism
- Stats counter (10,000+ users, 50,000 strategi, 12+ categories)
- 9 fitur showcase cards dengan hover animations
- Pricing section (Gratis / Pro Rp79K / Enterprise)
- 3 Testimonial cards
- CTA section & footer lengkap
- Fully responsive (mobile-friendly)

### Dashboard App (`/app`) — Full Dark Mode
- **AI Sovereign Engine V3** — Chat interface, 12+ kategori: bisnis, karir, skill, keuangan, produktivitas, mental health, hubungan, pendidikan, kesehatan & fitness, content creator, leadership, default
- **SWOT Analyzer** — Generate SWOT analysis untuk bisnis/ide
- **AI Coach Mode (NEW V3)** — Personal coaching session: definisikan goal, identifikasi blocker, dapatkan action plan
- **Pomodoro Timer (NEW V3)** — Built-in 25/5/15 timer, session counter, total focus tracker, visual ring progress
- **Goal Tracker Pro** — Tambah, track progress, milestone, hapus goals — data persists di localStorage
- **Habit Tracker** — Daily habits, streak counter, toggle check-in — data persists di localStorage
- **Weekly Review (NEW V3)** — 3 Wins, 3 Learnings, Focus minggu depan — tersimpan di localStorage
- **Resource Library** — 15 framework strategis (upgraded dari 12)
- **Daily Insights** — 6 insight harian dipersonalisasi

### API Endpoints
| Method | Path | Deskripsi |
|--------|------|-----------|
| `POST` | `/api/analyze` | AI strategic analysis (12+ kategori) |
| `POST` | `/api/swot` | Generate SWOT analysis |
| `POST` | `/api/coach` | AI Coach — personal coaching session |
| `GET` | `/api/resources` | Resource library (15 items) |
| `GET` | `/api/insights` | Daily insights list |
| `GET` | `/api/quotes` | Random motivational quote |
| `GET` | `/api/health` | Health check (v3.0.0) |

## Upgrade V2 → V3

| Fitur | V2 | V3 |
|-------|----|----|
| AI Engine | 8+ kategori | **12+ kategori** (+ pendidikan, kesehatan, konten, leadership) |
| Design | Light mode | **Full Dark Mode** cinematic + neon glow |
| Pomodoro Timer | ❌ Tidak ada | ✅ **BARU** — 25/5/15 timer + session tracker |
| AI Coach Mode | ❌ Tidak ada | ✅ **BARU** — Personal coaching session |
| Weekly Review | ❌ Tidak ada | ✅ **BARU** — Refleksi & planning mingguan |
| Data Persistence | Hilang saat refresh | ✅ **localStorage** — data tersimpan |
| Resource Library | 12 item | **15 item** (+ Active Recall, Deep Work, Creator Economy) |
| Landing Page | Premium glassmorphism | **Cinematic** dark + neon + animated orbs |
| Quote Ticker | ❌ Tidak ada | ✅ Random quote di header dashboard |
| UI/UX | Good | **Premium** — dark glass, neon borders, smooth animations |

## Model Monetisasi
- **Starter (Gratis)**: 5 analysis/hari, 3 goals, Pomodoro Timer, resource library dasar
- **Pro (Rp 79K/bulan)**: Unlimited analysis, SWOT, AI Coach, unlimited goals & habits, Weekly Review, full library
- **Enterprise (Custom)**: Team collaboration, custom AI, API access

## Tech Stack
- **Backend**: Hono (TypeScript) on Cloudflare Workers
- **Frontend**: TailwindCSS (CDN), Vanilla JS, localStorage
- **Deployment**: Cloudflare Pages
- **VCS**: GitHub

## User Guide
1. Buka https://sparkmind-v2.pages.dev
2. Klik "Mulai Gratis" untuk masuk ke Dashboard
3. Gunakan **AI Analyzer** untuk analisis masalah (12+ kategori)
4. Gunakan **SWOT Analyzer** untuk analisis bisnis/ide
5. Gunakan **AI Coach** untuk personal coaching session
6. Gunakan **Pomodoro Timer** untuk deep work sessions
7. Track **Goals** dan **Habits** harian (data tersimpan otomatis)
8. Isi **Weekly Review** setiap akhir minggu
9. Baca **Resource Library** untuk 15 framework strategis

## Deployment
- **Platform**: Cloudflare Pages
- **Project Name**: sparkmind-v2
- **Status**: ✅ Active
- **Tech Stack**: Hono + TypeScript + TailwindCSS
- **Last Updated**: 2026-04-27
