# Build Stage
FROM node:20-alpine AS build

RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

RUN npm run build


# Production Stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json /app/

RUN npm ci --omit=dev

COPY --from=build /app/build /app/build
COPY --from=build /app/.env /app/.env


ENV PORT="9090"

EXPOSE ${PORT}

CMD ["node", "build/server/index"]




# FROM node:20-alpine

# RUN mkdir -p /app
# WORKDIR /app

# COPY package*.json /app

# RUN npm install

# COPY . /app/

# RUN npm run build

# CMD ["node", "build/server/index"]

