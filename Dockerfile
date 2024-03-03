FROM node:20.11-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g typescript && npm install -g nodemon

COPY . .

EXPOSE 4000

CMD ["npm", "start"]