# mazestudio-web

Web corporativa de **Mazestudio** (sitio estático). Este repositorio es el que
**Dokploy** observa para construir y desplegar la web automáticamente.

- Producción: **https://mazestudio.site** (el antiguo `web.demos.mazestudio.site`
  sigue apuntando aquí). `www` redirige 301 al apex.
- Se sirve con `nginx:alpine` (ver `Dockerfile` y `default.conf`), puerto **80**.
- **El push NO publica solo**: este repo no tiene webhook de GitHub. Despues de
  empujar hay que llamar al webhook de Dokploy para que reconstruya la imagen:
  ```
  curl -X POST -H "Content-Type: application/json" -H "X-GitHub-Event: push" \n       -d '{"ref":"refs/heads/main"}' \n       http://2.24.8.39:3000/api/deploy/sfHUNEivz2st3FekL4J_o
  ```
  El `{"message":"Application deployed successfully"}` es solo el acuse de que el
  build se ha encolado: el sitio viejo se sigue sirviendo ~20 s mas. Validar con
  un poll, no con una sola peticion.

## ⚠️ Este repo NO es la fuente

**No edites el HTML aquí.** La fuente está en el proyecto MAZESTUDIO, en
`WEB/src/mazestudio-web.html`, y el HTML publicable lo genera un build (esbuild
precompila el JSX en `assets/app.js`):

```
cd WEB
npm run build          # -> WEB/publicado/
```

Después se copia `WEB/publicado/` a este repo, renombrando la home:

| origen (`WEB/publicado/`) | destino (aquí)   |
|---------------------------|------------------|
| `mazestudio-web.html`     | `index.html`     |
| `en.html`                 | `en.html`        |
| `assets/app.js`           | `assets/app.js`  |
| `sitemap.xml`, `llms.txt`, `robots.txt`, legales… | igual |

## Los dos idiomas

El idioma **es la URL**, no una preferencia guardada: `/` en español y `/en` en
inglés, con `hreflang` recíproco. Las dos páginas las genera el mismo build
desde el mismo fuente (`build.mjs` traduce el `<head>` con el diccionario
`window.I18N_EN` del propio src), así que **nunca se editan a mano por separado**.

`/en` va **sin extensión**: `default.conf` lo resuelve con
`try_files $uri $uri.html`. Es a propósito — al no ser un directorio `/en/`, la
página resuelve las rutas relativas (`assets/…`) contra la raíz igual que la
home, y las dos versiones comparten el mismo `assets/app.js` sin reescribir
nada. `/en.html` y `/en/` redirigen 301 a `/en`.
