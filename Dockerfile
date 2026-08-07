FROM nginx:alpine
# Copia TODO el contenido de la carpeta del demo (index.html + imagenes/css/js)
# al directorio que sirve nginx. El .dockerignore evita copiar el propio Dockerfile.
COPY . /usr/share/nginx/html
# Mueve la config de nginx (pagina de error 404 personalizada) a su sitio,
# sacandola del directorio servido para que no sea accesible como /default.conf.
RUN mv /usr/share/nginx/html/default.conf /etc/nginx/conf.d/default.conf
# Valida la config EN EL BUILD: si default.conf tiene un error de sintaxis,
# falla aqui y Dokploy sigue sirviendo la imagen anterior. Sin esto el fallo
# aparece al arrancar el contenedor, es decir, con la web ya caida.
RUN nginx -t
EXPOSE 80
