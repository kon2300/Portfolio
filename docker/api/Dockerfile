FROM node:16.8.0-slim

WORKDIR /api

COPY api/package*.json .

RUN yarn

CMD ["yarn", "start"]