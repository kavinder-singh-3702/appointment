# Appointment Management Module

Small hospital appointment workflow built with an Express/Postgres backend.

## Backend (`backend/server`)
- `npm install`
- Copy `.env.example` to `.env` and adjust the Postgres connection string/vars.
- Apply the schema in `backend/server/schema.sql`.
- `npm run dev` starts the Express server on `http://localhost:4000`.

### API
- `GET /api/appointments?skip=0&limit=10` → list appointments sorted by `scheduled_at`.
- `POST /api/appointments` → create a new appointment. Validates required fields and future date.

## Development Notes
- The backend uses a modular structure (routes, controllers, services) with centralized validation and error handling.
- Database access is handled via the official `pg` client.
- The SQL schema needed to provision Postgres is included at `backend/server/schema.sql`.
