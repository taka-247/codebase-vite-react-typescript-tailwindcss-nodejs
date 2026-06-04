# Development

## Steps for Codebase Setup

1. `npm create vite@latest frontend -- --template react-ts`
2. `cd frontend && npm i`

3. `cd ../ && mkdir backend && cd backend`
4. `npm init -y && npm i express && npm i -D typescript @types/node @types/express ts-node-dev`
5. `npx tsc --init`
6. Configure backend files
    - `src/index.ts`
    - `tsconfig.json`
    - package.json.scripts

7. add `server.proxy` in frontend/vite.config.ts

8. Configure frontend files
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
