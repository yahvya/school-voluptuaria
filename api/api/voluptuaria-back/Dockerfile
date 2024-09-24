FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "run", "start:dev"]