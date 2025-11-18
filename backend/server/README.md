# Backend Server

Express + Postgres API for managing hospital appointments.

## Prerequisites
- Node.js 18+
- Postgres instance

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and adjust Postgres connection info.
3. Run the SQL file: `psql < schema.sql`.
4. Start locally with `npm run dev` (or `npm start`).

### Docker
1. `docker build -t appointment-backend backend/server`
2. Provide environment variables (e.g. `DATABASE_URL`) when running:
   ```
   docker run --env DATABASE_URL=postgres://... -p 4000:4000 appointment-backend
   ```
3. Or, from the `backend` directory, run `docker compose up -d` to start both Postgres and the API using `backend/docker-compose.yml`.

## Environment Variables
- `PORT` (default `4000`)
- `DATABASE_URL` (or `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`)

## API
- `GET /api/appointments?skip=0&limit=10&search=&doctor=&status=&start=&end=`
  - Lists appointments ordered by `scheduled_at` ascending.
  - Optional filters:
    - `search` (patient name contains, case-insensitive)
    - `doctor` (case-insensitive exact match)
    - `status` (`scheduled`, `checked_in`, `completed`, `cancelled`)
    - `start` / `end` (ISO strings bounding `scheduled_at`)
- `POST /api/appointments`
  - Body: `{ "patient_name": "...", "doctor": "...", "scheduled_at": "YYYY-MM-DDTHH:MM:SSZ", "notes": "..." }`
  - Validations: required fields + `scheduled_at` must be future date.
  - `status` defaults to `scheduled` on insert.
  - Returns created appointment with 201 status.
- `GET /api/doctors`
  - Returns unique doctor names sorted ascending for populating dropdowns.
