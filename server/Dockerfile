FROM node:20-slim

WORKDIR /app

COPY package*.json ./
COPY server ./server

RUN npm ci --only=production

EXPOSE 3001

CMD ["node", "server/proxy.js"]