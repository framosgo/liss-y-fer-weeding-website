FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
RUN npm ci --workspace @wedding/api

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/package-lock.json ./
COPY --from=deps /app/apps/api/package.json ./apps/api/package.json
COPY tsconfig.base.json ./tsconfig.base.json
COPY apps/api ./apps/api
RUN npm run prisma:generate --workspace @wedding/api
RUN npm run build --workspace @wedding/api

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/apps/api/package.json ./apps/api/package.json
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY --from=build /app/apps/api/prisma ./apps/api/prisma
WORKDIR /app/apps/api
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
