FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
RUN npm ci --workspace @wedding/web --include-workspace-root

FROM node:22-alpine AS build
WORKDIR /app
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/package-lock.json ./
COPY --from=deps /app/apps/web/package.json ./apps/web/package.json
COPY tsconfig.base.json ./tsconfig.base.json
COPY apps/web ./apps/web
RUN npm run build --workspace @wedding/web

FROM nginx:1.27-alpine AS runner
# Fixed port so Railway "Target port" can be set to 8080 reliably
ENV PORT=8080
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
