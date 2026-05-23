# CliniqFlow — Clinic Booking SaaS

A full-stack SaaS application for clinic appointment management. Built as a portfolio project by [msakithub.com](https://msakithub.com).

## Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + recharts + framer-motion
- **Backend:** Express.js + TypeScript + JWT + bcryptjs (in-memory data, no database needed)

## Quick Start

### Backend
```bash
cd backend
npm install
cp ../.env.example .env
npm run dev       # runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev       # runs on http://localhost:5173
```

## Demo Accounts

| Role    | Email                  | Password    |
|---------|------------------------|-------------|
| Admin   | admin@clinic.com       | admin123    |
| Patient | patient@clinic.com     | patient123  |
| Doctor  | ayesha@clinic.com      | doctor123   |

## Key Screens

1. **Landing Page** — `/` — SaaS marketing page
2. **Login / Register** — `/login` — Auth with demo quick-access
3. **Admin Dashboard** — `/dashboard` — Stats, charts, appointment table
4. **Patient Portal** — `/portal` — View & manage appointments
5. **Doctor Schedule** — `/schedule` — Calendar day-view for doctors
6. **Book Appointment** — `/book` — Doctor selector + 3-step booking flow

## API Endpoints

| Method | Endpoint                  | Auth    | Description                    |
|--------|---------------------------|---------|--------------------------------|
| POST   | /api/auth/login           | Public  | Login and get JWT              |
| POST   | /api/auth/register        | Public  | Register new user              |
| GET    | /api/auth/me              | Bearer  | Get current user               |
| GET    | /api/doctors              | Public  | List all doctors               |
| GET    | /api/appointments         | Bearer  | List appointments (role-scoped)|
| POST   | /api/appointments         | Bearer  | Book new appointment           |
| PUT    | /api/appointments/:id     | Bearer  | Update appointment             |
| DELETE | /api/appointments/:id     | Admin   | Delete appointment             |
| GET    | /api/dashboard/stats      | Admin   | Dashboard stats & chart data   |
| GET    | /api/patients             | Admin   | List all patients              |

---
Built by Abdullah Khan · [msakithub.com](https://msakithub.com)
