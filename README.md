# SparkMind V6.0 BULLETPROOF — AI Strategic Guide untuk Hidup Berdaulat

## Project Overview
- **Name**: SparkMind V6.0 BULLETPROOF
- **Tagline**: AI Strategic Guide untuk Hidup Berdaulat
- **Goal**: Platform AI strategic guide yang **hardened, reliable, MVP revenue-ready, dan powerful** — fix semua root cause V5.0 + tambah PWA, error boundary, pricing page.
- **Target**: Generate revenue, scale ke ribuan user, foundation untuk Pro/Team tier.

## URLs
- **🌐 Production**: https://sparkmind-v2.pages.dev
- **🚀 Latest Deploy**: https://c9691274.sparkmind-v2.pages.dev
- **💰 Pricing Page**: https://sparkmind-v2.pages.dev/pricing
- **📦 GitHub**: https://github.com/ganihypha/Sparkmind
- **🧪 Sandbox Preview**: https://3000-i6j99k5wr3qxtgijnefse-ad490db5.sandbox.novita.ai

## What's New in V6.0 BULLETPROOF (vs V5.0 SOVEREIGN)

### Root Causes Fixed (12 hardening upgrades)
| # | Issue (V5.0) | Fix (V6.0) | Severity |
|---|---|---|---|
| 1 | `innerHTML` 50+ kali → XSS risk + memory leak | ✅ `escapeHtml()` di semua user input | 🔴 Critical |
| 2 | Tidak bisa install di home screen | ✅ PWA manifest + service worker | 🔴 High |
| 3 | 1 bug crash semua app | ✅ Global error boundary + try-catch render | 🔴 High |
| 4 | Pomodoro `setInterval` ngaco saat tab hidden | ✅ Persistent end-time + resume akurat | 🟡 Medium |
| 5 | localStorage > 5MB crash diam-diam | ✅ Storage quota guard + warning UI | 🟡 Medium |
| 6 | Tidak ada Quick Add global | ✅ ⌘N modal (goal/habit/journal) | 🟡 Medium |
| 7 | Tidak ada Pricing page | ✅ /pricing dengan 3 tier (Free/Pro/Team) | 🔴 High |
| 8 | SEO lemah | ✅ OG tags + Twitter cards + JSON-LD | 🟡 Medium |
| 9 | AI response tidak bisa di-copy/share | ✅ Copy/Share/Save-to-Journal buttons | 🟢 Low |
| 10 | Habit hanya streak counter | ✅ Heatmap 30 hari ala GitHub | 🟢 Low |
| 11 | Tidak ada density/motion options | ✅ Compact density + reduced-motion respect | 🟢 Low |
| 12 | Tidak ada offline mode | ✅ Service worker cache shell (network-first API, cache-first static) | 🔴 High |

### MVP Revenue-Ready Features
- **💰 /pricing page** — 3 tier (Free/Pro Rp 49rb/Team Rp 149rb/user)
- **📲 PWA installable** — install ke home screen iOS/Android
- **🔍 SEO optimized** — JSON-LD WebApplication schema, OG tags lengkap
- **📧 Lead capture** — `mailto:` waitlist untuk Pro & Team
- **♿ Accessibility** — `prefers-reduced-motion` respect, focus-visible outline, ARIA labels

## Functional URIs

### Pages
- `GET /` — Landing page V6.0 BULLETPROOF dengan SEO + OG tags
- `GET /app` — Dashboard app dengan 12 tab (sidebar + main)
- `GET /pricing` — Pricing page (3 tier)
- `GET /manifest.webmanifest` — PWA manifest
- `GET /sw.js` — Service worker untuk offline cache
- `GET /*` (404) — Fallback page dengan link kembali

### API Endpoints (semua dengan input validation)
- `POST /api/analyze` — AI strategic analysis
  - Body: `{ message: string, mode?: string, history?: array }`
  - Validations: message required & non-empty, max 2000 chars, history capped 6
  - Returns: `{ response, timestamp, mode, tokens }`
- `POST /api/swot` — SWOT analyzer
  - Body: `{ business: string }` (max 200 chars)
- `POST /api/coach` — AI Coach
  - Body: `{ goal: string, currentState?: string, obstacles?: string }` (semua max 300)
- `GET /api/resources` — Get 21+ frameworks
- `GET /api/insights` — Daily insights
- `GET /api/quotes` — Random motivational quote
- `GET /api/health` — Health check + V6 metadata + features list

### Error Handling
- Semua API endpoint wrapped in try-catch → return JSON `{error}` dengan status code 400/500
- Frontend toast notification on every fetch failure
- Global `window.onerror` + `unhandledrejection` listeners

## Complete Feature List

### 12 Tabs di Dashboard
1. **📊 Dashboard** — Stats animated counters, weekly trend chart 7-day, quick actions, focus today
2. **🧠 AI Analyzer** — Chat dengan 18+ kategori, memory persist, copy/share/save-to-journal per response
3. **🧭 AI Coach V6** — Personal coaching (goal + state + obstacles → 90-day roadmap)
4. **📊 SWOT** — Generate SWOT instan dengan strategic move
5. **🍅 Pomodoro V2** — Persistent end-time (resume saat pindah tab), audio + vibration alert, auto-start option
6. **📓 Journal** — 6 mood selector + edit/delete + capped 200 entries
7. **🎯 Goals** — +10/-10/Done, progress bar, custom delete modal
8. **🔥 Habits + Heatmap** — Streak counter + 30-day heatmap visualization
9. **🎨 Vision Board** — Big vision/1Y/3M/1W
10. **📋 Weekly Review** — Wins/learnings/focus
11. **📚 Resources** — 21+ frameworks, debounced search 300ms
12. **⚙️ Settings** — Backup/Restore JSON, density toggle, theme, danger zone reset

### 18+ AI Categories
Bisnis · Karir · Tech & Skill · Finansial · Produktivitas · Mental Health · Relationship · Pendidikan · Health · Creative/Content · Leadership · Life Purpose/Ikigai · Networking · Parenting · Time Freedom · **Spiritual & Faith** · **Side Hustle** · Universal Default

### Keyboard Shortcuts
- `⌘K` / `Ctrl+K` — Command palette / Quick search
- `⌘N` / `Ctrl+N` — Quick Add modal (goal/habit/journal)
- `⌘1-9` / `Ctrl+1-9` — Switch ke tab 1-9
- `⌘D` — Toggle dark/light mode
- `⌘/` — Show shortcuts help modal
- `Esc` — Close modal / sidebar mobile

### Hardening & Security
- ✅ **XSS-safe rendering** — `escapeHtml()` pada user input (judul goal, habit, journal text, search term)
- ✅ **Server-side validation** — type check, length cap, required fields
- ✅ **Storage quota guard** — `navigator.storage.estimate()` + warning saat > 85%
- ✅ **Memory caps** — chat 50 msg, journal 200 entries
- ✅ **Error boundary** — try-catch di renderActive(), recovery UI dengan reload button
- ✅ **Service worker** — cache shell, offline-first untuk static, network-first untuk API
- ✅ **Reduced motion** — `prefers-reduced-motion` respected di semua animasi

## Data Architecture

### Storage Service
- **Browser localStorage** — Semua data tersimpan lokal & persistent
- **Cloudflare Pages** — Edge-deployed Hono backend (zero database = zero infra cost)

### Data Models (LocalStorage Keys, V6 namespaced)
| Key | Type | Description |
|-----|------|-------------|
| `sm_goals_v6` | Array | Goals: `{id, title, progress}` |
| `sm_habits_v6` | Array | Habits: `{id, title, streak, lastCheck, history[]}` |
| `sm_journal_v6` | Array | Journal: `{id, text, mood, date}` (capped 200) |
| `sm_chat_v6` | Array | Chat history: `{role, content}` (capped 50) |
| `sm_vision_v6` | Object | Vision: `{big, y1, m3, w1}` |
| `sm_review_v6` | Object | Review: `{wins, learnings, focus}` |
| `sm_pomo_v6` | Object | Pomodoro stats: `{sessions, totalMin, lastDay}` |
| `sm_pomo_state_v6` | Object | Active pomo: `{mode, running, endAt, total, auto}` |
| `sm_activity_v6` | Object | Activity log per tanggal (untuk trend chart) |
| `sm_streak_v6` | Number | Current streak |
| `sm_theme_v6` | String | Theme preference (dark/light) |
| `sm_density_v6` | String | UI density (normal/compact) |
| `sm_tour_v6` | Boolean | Tour completed flag |
| `sm_last_active_v6` | String | Last activity date for streak calc |

### Backup Format (JSON)
```json
{
  "version": "6.0",
  "exported": "2026-04-28T...",
  "goals": [...], "habits": [...], "journal": [...],
  "vision": {...}, "review": {...}, "chat": [...],
  "pomo": {...}, "activity": {...}
}
```

## User Guide

### Getting Started (5 menit)
1. Buka **https://sparkmind-v2.pages.dev/app** — onboarding tour otomatis muncul
2. Klik **🧠 AI Analyzer** → tanya apa saja (mis. "cara mulai side hustle freelance")
3. Klik **🎯 Goals** → tambah goal pertama → klik +10 saat ada progress
4. Klik **🔥 Habits** → tambah habit harian → klik Check tiap hari
5. Klik **🍅 Pomodoro** → Start untuk fokus 25 menit
6. Klik **⚙️ Settings** → Export JSON untuk backup pertama

### Power User Tips
- `⌘K` di mana saja → cari/navigate cepat
- `⌘N` → Quick Add tanpa pindah tab
- Save AI response ke Journal langsung dari chat (button bawah response)
- Install ke home screen (Chrome/Safari → Add to Home Screen) untuk jadi PWA
- Backup JSON setiap minggu untuk safety

### Pricing Tiers
| Tier | Harga | Untuk |
|------|-------|-------|
| **Sovereign (Free)** | Gratis selamanya | Personal use, 18+ AI cats, semua tools |
| **Pro** | Rp 49rb/bln | Real LLM (GPT/Claude), cloud sync, reminder push |
| **Team** | Rp 149rb/user/bln | Workspace, SSO, audit log, dedicated CSM |

## Not Yet Implemented (Roadmap V7)
- Real LLM integration (OpenAI/Anthropic) — currently rule-based engine
- Cloud sync via Cloudflare D1 — currently localStorage only
- Multi-user team workspace + RBAC
- Voice input untuk AI Analyzer
- Push notifications (Pomodoro reminders, habit nudges)
- Stripe checkout integration untuk Pro tier
- Export PDF report mingguan/bulanan
- iOS/Android native wrapper (Capacitor)

## Recommended Next Steps
1. **Wire OpenAI API** untuk Pro tier (env var `OPENAI_API_KEY`, gating per response.tokens)
2. **Stripe Payment Link** untuk Pro tier — bisa pakai Cloudflare Worker proxy + KV untuk subscription state
3. **Cloudflare D1** untuk cloud sync (sync localStorage → D1 setelah login)
4. **Push notifications** via Web Push API + Cloudflare Workers cron
5. **Lighthouse audit** — push score ke 100/100/100/100
6. **Analytics**: Cloudflare Web Analytics (privacy-friendly)
7. **Email capture form** di pricing page (Resend/Mailgun integration)

## Deployment
- **Platform**: Cloudflare Pages (edge runtime)
- **Project Name**: `sparkmind-v2`
- **Status**: ✅ Active & Live
- **Tech Stack**: Hono 4 + TypeScript + TailwindCSS (CDN) + Cloudflare Workers
- **Bundle Size**: 139.93 kB (compiled worker — single file)
- **Cold Start**: < 50ms (edge runtime)
- **Last Updated**: 2026-04-28
- **Version**: 6.0.0 BULLETPROOF

### Deploy Commands
```bash
npm run build                                            # Build dist/_worker.js
npx wrangler pages deploy dist --project-name sparkmind-v2 --branch main
```

## Tech Highlights
- **Zero database** — pure edge runtime + browser localStorage = $0/month infra
- **Zero npm dependencies di frontend** — semua via CDN (Tailwind, FontAwesome)
- **Single file backend** — 1 `src/index.tsx` file, 1700+ baris, mudah dibaca dan maintain
- **PWA-ready** — manifest + service worker + offline support
- **Privacy-first** — semua data tersimpan di browser user, server tidak menyimpan apa-apa
