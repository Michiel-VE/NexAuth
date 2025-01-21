# Stage 1: Build Stage
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist # Adjust for your output directory
COPY --from=build /app/.env* ./ # Include environment files if applicable

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]

# Stage 3: Development Stage
FROM node:18 AS development

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
