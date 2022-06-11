FROM node:16.13.0-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . /app

RUN npm run build

CMD ["node", "dist/main"]
