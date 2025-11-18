# Appointment Management Module

Small hospital appointment workflow built with an Express/Postgres backend and a Next.js frontend.

## Backend (`backend/server`)
- `npm install`
- Copy `.env.example` to `.env` and adjust the Postgres connection string/vars.
- Apply the schema in `backend/server/schema.sql`.
- `npm run dev` starts the Express server on `http://localhost:4000`.

### API
- `GET /api/appointments?skip=0&limit=10` → list appointments sorted by `scheduled_at`.
- `POST /api/appointments` → create a new appointment. Validates required fields and future date.

## Frontend (`frontend`)
- `npm install`
- Copy `.env.local.example` to `.env.local` and update `NEXT_PUBLIC_API_BASE_URL`.
- `npm run dev` starts the Next.js client on `http://localhost:3000` (primary UI under `/appointments`).
- Components, hooks, and API helpers live under `frontend/components`, `frontend/hooks`, and `frontend/lib` for scalability.

## Development Notes
- The backend uses a modular structure (routes, controllers, services) with centralized validation and error handling.
- The frontend splits responsibilities across reusable components and hooks for maintainability.
- Database access is handled via the official `pg` client, and the SQL schema needed to provision Postgres is included at `backend/server/schema.sql`.
