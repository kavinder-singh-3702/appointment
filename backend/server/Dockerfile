# Node runtime for backend API
FROM node:18-alpine AS base

ENV NODE_ENV=production
WORKDIR /usr/src/app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install --omit=dev

# Copy source code and schema
COPY src ./src
COPY schema.sql ./schema.sql
COPY .env.example ./

EXPOSE 4000
CMD ["node", "src/index.js"]
