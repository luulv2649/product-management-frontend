# Multi-stage build for React application
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build arguments
ARG REACT_APP_API_URL=http://localhost:8888/api
ARG REACT_APP_APP_NAME="Product Management System"
ARG REACT_APP_VERSION=1.0.0

# Set environment variables
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_APP_NAME=$REACT_APP_APP_NAME
ENV REACT_APP_VERSION=$REACT_APP_VERSION
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Create non-root user
RUN addgroup -g 1001 -S reactuser && \
    adduser -S -u 1001 -G reactuser reactuser

# Set permissions for nginx to run as non-root
RUN chown -R reactuser:reactuser /var/cache/nginx && \
    chown -R reactuser:reactuser /var/log/nginx && \
    chown -R reactuser:reactuser /etc/nginx/conf.d && \
    chown -R reactuser:reactuser /usr/share/nginx/html && \
    touch /var/run/nginx.pid && \
    chown -R reactuser:reactuser /var/run/nginx.pid

# Switch to non-root user
USER reactuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]