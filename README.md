# Clara & Mateo Wedding Website

Production-ready wedding SPA and REST API monorepo.

## Stack

- Web: React, TypeScript, Vite, Tailwind CSS, shadcn-style UI primitives, Framer Motion, React Router, TanStack Query, React Hook Form, Zod, PWA metadata.
- API: NestJS, TypeScript, Prisma, PostgreSQL, JWT admin auth, Swagger/OpenAPI at `/docs`.
- Ops: Docker, Docker Compose, strict TypeScript, ESLint, Prettier, Prisma migrations and seed data.

## Quick Start

```bash
npm install
cp .env.example .env
docker compose up postgres -d
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev:api
npm run dev
```

The SPA runs on `http://localhost:5173`, the API runs on `http://localhost:4000`, and Swagger is available at `http://localhost:4000/docs`.

Sample RSVP codes:

- `OLIVE-2027`
- `ROSE-2027`
- `BURGUNDY-2027`

Sample admin credentials are in `.env.example`.

## Docker

```bash
docker compose up --build
```

The composed web app is served at `http://localhost:3000`.
