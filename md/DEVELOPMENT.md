# Development

## Implemented

### Frontend

- React
- TypeScript
- Tailwind CSS
- Colour Theme
- Workspaces (Shared)
- MyAxios
- React Router Dom
    - Layout
- Error Boundary
- React Hook Form x Zod x Headless UI
    - * Headless UI is for only form elements ATM
- ThemeModeSwitcher
- Zustand(Redux)
    - see ToastMessage
    - use Zustand(Redux) for global states, and use Context API for states used per page
- Vitest
- todo: Playwright
- todo: Storybook
- todo: Chromatic
- todo: CI/CD

(v2)
- Login Page
- Authentication
- Session Management
    - how long keeps login
- React Query(SWR, RTK Query)
- withAuth 
    - High Order Component such as ProtectedDashboardPage
- RBAC

### Backend

- Node.js (Express)
- TypeScript
- Vitest
- Zod (formData validation)

(v2)
- Prasma, Drizzle / Monastery
- PostgreSQL / MongoDB
- API Authorization
- 

(v3)
- need GraphQL?

## Test

see if the followings can pass
- frontend
    - `npm run test` * vitest
    - `npm run test:e2e` * playwrite
    - `npm run storybook` * if api/test work out on storybook browser
- backend
    - `npm run test` * vitest

## Steps for Codebase Setup

### Frontend

1. `npm create vite@latest frontend -- --template react-ts`
2. `cd frontend && npm i`
3. Configure frontend files
    - make folders under src
        - components
        - hooks
        - pages
        - api
        - types
        - utils
        - assets (Vite default)
    - setup myAixos
        - make `src/api/myAxios.ts`
    - setup Tailwind CSS
        - `npm install tailwindcss @tailwindcss/vite`
        - add the Tailwind plugin to vite.config.ts
        - add `@import "tailwindcss";` to src/index.css
    - add `server.proxy` in frontend/vite.config.ts

### Backend

1. `cd ../ && mkdir backend && cd backend`
2. `npm init -y && npm i express && npm i -D typescript @types/node @types/express ts-node-dev`
3. `npx tsc --init`
4. Configure backend files
    - `src/index.ts`
    - `tsconfig.json`
    - package.json.scripts

### Colour Theme

- add the followings in index.css * @theme inline can consider light/dark mode
    - `@theme inline { --color-primary: var(--color-primary-val) }`
    - `:root { --color-primary-val: #ffffff; }`
    - `@media (prefers-color-scheme: dark) { :root { --color-primary-val: #16171d; } }`
- then use `bg-primary`, `text-primary`, etc

### Workspaces (Shared)

* so that frontend and backend can use same sources

- `"workspaces": ["frontend", "backend", "shared"]` in root package.json
- make files udner `shared/`
- run `npm install @app/shared --workspace=frontend @app/shared --workspace=backend`
- `import { Shared } from '@app/shared'` in frontend/backend file
- run `npm run build --workspace=shared` when some of Shared files updated
    - it builds `shared/dist/index.js` which is used in React app

### React Router Dom

- `npm install react-router-dom`
- add `BrowserRouter` in `frontend/src/main.tsx`
- define routes in App.tsx
- use `import { Link, useNavigate } from 'react-router-dom'`
- *Layout*
    - make `frontend/src/components/layout/Layout.tsx`
        - use Header, Footer, Sidebar
        - use `import { Outlet } from 'react-router-dom'`
    - use Layout in `frontend/src/App.tsx`

### Error Boundary

- make `frontend/src/components/ErrorBoundary.tsx`
- wrap components with ErrorBoundary in `frontend/src/App.tsx`

### React Hook Form x Zod x Headless UI

- React Hook Form x Zod
    - `npm install react-hook-form zod @hookform/resolvers`
- Headless UI
    - `npm install @headlessui/react`
- make `frontend/src/pages/Contact.tsx`
    - use zod on both frontend and backend for formData validation

### Zustand(Redux)

- `npm install zustand`
- make `frontend/src/store/useThemeStore.ts`

### Vitest

1. frontend 
    - `npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event msw@latest`
    - update vite.config.ts for vitest
    - make `src/test/setup.ts`
    - add test scripts in package.json
    - write test code for a component, such as `pages/First_test.tsx`
    - setup msw
        - `https://mswjs.io/docs/quick-start`
        - make src/test/server.ts for msw
        - update src/test/setup.ts

2. backend
    - `npm install -D vitest @vitest/ui supertest @types/supertest`
    - make `vitest.config.ts`
    - add test scripts in package.json
    - write test code for a component, such as `pages/First_test.tsx`

*MSW* - Mock API

### Playwright

- `npm init playwright@latest`
    - tests/example.spec.ts
    - .github/workflows/playwright.yml * optional
    - playwright.config.ts
- add scripts `"test:e2e": "playwright test", "test:e2e:ui": "playwright test --ui"` in frontend/package.json
- edit tests/home.spec.ts
- run `npm run test:e2e` or `npm run test:e2e:ui` if you want UI

*Claude Code x Playwright MCP = Auto Test*
https://www.youtube.com/watch?v=TDECUH62yYQ

1. start claude in the repository
    - `claude`
2. initialize a new CLAUDE.md file with codebase documentation
    - `/init`
3. add playwright mcp
    - `claude mcp add playwright npx @playwright/mcp@latest`
4. prompt for testing something
    - e.g. `use playwright and test on http://localhost:5173/ if a toast message is shown after clicking 'Test API' button`
5. claude shows test result with snapshot

### Storybook

1.  basic settings

- `npx storybook@latest init`
- delete `frontend/src/story/**`
- add `/// <reference types="vite/client" />` and `import '../src/index.css'` in `frontend/.storybook/preview.tsx`
- make `frontend/src/components/ui/Button.stories.tsx`
- run `npm run storybook` 
    * storybook is auto-generated in package.json script
- can see Storybook on `http://localhost:6006/`

2. setup MSW

- `npm i msw-storybook-addon -D`
- genrate msw service worker in public
    - `npx msw init public/` -> `frontend/public/mockServiceWorker.js`
- add msw configuration with `msw-storybook-addon` in `frontend/.storybook/preview.tsx`

3. TODO: Storybook x Vitest

- install React Testing Library
    - `npm install --save-dev @testing-library/react @testing-library/dom`

### Chromatic



### CI/CD