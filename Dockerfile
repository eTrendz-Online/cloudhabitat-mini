FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

WORKDIR /app/backend
EXPOSE 8787
CMD ["node", "server.js"]
