# Frontend (Next.js)

Appointment dashboard built with Next.js 14 app router.

## Structure
- `app/` – route layouts + global styles.
- `components/` – reusable UI units (form, list, badges).
- `hooks/` – domain hooks like `useAppointments` for state/data fetching.
- `lib/` – API utilities and shared helpers.

## Setup
1. `npm install`
2. Copy `.env.local.example` → `.env.local` and set `NEXT_PUBLIC_API_BASE_URL`.
3. `npm run dev` to start on `http://localhost:3000`.

The dashboard lists appointments, refreshes data, and creates new ones via the backend API.
