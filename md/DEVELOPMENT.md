# Development

## Implemented

### Frontend

- React
- TypeScript
- Tailwind CSS
- Vitest
- todo: Playwright
- todo: React Router Dom
- todo: Storybook
- todo: Chromatic
- todo: Redux || Zustand
- todo: CI/CD
- todo: React Hook Form
- todo: Zod

### Backend

- Node.js (Express)
- TypeScript
- Vitest
- 

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


### Workspaces

* so that frontend and backend can use same sources

- `"workspaces": ["frontend", "backend", "shared"]` in root package.json
- make `shared/package.json`
- make `shared/src/index.ts`
- run `npm install @app/shared --workspace=frontend @app/shared --workspace=backend`
- `import Shared from '@app/shared'` in frontend/backend file

### Setup Vitest

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
