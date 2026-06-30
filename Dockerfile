FROM nginx:alpine
# Config de nginx con pagina de error 404 personalizada (404.html).
COPY default.conf /etc/nginx/conf.d/default.conf
# Copia TODO el contenido de la carpeta del demo (index.html + imagenes/css/js)
# al directorio que sirve nginx. El .dockerignore evita copiar el propio Dockerfile.
COPY . /usr/share/nginx/html
EXPOSE 80
