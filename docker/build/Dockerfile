FROM node:lts-alpine

RUN apk update && apk add bash

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/
COPY ./package-lock.json /app/

RUN npm install --global pm2
RUN npm run install:ci:light

COPY . /app

RUN npm run build

CMD ["node", "dist/cmd/start.js"]

EXPOSE 3000
