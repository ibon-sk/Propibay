# Usar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación Angular
RUN npm run build -- --configuration production

# Exponer el puerto que el servidor escuchará
EXPOSE 4200

# Comando para iniciar el servidor
CMD ["npm", "start"]