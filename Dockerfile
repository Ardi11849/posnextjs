# Stage 1: Install dependencies
FROM --platform=linux/amd64 node:18-alpine AS deps
RUN npm install -g npm@10.2.0
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

# Stage 2: Build the application
FROM --platform=linux/amd64 node:18-alpine AS builder
RUN npm install -g npm@10.2.0
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Stage 3: Final image
FROM --platform=linux/amd64 node:18-alpine AS runner
RUN npm install -g npm@10.2.0
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.production ./
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]