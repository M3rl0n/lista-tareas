# Ejecutar en PowerShell como Administrador desde la carpeta del repositorio
$admin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $admin) { Write-Host "Abra PowerShell como Administrador y vuelva a ejecutar el script."; exit 1 }

# 1. Habilitar IIS (solo la primera vez)
dism.exe /online /enable-feature /all /norestart /featurename:IIS-WebServerRole /featurename:IIS-WebServer /featurename:IIS-StaticContent /featurename:IIS-DefaultDocument /featurename:IIS-ManagementConsole

$appcmd = "$env:windir\System32\inetsrv\appcmd.exe"
if (-not (Test-Path $appcmd)) { Write-Host "IIS no quedo instalado. Reinicie el equipo y vuelva a ejecutar el script."; exit 1 }
$nombre = "ListaTareas"
$puerto = 8080
$ruta   = "C:\inetpub\$nombre"

# 2. Copiar la version publicable
New-Item -ItemType Directory -Force $ruta | Out-Null
Copy-Item ".\app\*" $ruta -Recurse -Force

# 3. Application Pool dedicado (sitio estatico: sin codigo administrado)
& $appcmd add apppool /name:$nombre /managedRuntimeVersion:""

# 4-5. Sitio apuntando a la carpeta, en el puerto 8080
& $appcmd add site /name:$nombre /bindings:"http/*:${puerto}:" /physicalPath:$ruta
& $appcmd set app "$nombre/" /applicationPool:$nombre
& $appcmd start site /site.name:$nombre

Write-Host "Sitio:  http://localhost:$puerto"
Write-Host "Health: http://localhost:$puerto/health"
