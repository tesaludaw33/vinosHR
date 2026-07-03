# VINOS HR - Panel administrador para GitHub Pages

Archivos incluidos:

- `index.html`: tu página actual modificada para cargar las sedes desde `data/sedes.json`.
- `admin.html`: panel de administración para editar sedes y guardar cambios en GitHub.
- `data/sedes.json`: lista editable de sedes y números de WhatsApp.

## Instalación

1. Sube estos 3 elementos a la raíz de tu repositorio GitHub Pages:
   - `index.html`
   - `admin.html`
   - carpeta `data/` completa
2. Abre tu sitio publicado y verifica que las sedes se muestran.
3. Abre `https://TU-USUARIO.github.io/TU-REPO/admin.html`.
4. Crea un GitHub Personal Access Token fine-grained para este repositorio con permiso `Contents: Read and write`.
5. En el panel, completa:
   - owner / usuario
   - repositorio
   - rama: normalmente `main`
   - ruta JSON: `data/sedes.json`
   - token
6. Pulsa “Cargar desde GitHub”, edita las sedes y pulsa “Guardar en GitHub”.

## Seguridad

No pegues tu token dentro de `index.html` ni lo publiques en el repositorio. En este panel el token se introduce en el navegador y se guarda solo en `sessionStorage` durante la sesión.
