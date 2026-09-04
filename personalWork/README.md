# ELR.dev Starter Kit

Monorepo para crear sitios web estáticos reutilizables con HTML, CSS, JavaScript y Vite.

## Estructura

```text
apps/       Sitios independientes para cada cliente
shared/     CSS y JavaScript compartidos
templates/  Plantillas para nuevos proyectos
```

## Requisitos

- Node.js 20 o superior
- npm

En Windows PowerShell, si `npm` está bloqueado por la política de scripts, usa `npm.cmd`.

## Instalación

```powershell
npm.cmd install
```

## Desarrollo

ELR.dev:

```powershell
npm.cmd run dev
```

Barber Shop:

```powershell
npm.cmd run dev:barber
```

## Build

```powershell
npm.cmd run build
npm.cmd run build:barber
```

Las salidas se generan dentro de `apps/<sitio>/dist/` y no se versionan.

## Crear una nueva app

1. Crea una carpeta dentro de `apps/`.
2. Añade su `index.html`, CSS y JavaScript.
3. Reutiliza los módulos de `shared/` cuando corresponda.
4. Añade un script `dev:<nombre>` y `build:<nombre>` en `package.json`.
5. Ejecuta el build antes de publicar.
