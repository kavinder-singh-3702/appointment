# Frontend (Next.js)

Appointment dashboard built with Next.js 14 app router. Main UX lives under `/appointments`.

## Structure
- `app/` – route layouts + global styles (`/appointments` is the primary page).
- `components/` – reusable UI units (form, list, badges).
- `hooks/` – domain hooks like `useAppointments` for state/data fetching.
- `lib/` – API utilities and shared helpers.

## Setup
1. `npm install`
2. Copy `.env.local.example` → `.env.local` and set `NEXT_PUBLIC_API_BASE_URL`.
3. `npm run dev` to start on `http://localhost:3000`.
4. Visit `http://localhost:3000/appointments` to use the UI (root path redirects there).

The `/appointments` page shows a responsive table plus a filter panel (patient search, doctor/status selects, date window). Doctor values are fetched from `/api/doctors`. Creating appointments happens through a modal with client-side validation for required fields and future datetime; success/error states surface inline and above the table.
