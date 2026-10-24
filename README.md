# 🎓 opentutor-ui

Beautiful web UI for [opentutor](https://github.com/quantumnic/opentutor) — the free offline AI personal tutor.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

## ✨ Features

- **📊 Dashboard** — Streak counter, daily plan, subject overview, recent activity
- **📚 Subject Browser** — 13 subjects with icons, progress bars, and topic counts
- **📖 Learning Sessions** — Card-based lessons with smooth slide animations
- **❓ Quiz Mode** — Multiple choice, true/false, fill-in-the-blank with instant feedback
- **🔄 Spaced Repetition** — Flip cards with Again/Hard/Good/Easy ratings
- **📈 Progress Stats** — GitHub-style heatmap, progress rings, subject breakdown
- **🔍 Explain View** — Article-style topic explanations with related topics
- **🌙 Dark Theme** — Purple/cyan palette designed for focus

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/quantumnic/opentutor-ui
cd opentutor-ui

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **sql.js** (WASM SQLite) for DB access
- **TypeScript** throughout

## 🗄️ Database

The app reads opentutor's SQLite database directly:

1. **Primary path:** `~/.local/share/opentutor/opentutor.db`
2. **Fallback:** `./opentutor.db` (project root)
3. **No DB?** Demo data is shown automatically

No backend server needed — the Next.js API routes query SQLite directly.

> **Status:** the SQLite read path is experimental and does not yet match opentutor's current schema, so the UI currently shows the built-in demo data.

## 📁 Structure

```
src/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── subjects/             # Subject browser
│   ├── learn/[subject]/      # Learning session
│   ├── quiz/[topic]/         # Quiz mode
│   ├── review/               # Spaced repetition
│   ├── progress/             # Stats & heatmap
│   ├── explain/[concept]/    # Topic explanation
│   └── api/                  # REST API routes
├── components/               # Reusable UI components
└── lib/
    ├── db.ts                 # SQLite + fallback logic
    └── types.ts              # TypeScript types + demo data
```

## 🎨 Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Deep dark | `#0A0A0F` |
| Card | Dark card | `#12121A` |
| Accent | Purple | `#7C3AED` |
| Knowledge | Cyan | `#06B6D4` |
| Success | Green | `#10B981` |
| Warning | Amber | `#F59E0B` |

## 📜 License

MIT — part of the [opentutor](https://github.com/quantumnic/opentutor) project.
