# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG SITE_ORIGIN=https://new.jashom.com
ENV NEXT_PUBLIC_SITE_ORIGIN=${SITE_ORIGIN}

RUN npm run build

# ---------- Runtime stage ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy required files (NO node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Install only production dependencies
RUN npm install --omit=dev

# Permissions
RUN chmod -R 555 public && chmod -R 444 .next

USER nextjs

EXPOSE 8080

CMD ["npm", "start"]
