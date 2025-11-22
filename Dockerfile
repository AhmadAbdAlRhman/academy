# ===== Stage 1: Builder =====
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (leverages Docker layer caching)
COPY package*.json ./
RUN npm ci                  # installs both dependencies + devDependencies

# Copy the rest of the application
COPY . .

# Optional: If you ever add a build step (e.g. TypeScript), uncomment:
# RUN npm run build

# ===== Stage 2: Final lightweight image =====
FROM node:20-alpine

WORKDIR /app

# Create a non-root user (security best practice)
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy package.json + package-lock.json
COPY --from=builder /app/package*.json ./

# Copy node_modules (from builder)
COPY --from=builder /app/node_modules ./node_modules

# Copy the entire app (all files you need at runtime)
COPY --from=builder /app ./

# Fix permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose the port your app runs on (change if different)
EXPOSE 3000

# Optional but recommended: health check
# Create a simple healthcheck file or use curl if you have an endpoint like /health
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3025/', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Start the app
CMD ["node", "server.js"]