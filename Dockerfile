FROM node

#local da instalação da nossa aplicação em produçao.
WORKDIR /usr/app

#copia o arquivo para dentro do diretório WORKDIR
COPY package*.json ./

# instala as dependência do projeto
#RUN npm install
RUN yarn --force

#copia tudo para dentro da pasta workdir
COPY . .

#EXPOR A PORTA DO NODE
EXPOSE 3333

#EXECUTAR OS COMANDOS npm run dev
#CMD ["npm", "run", "dev"]
CMD ["yarn", "dev"]
