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

## Environment Variables
- `PORT` (default `4000`)
- `DATABASE_URL` (or `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`)

## API
- `GET /api/appointments?skip=0&limit=10`
  - Lists appointments ordered by `scheduled_at` ascending.
- `POST /api/appointments`
  - Body: `{ patient_name, doctor, scheduled_at, status?, notes? }`
  - Validations: required fields + `scheduled_at` must be future date.
  - Returns created appointment with 201 status.
