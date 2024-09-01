FROM node:current-alpine AS build

WORKDIR /app

COPY . .
RUN npm ci
RUN npm run build

FROM node:current-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/packages/backend/ /app/packages/backend/
RUN npm ci --omit=dev

CMD ["npm", "start"]