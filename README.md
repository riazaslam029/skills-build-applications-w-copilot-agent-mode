# Octofit Tracker

This repository now contains a simple TypeScript multi-tier app:

- Frontend: React + Vite UI for creating and listing items
- Backend API: Express endpoints for creating and listing items
- Data store: in-memory storage for now

## Project Structure

```text
octofit-tracker/
├── backend/
│   ├── src/
│   │   ├── routes/items.ts
│   │   ├── server.ts
│   │   ├── store/
│   │   └── types.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
	├── src/
	│   ├── App.tsx
	│   ├── index.css
	│   ├── main.tsx
	│   ├── services/itemsApi.ts
	│   └── vite-env.d.ts
	├── index.html
	├── package.json
	├── tsconfig.json
	└── vite.config.ts
```

## Requirements

- Node.js 20 or later
- npm

## Install

Run these from the repository root:

```bash
npm --prefix octofit-tracker/backend install
npm --prefix octofit-tracker/frontend install
```

## Run

Open two terminals and start both services:

```bash
npm --prefix octofit-tracker/backend run dev
```

```bash
npm --prefix octofit-tracker/frontend run dev
```

Or start both from the repository root with one command:

```bash
npm run dev
```

Then open the frontend at `http://localhost:5173`.

The backend runs at `http://localhost:8000` and exposes:

- `GET /health`
- `GET /api/items`
- `POST /api/items`

## Behavior

Items are stored in memory, so they reset when the backend restarts.

