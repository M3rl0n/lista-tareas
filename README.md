# Lista de Tareas

## Integrantes

- David Stiven Franco Lopez
- Jhon Fernando Sanchez Alvarez
- Juan Sebastian Echeverri Gallego
- Marbel Juliana Mejia Bedoya
- Marlon Garcia Sepulveda

## Responsabilidades y contribuciones

Cada integrante trabajó en una rama propia y entregó su parte mediante un Pull Request. La columna *Pull Request* muestra el número del PR y su commit de fusión en `main`.

| Integrante | Tarea asignada | Contribución | Rama de origen | Pull Request | Commits |
|---|---|---|---|---|---|
| Marlon Garcia Sepulveda | Repositorio y documentación | Creación del repositorio y colaboradores, `README.md` y etiqueta `practica3-v1.0` | `main`<br>`readme-final` | Commit directo<br>[#7](https://github.com/M3rl0n/lista-tareas/pull/7) | [`ba195c0`](https://github.com/M3rl0n/lista-tareas/commit/ba195c0)<br>[Commit del README final](https://github.com/M3rl0n/lista-tareas/pull/7/commits) |
| David Stiven Franco Lopez | Aplicación y health check | Carpeta `app/`, `.gitignore` y validación de tareas | `david-app` | [#1](https://github.com/M3rl0n/lista-tareas/pull/1) · `31e1949` | [`eadc437`](https://github.com/M3rl0n/lista-tareas/commit/eadc437), [`5aa570a`](https://github.com/M3rl0n/lista-tareas/commit/5aa570a) |
| Jhon Fernando Sanchez Alvarez | Instalación y configuración de IIS | Script `desplegar-iis.ps1` | `jhon-iis` | [#2](https://github.com/M3rl0n/lista-tareas/pull/2) · `3487cd9` | [`21acfff`](https://github.com/M3rl0n/lista-tareas/commit/21acfff) |
| Marbel Juliana Mejia Bedoya | Verificación y evidencias de IIS | Capturas `evidencias/iis/` y organización de `evidencias/` | `marbel-evidencias-iis`<br>`fix-evidencias`<br>`fix-evidencias` | [#3](https://github.com/M3rl0n/lista-tareas/pull/3) · `7ae4faf`<br>[#5](https://github.com/M3rl0n/lista-tareas/pull/5) · `ee65e87`<br>[#6](https://github.com/M3rl0n/lista-tareas/pull/6) · `64af78b` | [`cf626bf`](https://github.com/M3rl0n/lista-tareas/commit/cf626bf)<br>[`3b3140d`](https://github.com/M3rl0n/lista-tareas/commit/3b3140d), [`fe54c41`](https://github.com/M3rl0n/lista-tareas/commit/fe54c41)<br>[`f5469a8`](https://github.com/M3rl0n/lista-tareas/commit/f5469a8) |
| Juan Sebastian Echeverri Gallego | Publicación en Azure | Capturas `evidencias/azure/` | `sebastian-evidencias-azure` | [#4](https://github.com/M3rl0n/lista-tareas/pull/4) · `00e0d21` | [`15d3304`](https://github.com/M3rl0n/lista-tareas/commit/15d3304) |

## Aplicación

- **Tecnología:** HTML, CSS y JavaScript (sitio estático, sin dependencias).
- **Descripción:** lista de tareas sencilla; las tareas se guardan en el navegador (localStorage).
- **Validación:** no permite agregar tareas vacías o con solo espacios, y limita cada tarea a 100 caracteres.
- **Health check:** `/health` responde `OK` (archivo `app/health/index.html`).

## Publicación

| Entorno | Fecha | URL |
|---|---|---|
| IIS | 2026-10-29 | http://localhost:8080 · http://localhost:8080/health |
| Azure App Service | 2026-10-29 | https://lista-tareas-juane.azurewebsites.net · https://lista-tareas-juane.azurewebsites.net/health |

**Video de evidencia:** [Ver video en Google Drive](https://drive.google.com/file/d/1qMeWsVGHSlFCT3NEjWQHbbkAH7C7xh42/view)

## Cómo reproducir el despliegue

### IIS (Windows 11)

En PowerShell **como Administrador**, desde la carpeta del repositorio:

```powershell
.\desplegar-iis.ps1
```

El script habilita IIS, copia `app/` a `C:\inetpub\ListaTareas`, crea el Application Pool `ListaTareas`
(sin código administrado) y el sitio `ListaTareas` en el puerto **8080**. El documento predeterminado
(`index.html`) se define en `app/web.config`.

### Azure App Service

Con Azure CLI, desde la carpeta `app/`:

```powershell
az login
az group create --name rg-lista-tareas --location brazilsouth
az webapp up --name lista-tareas-juane --resource-group rg-lista-tareas --html --sku F1 --location brazilsouth
az webapp config appsettings set --name lista-tareas-juane --resource-group rg-lista-tareas --settings APP_ENVIRONMENT=Production
az webapp update --name lista-tareas-juane --resource-group rg-lista-tareas --https-only true
```

- **Application Setting:** `APP_ENVIRONMENT=Production`
- **HTTPS Only:** habilitado

## Evidencias

Haga clic en cada archivo para ver la captura.

### IIS ([`evidencias/iis/`](evidencias/iis/))

| Archivo | Contenido |
|---|---|
| [`00-ejecucion-inicial-iis.jpeg`](evidencias/iis/00-ejecucion-inicial-iis.jpeg) | Ejecución de `desplegar-iis.ps1` |
| [`01-app-pool-y-app.jpeg`](evidencias/iis/01-app-pool-y-app.jpeg) | Sitio `ListaTareas` en el puerto 8080 y la app en `localhost:8080` |
| [`02-sitio-ruta-fisica.jpeg`](evidencias/iis/02-sitio-ruta-fisica.jpeg) | Application Pool `ListaTareas` y ruta física `C:\inetpub\ListaTareas` |
| [`03-binding-puerto-8080.jpeg`](evidencias/iis/03-binding-puerto-8080.jpeg) | Enlace `http` en el puerto 8080 |
| [`04-documento-predeterminado.jpeg`](evidencias/iis/04-documento-predeterminado.jpeg) | Documento predeterminado `index.html` |
| [`05-health.jpeg`](evidencias/iis/05-health.jpeg) | `localhost:8080/health` respondiendo `OK` |
| [`06-grupo-aplicaciones.jpeg`](evidencias/iis/06-grupo-aplicaciones.jpeg) | Grupos de aplicaciones: `ListaTareas` iniciado, sin código administrado |

### Azure App Service ([`evidencias/azure/`](evidencias/azure/))

| Archivo | Contenido |
|---|---|
| [`01-app-service.png`](evidencias/azure/01-app-service.png) | Recurso App Service: grupo de recursos, región, estado y dominio |
| [`02-app-settings.png`](evidencias/azure/02-app-settings.png) | Application Setting `APP_ENVIRONMENT = Production` |
| [`03-https-only.png`](evidencias/azure/03-https-only.png) | Opción "HTTPS solamente" habilitada |
| [`04-app.png`](evidencias/azure/04-app.png) | La app en la URL pública |
| [`05-health.png`](evidencias/azure/05-health.png) | `/health` respondiendo `OK` en Azure |
