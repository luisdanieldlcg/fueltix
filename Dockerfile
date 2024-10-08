FROM node:latest

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

COPY .env.example .env

EXPOSE 8080

CMD ["npm", "run", "dev"]