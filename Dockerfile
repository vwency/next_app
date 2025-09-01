FROM node:alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm config set store-dir .pnpm-store

COPY package.json pnpm-lock.yaml ./

COPY .env.local* ./

RUN pnpm install --frozen-lockfile --no-optional
RUN pnpm add --save-dev @types/node @types/react @types/react-dom typescript

COPY . .

RUN pnpm build

FROM node:alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/next.config.ts ./next.config.ts

ENTRYPOINT ["pnpm", "start"]
