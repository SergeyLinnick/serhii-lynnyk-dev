FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/admin/package.json apps/admin/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/
COPY packages/prettier-config/package.json packages/prettier-config/
COPY packages/utils/package.json packages/utils/
COPY packages/models/package.json packages/models/
COPY packages/auth/package.json packages/auth/
COPY packages/ui/package.json packages/ui/
COPY packages/api/package.json packages/api/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build --filter=admin

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=2999
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/apps/admin/.next/standalone ./
COPY --from=builder /app/apps/admin/.next/static ./apps/admin/.next/static
COPY --from=builder /app/apps/admin/public ./apps/admin/public

EXPOSE 2999
CMD ["node", "apps/admin/server.js"]
