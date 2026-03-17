# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy assets, optimized images, audio, and images directories with proper permissions
COPY --from=builder /app/assets /usr/share/nginx/html/assets
COPY --from=builder /app/optimized /usr/share/nginx/html/optimized
COPY --from=builder /app/preview-audio /usr/share/nginx/html/preview-audio
COPY --from=builder /app/public /usr/share/nginx/html/public
COPY --from=builder /app/images /usr/share/nginx/html/images

# Ensure proper permissions for all static files
RUN chmod -R 755 /usr/share/nginx/html && \
    find /usr/share/nginx/html -type f -exec chmod 644 {} \;

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
