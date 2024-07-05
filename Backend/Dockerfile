FROM node:20-alpine

WORKDIR /src

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

COPY .env .env

EXPOSE 3000

CMD [ "npm", "start" ]