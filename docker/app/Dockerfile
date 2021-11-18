FROM node:16.8.0-slim

WORKDIR /app

COPY app/package*.json .

RUN yarn

CMD ["yarn", "dev"]