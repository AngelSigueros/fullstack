# Fase de construcción, compilar el proyecto Angular
# docker pull node:20.10.0-alpine
FROM node:20.10.0-alpine as build

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm i

# Copiar los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Construir la aplicación Angular en modo producción
RUN npm run build -- --configuration production

# docker pull nginx:1.25-alpine
FROM nginx:1.25-alpine

# Copiar configuración nginx
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Eliminar los archivos por defecto de nginx:
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos de la build de Angular a nginx
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

# Ejecutar nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]