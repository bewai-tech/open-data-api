FROM node:lts-alpine

RUN apk update && apk add bash unzip && rm -vrf /var/cache/apk/*

WORKDIR /usr/app
ENV PATH /usr/app/node_modules/.bin:$PATH

COPY . /usr/app

RUN npm install

EXPOSE 3000
