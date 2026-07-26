# Sitio web de la boda de Liss y Fer

Monorepo production-ready para una SPA de boda y una API REST.

## Stack

- Web: React, TypeScript, Vite, Tailwind CSS, primitivas UI estilo shadcn, Framer Motion, React Router, TanStack Query, React Hook Form y Zod.
- API: NestJS, TypeScript, Prisma, PostgreSQL, autenticación admin con JWT y Swagger/OpenAPI en `/docs`.
- Operaciones: Docker, Docker Compose, TypeScript estricto, ESLint, Prettier, migraciones Prisma y datos seed.

## Inicio rápido

```bash
npm install
cp apps/api/.env.example apps/api/.env
docker compose up postgres -d
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev:api
npm run dev
```

La SPA corre en `http://localhost:5173`, la API en `http://localhost:4000` y Swagger está disponible en `http://localhost:4000/docs`.

Códigos RSVP de ejemplo:

- `GUMIRA-2026`
- `BARCELONA-2026`
- `OLIVA-2026`

Las credenciales admin de ejemplo están en `apps/api/.env.example`.

## Docker

```bash
docker compose up --build
```

La app web con Docker Compose se sirve en `http://localhost:3000`.
