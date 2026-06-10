# mazestudio-web

Web corporativa de **Mazestudio** (sitio estático). Este repositorio es el que
**Dokploy** observa para construir y desplegar la web automáticamente.

- Producción: https://web.demos.mazestudio.site
- Se sirve con `nginx:alpine` (ver `Dockerfile`), puerto **80**.
- Cada cambio en `index.html` se publica con un `git push` a la rama `main`;
  Dokploy reconstruye la imagen y actualiza el sitio.

> El archivo fuente/canónico se edita en el proyecto MAZESTUDIO
> (`_empresa/diseno/maze-studio-web.html`) y se copia aquí como `index.html`
> antes de cada publicación.
