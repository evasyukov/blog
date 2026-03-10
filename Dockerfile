FROM node:20

WORKDIR /app

COPY . .

WORKDIR /app/frontend
RUN npm install
RUN npm run build

WORKDIR /app/backend
RUN npm install

EXPOSE 3001

CMD ["node", "app.js"]