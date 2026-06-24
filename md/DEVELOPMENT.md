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
- Playwright
- Storybook
- Chromatic
- CI/CD
- Husky

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
- Zod
    - formData validation
- Redis 
    - Caching
    - Session Storage 
    - Rate Limiting

(v2)
- Prasma, Drizzle / Monastery
- PostgreSQL / MongoDB
- API Authorization
- 

(v3)
- need GraphQL?

## Refactor

- use Skills via Claude Code 
    - /fixing-accessibility
    - /react-best-practice

## Test

see if the followings can pass
- frontend
    - `npm run test` * vitest
    - `npm run test:e2e` * playwrite
    - `npm run storybook` * if api/test work out on storybook browser
- backend
    - `npm run test` * vitest
