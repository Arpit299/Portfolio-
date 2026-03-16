# Arpit Kumawat AI Portfolio

Premium, production-ready AI portfolio built with Next.js, TypeScript, and Tailwind CSS. The project showcases AI consulting expertise, includes a secure contact workflow, and provides an admin dashboard for message monitoring.

## Features

- Modern responsive portfolio UI with smooth Framer Motion animations
- Sections for About, Skills, Experience, Projects, and Contact
- Contact form with Zod validation, sanitization, and rate limiting
- Admin authentication with JWT-based protection
- Admin API endpoints for contacts and dashboard stats
- PostgreSQL-ready setup for storing contact submissions
- Security headers via proxy middleware

## Technology Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS 3
- Animation: Framer Motion
- Validation: Zod
- Authentication: jsonwebtoken + bcryptjs
- Database: PostgreSQL (`pg`)

## Installation

Prerequisites:

- Node.js 18+
- npm
- PostgreSQL 12+

Install dependencies:

```bash
npm install
```

## Environment Setup

Create a local environment file from the template:

```bash
cp .env.example .env.local
```

Required variables are documented in `.env.example`:

- `NEXT_PUBLIC_API_URL`
- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `NEXT_PUBLIC_GITHUB_URL`
- `NEXT_PUBLIC_LINKEDIN_URL`

## Run the Project

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Default dev URLs (when running with current script settings):

- Localhost: `http://localhost:3000`
- LAN: `http://<your-local-ip>:3000`

## Example Usage

- Open the landing page and navigate through sections.
- Submit the Contact form to test input validation and API handling.
- Use Admin login route (`/admin/login`) to access protected dashboard routes.

## Folder Structure

```text
project-root/
├── public/
├── scripts/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── api/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── utils/
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
└── README.md
```

## Contribution Guide

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-change`.
3. Make focused, tested changes.
4. Run checks before commit:
   `npm run build`
5. Commit with clear messages.
6. Open a pull request describing scope, screenshots, and testing notes.

## Security Notes

- Never commit `.env` or `.env.local` files.
- Keep `JWT_SECRET` and database credentials private.
- Use strong password hashes for `ADMIN_PASSWORD_HASH`.

## License

MIT
