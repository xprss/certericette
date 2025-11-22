# --- Build stage ---
FROM node:22-alpine AS builder
WORKDIR /core

COPY package*.json ./
COPY tsconfig*.json ./
COPY . .
COPY .env ./
RUN npm install
RUN npm run build

# --- Production stage ---
FROM node:22-alpine AS production
WORKDIR /core

COPY package*.json ./
RUN npm install

# Copy built files from builder
COPY --from=builder /core/dist ./dist

# Set environment variables (optional)
ENV NODE_ENV=production
ENV PORT=8000
EXPOSE 8000

CMD ["node", "dist/main.js"]