FROM node:12.16.0

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .
