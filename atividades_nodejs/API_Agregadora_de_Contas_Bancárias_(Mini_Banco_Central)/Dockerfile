FROM node:18

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3050

# Comando para iniciar o servidor
CMD ["npm", "run","init"]
