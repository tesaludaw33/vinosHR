# VINOS HR — Admin global real, sin GitHub token

Esta versión corrige el problema de localStorage: los cambios ya no quedan solo en tu celular/computador.

La página carga las sedes desde un servidor sencillo hecho con Google Apps Script. Cuando guardas desde el admin oculto, todos los visitantes del link ven los cambios.

## Paso 1 — Crear el servidor gratis

1. Entra a https://script.google.com/
2. Crea un proyecto nuevo.
3. Borra el código que aparece.
4. Pega todo el contenido del archivo `Code.gs`.
5. Cambia esta línea por un PIN privado:

```js
const ADMIN_PIN = '1234';
```

Ejemplo:

```js
const ADMIN_PIN = '2580';
```

6. Guarda el proyecto.

## Paso 2 — Publicar el Apps Script

1. Pulsa **Implementar**.
2. Pulsa **Nueva implementación**.
3. Tipo: **Aplicación web**.
4. Ejecutar como: **Yo**.
5. Quién tiene acceso: **Cualquier persona**.
6. Pulsa **Implementar**.
7. Autoriza permisos si Google lo pide.
8. Copia la URL que termina en `/exec`.

## Paso 3 — Pegar la URL en index.html

Abre `index.html` y busca esta línea:

```js
const CLOUD_API_URL = 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT';
```

Reemplázala por la URL `/exec` de tu Apps Script:

```js
const CLOUD_API_URL = 'https://script.google.com/macros/s/XXXXX/exec';
```

## Paso 4 — Subir a GitHub

1. Reemplaza tu `index.html` actual por este nuevo.
2. Haz **Commit changes**.
3. Abre:

```text
https://tesaludaw33.github.io/vinosHR/?admin=1
```

## Cómo administrar

1. Entra con `?admin=1`.
2. Escribe el PIN que pusiste en `Code.gs`.
3. Edita, elimina u oculta sedes.
4. Pulsa **Guardar y publicar para todos**.

Listo. Ya no tienes que descargar y subir el index cada vez que cambies una sede.
