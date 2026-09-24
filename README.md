# Nocta

**One meaningful action, every night.**

Nocta is a calm nightly priority-decision app for developers. After work, it scores what matters, picks a single next step, and protects rest when you need it — without turning life into another dashboard.

This repo holds the Nocta web app (and supporting API as the product grows).

## What it does (v1)

- **Deterministic scoring** — priority from deadlines and neglect, not a model guessing
- **One action, not a list** — each night ends with a single next step
- **Weekly reflection** — short pattern check, not a metrics circus
- **Recovery nights** — rest is a valid, protected choice
- **Neglected-area tracking** — quiet categories surface when ignored too long

## Stack

| Layer | Tech |
|--------|------|
| App | Next.js 16 (App Router), React 19, TypeScript |
| UI | Tailwind CSS 4, Shadcn / Base UI, Motion, Lenis |
| State | TanStack Query (server), Zustand (ephemeral UI only) |
| Auth | Clerk (planned) |
| Backend | Express, Zod, Prisma, PostgreSQL (Supabase) |

## Structure

```
nocta/   (this repo)
├── frontend/   # Next.js app — landing, auth surface, product UI
├── backend/    # Express API + Prisma
└── graphify-out/  # Optional local code knowledge graph
```

## Getting started

### Prerequisites

- Node.js 20+
- PostgreSQL / Supabase (when using the API)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend

```bash
cd backend
npm install
```

Add `backend/.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?schema=public"
```

Then:

```bash
npx prisma migrate dev
npm run dev
```

API defaults to port **3001**.

## Scripts

**Frontend**

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

**Backend**

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (nodemon + tsx) |
| `npm run build` | Compile TypeScript |
| `npm run start` | Run compiled server |

## Product notes

- Landing copy lives in `frontend/app/login/content.ts`
- Theme can follow local evening hours, with a manual override
- Real auth / session is deferred; the start CTA is UI-ready but not wired yet
- Keep `.env` and secrets out of git

## License

Private / unpublished unless otherwise specified.
