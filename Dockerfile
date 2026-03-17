# Build stage
FROM node:18-alpine AS builder

# Set memory limit for Node.js
ENV NODE_OPTIONS="--max-old-space-size=2048"

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --silent

# Copy source files
COPY . .

# Build the application with memory optimization
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy static assets that exist
COPY --from=builder /app/assets /usr/share/nginx/html/assets
COPY --from=builder /app/optimized /usr/share/nginx/html/optimized
COPY --from=builder /app/preview-audio /usr/share/nginx/html/preview-audio
COPY --from=builder /app/public /usr/share/nginx/html/public
COPY --from=builder /app/images /usr/share/nginx/html/images

# Set proper permissions
RUN chmod -R 755 /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
