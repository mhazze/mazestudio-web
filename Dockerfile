FROM nginx:alpine
# Copia TODO el contenido de la carpeta del demo (index.html + imagenes/css/js)
# al directorio que sirve nginx. El .dockerignore evita copiar el propio Dockerfile.
COPY . /usr/share/nginx/html
EXPOSE 80
