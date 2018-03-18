FROM node:8-alpine

ENV NODE_ENV production
RUN mkdir /usr/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app
RUN npm install

COPY ./.babelrc /usr/src/app
COPY ./credential/ /usr/src/app/credential/
COPY ./endpoint/ /usr/src/app/endpoint/
COPY ./services/ /usr/src/app/services/
COPY ./view/ /usr/src/app/view/
COPY ./bot.js /usr/src/app
COPY ./app.js /usr/src/app
COPY ./ip.js /usr/src/app
COPY ./keyboard.js /usr/src/app

CMD ["npm", "start"]
