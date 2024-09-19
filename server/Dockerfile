FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

FROM node:20

WORKDIR /usr/src/app

COPY --from=build /usr/src/app ./

RUN npm install --only=production

EXPOSE 3002

CMD ["node", "dist/index.js"]
