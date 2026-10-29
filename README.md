# Lista de Tareas

## Integrantes

- David Stiven Franco Lopez
- Jhon Fernando Sanchez Alvarez
- Juan Sebastian Echeverri Gallego
- Marbel Juliana Mejia Bedoya
- Marlon Garcia Sepulveda

## Responsabilidades

| Integrante | Responsabilidad | Contribución verificable |
|---|---|---|
| Marlon Garcia Sepulveda | Repositorio y documentación | Commit: `README.md` + etiqueta `practica3-v1.0` |
| POR DEFINIR | Aplicación y health check | Commit: carpeta `app/` + `.gitignore` |
| POR DEFINIR | Instalación y configuración de IIS | Commit: `desplegar-iis.ps1` |
| POR DEFINIR | Verificación y evidencias de IIS | Commit: capturas `evidencias/iis/` |
| POR DEFINIR | Publicación en Azure | Commit: capturas `evidencias/azure/` |

## Aplicación

- **Tecnología:** HTML, CSS y JavaScript (sitio estático, sin dependencias).
- **Descripción:** lista de tareas sencilla; las tareas se guardan en el navegador (localStorage).
- **Health check:** `/health` responde `OK` (archivo `app/health/index.html`).

## Publicación

| Entorno | Fecha | URL |
|---|---|---|
| IIS | Pendiente | http://localhost:8080 · http://localhost:8080/health |
| Azure App Service | Pendiente | Pendiente |

**Video de evidencia:** ENLACE_AL_VIDEO

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

- `evidencias/iis/`: Application Pool, sitio (ruta física y binding), app en el navegador, `/health`.
- `evidencias/azure/`: recurso App Service, Application Settings, HTTPS Only, app en la URL pública, `/health`.
