# React + Vite + TypeScript + Tailwind + Node Monorepo

A full-stack TypeScript codebase wired up with a shared validation layer, component testing, E2E testing, visual regression, and CI/CD. Use it as a starting point for new projects.

## Tech Stack

| Area | Tech |
| --- | --- |
| Frontend | React 19, Vite, TypeScript, Tailwind CSS 4, React Router 7 |
| State | Zustand |
| Forms | React Hook Form + Zod (`@hookform/resolvers`) |
| UI primitives | Headless UI |
| HTTP | Axios (`src/api/myAxios.ts`) |
| Backend | Express 5, TypeScript (CommonJS) |
| Shared | `@app/shared` — types, Zod schemas, API constants, MSW handlers |
| Unit/component tests | Vitest, Testing Library, MSW, Storybook test runner |
| E2E | Playwright |
| Visual regression | Storybook + Chromatic |
| CI/CD | GitHub Actions → GitHub Pages |
| Git hooks | Husky |

## Repository Layout

```
.
├── frontend/   # Vite + React app (dev server :5173, proxies /api → :3001)
├── backend/    # Express API (:3001), routes colocated with tests under src/routes/<name>/
├── shared/     # @app/shared — built to shared/dist, imported by both frontend & backend
├── .github/workflows/   # ci, playwright, chromatic, deploy
└── .husky/     # pre-commit, post-commit, post-merge hooks
```

This is an **npm workspaces** monorepo (`frontend`, `backend`, `shared`).

### `shared/` — the single source of truth
`shared/src/index.ts` exports a `Shared` object with:
- `Shared.api` — URL constants, messages, and MSW handlers (`shared/src/api.ts`)
- `Shared.validation` — Zod schemas (`shared/src/validation.ts`)
- `Shared.pages` — page-level constants (`shared/src/pages/`)

> **Important:** `shared` is consumed from its **compiled output** (`shared/dist`), not its TypeScript source, so Node-based runners (Playwright, backend) can load it. Run `npm run share` after editing anything under `shared/src`. The git hooks below help enforce this.

## Getting Started

```bash
npm install          # installs all workspaces
npm run dev          # builds shared, then runs frontend + backend concurrently
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001 (frontend proxies `/api/*` to it)

## Common Commands

### Root
```bash
npm run share        # build @app/shared (run after editing shared/src)
npm run dev          # build shared + run frontend & backend together
```

### Frontend (`cd frontend` or `--workspace=frontend`)
```bash
npm run dev          # Vite dev server :5173
npm run build        # tsc -b + vite build
npm run lint         # eslint
npm run test         # vitest watch (incl. Storybook browser tests)
npm run test:run     # vitest single run
npm run test:e2e     # Playwright (auto-starts frontend + backend)
npm run storybook    # Storybook dev server :6006
npm run build-storybook
```

### Backend (`cd backend` or `--workspace=backend`)
```bash
npm run dev          # ts-node-dev hot reload :3001
npm run build        # tsc → dist/
npm run start        # run compiled dist/index.js
npm run test:run     # vitest single run
```

## Architecture Notes

### Frontend routing & layouts (`src/App.tsx`)
Routes are two arrays:
- `globalLinks` → rendered in `Layout` (Header + Sidebar + Footer)
- `staticLinks` → rendered in `Layout2` (minimal layout, e.g. Privacy Policy)

### Theming
`data-theme="dark|light"` on `<html>`; CSS custom properties in `src/index.css` map light/dark values to Tailwind utilities (`bg-primary`, `text-text`, …). `ThemeModeSwitcher` toggles it.

### State (Zustand)
Global state lives in `src/store/` (e.g. `useToastStore.ts`). Prefer slice selectors (`useToastStore(s => s.toasts)`) over selecting the whole store to avoid re-renders.

### Forms
React Hook Form + `zodResolver` using schemas from `@app/shared`. The backend validates the **same** schema via `Shared.validation.*.safeParse()`. See `frontend/src/pages/Contact.tsx` + `backend/src/routes/contact/contact.ts`.

### Backend
`src/index.ts` starts the server; `src/app.ts` configures Express and mounts the `/api` router. Routes live in `src/routes/<name>/` next to their tests.

## Testing

- **Component/unit (jsdom)** — Vitest + Testing Library + MSW. MSW handlers come from `Shared.api.handlers`; node server set up in `frontend/src/test/`.
- **Storybook tests** — stories with `play` functions run in real Chromium via `@storybook/addon-vitest`. Both run under `npm run test`.
- **Backend** — Vitest + Supertest against the `app` export.
- **E2E** — Playwright in `frontend/tests/`; config auto-starts both dev servers.

## CI/CD (GitHub Actions)

| Workflow | Trigger | Does |
| --- | --- | --- |
| `ci.yml` | PR | lint, typecheck/build, frontend + backend tests |
| `playwright.yml` | push/PR | E2E |
| `chromatic.yml` | push/PR | visual regression (needs `CHROMATIC_PROJECT_TOKEN` secret) |
| `deploy.yml` | push to `main` | build frontend, deploy to GitHub Pages |

Every job runs `npm ci` then `npm run share` before building/testing.

**One-time GitHub settings:** Settings → Pages → Source = **GitHub Actions**; add repo secret `CHROMATIC_PROJECT_TOKEN`.

Deployed site: `https://taka-247.github.io/codebase-vite-react-typescript-tailwindcss-nodejs/`
(Pages is frontend-only — there's no backend at `/api` in production, so the "Test API" demo button won't return data there.)

## Git Hooks (Husky)

- **pre-commit** / **post-commit** — keep `shared/dist` in sync with `shared/src`; if you commit a `shared/src` change without rebuilding, a follow-up commit captures the fresh `dist`.
- **post-merge** — rebuilds `shared` after a pull that touched `shared/src`.

Bypass with `git commit --no-verify` if needed; CI is the real backstop.
