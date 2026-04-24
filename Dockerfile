# ── Stap 1: dependencies ─────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# ── Stap 2: build ────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV VITE_API_URL=https://studio.staterra.nl
ENV VITE_SITE_URL=https://staterra.nl

RUN npm run build

# ── Stap 3: productie-image (nginx voor statische bestanden) ─
FROM nginx:alpine AS runner

# Kopieer Vite build-output naar nginx
COPY --from=builder /app/public /usr/share/nginx/html

# Kopieer nginx-configuratie
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
