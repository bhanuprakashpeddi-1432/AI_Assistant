# Multi-stage Docker build for production

# Backend stage
FROM node:18-alpine AS backend
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY backend/ ./

# Expose backend port
EXPOSE 5000

# Backend build
FROM backend AS backend-prod
CMD ["npm", "start"]

# Frontend build stage
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source
COPY frontend/ ./

# Build frontend
RUN npm run build

# Production nginx stage for frontend
FROM nginx:alpine AS frontend-prod
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

# Development stage (for docker-compose)
FROM node:18-alpine AS development
WORKDIR /app

# Install dependencies for both frontend and backend
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

RUN npm install
RUN cd backend && npm install
RUN cd frontend && npm install

# Copy source code
COPY . .

EXPOSE 3000 5000
CMD ["npm", "run", "dev"]
