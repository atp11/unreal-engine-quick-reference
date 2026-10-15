# Unreal Engine Quick Reference

Referencia rápida, interactiva y gratuita en español sobre **Unreal Engine 5**.

Prioriza Blueprints como vía educativa y trata C++ como extensión para comprender la implementación subyacente y conectar ambos enfoques. No es una wiki ni una copia de la documentación oficial: es una herramienta de consulta concisa, con ejemplos originales y navegación orientada a la búsqueda.

## Aviso

Unreal Engine Quick Reference es un proyecto educativo independiente y no está afiliado a Epic Games ni respaldado por esta empresa. Unreal Engine y sus marcas pertenecen a sus respectivos titulares.

## Requisitos

- Node.js 20+ (recomendado 22)
- npm 10+

## Instalación

```bash
npm install
```

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción (+ `404.html` para SPA en GitHub Pages) |
| `npm run preview` | Previsualizar el build |
| `npm run typecheck` | Comprobación de tipos TypeScript |
| `npm test` | Pruebas (búsqueda, filtros, almacenamiento) |
| `npm run lint` | Lint con oxlint |

## Estructura de carpetas

```
src/
  components/     # UI reutilizable (layout, búsqueda, fichas)
  context/        # Estado global (tema, favoritos, historial)
  data/           # Categorías y entradas de referencia
  lib/            # Búsqueda, normalización y localStorage
  pages/          # Vistas/rutas
  styles/         # CSS (variables, global, componentes)
  types/          # Tipos TypeScript del modelo de datos
  test/           # Setup de Vitest
.github/workflows # Despliegue en GitHub Pages
```

## Cómo añadir nuevas entradas

1. Elige el archivo adecuado en `src/data/entries/` (o crea uno nuevo por categoría).
2. Añade un objeto que cumpla `ReferenceEntry` (`src/types/reference.ts`).
3. Exporta e incluye el array en `src/data/entries/index.ts` si es un archivo nuevo.
4. No inventes versiones ni URLs oficiales: solo incluye referencias verificadas.
5. Omite secciones opcionales vacías; la UI no las mostrará.

Campos habituales: `id`, `slug`, `title`, `originalName`, `summary`, `description`, `category`, `elementType`, `tags`, `ueVersions`, `difficulty`, `lastReviewed`, más opcionales (`examples`, `commonMistakes`, `relatedEntries`, equivalencias BP/C++, etc.).

## Despliegue en GitHub Pages

La app es estática. Vite usa `base: /unreal-engine-quick-reference/` en producción.

1. En el repositorio de GitHub: **Settings → Pages → Source: GitHub Actions**.
2. El workflow `.github/workflows/deploy.yml` construye y publica en cada push a `main`/`master`.
3. La URL típica será: `https://<usuario>.github.io/unreal-engine-quick-reference/`.

Si el nombre del repositorio cambia, actualiza `base` en `vite.config.ts`.

## Licencias

- **Código:** MIT — ver `LICENSE`
- **Contenido educativo original:** CC BY 4.0 — ver `LICENSE-CONTENT`
- Las dependencias de terceros conservan sus propias licencias

## Stack

React, TypeScript, Vite, React Router, Lucide Icons, Vitest. Sin backend ni APIs de pago.
