# Backend

1. `cd ../ && mkdir backend && cd backend`
2. `npm init -y && npm i express && npm i -D typescript @types/node @types/express ts-node-dev`
3. `npx tsc --init`
4. Configure backend files
    - `src/index.ts`
    - `tsconfig.json`
    - package.json.scripts

## PostgreSQL

### Schema Control

- make `supabase/migrations/20260628000000_create_profiles.sql`
    - SQL creates profile table triggered by the confirmation (by 1)
    - RLS (Row Level Security)
        - a Postgres feature controling which rows a given user can read or write. Without RLS, anyone could query whole table from the browser. With RLS, the database checks a policy for every row before returning/modifying it
- run `npm run migrateInitial` to apply supabase/migrations/** to Supabase database
    - run `npm run migrateUpdate` to update the existing schema

## API

- users/get 
    - get user profile and return it back to frontend