# Development

## Implemented

### Frontend

- React
- TypeScript
- Tailwind CSS
- Colour Theme
- Workspaces
- MyAxios
- React Router Dom
    - Layout
- Error Boundary
- React Hook Form x Zod x Headless UI
    - * Headless UI is for only form elements ATM
- todo: Redux || Zustand
- todo: React Query || SWR
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

### Workspaces

* so that frontend and backend can use same sources

- `"workspaces": ["frontend", "backend", "shared"]` in root package.json
- make `shared/package.json`
- make `shared/src/index.ts`
- run `npm install @app/shared --workspace=frontend @app/shared --workspace=backend`
- `import Shared from '@app/shared'` in frontend/backend file

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


### Playwright

### Storybook

### Chromatic


### Redux || Zustand



### CI/CD