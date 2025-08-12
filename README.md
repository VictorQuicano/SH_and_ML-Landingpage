# 🌐 Ingeniería Soluciones - Sitio Web Oficial

Este es el repositorio del sitio web oficial de **SH & ML S.R.L. Ingeniería Soluciones**, desarrollado con [Astro](https://astro.build/) para ofrecer un portal rápido, moderno y optimizado para SEO, presentando los servicios de ingeniería, topografía, arquitectura, mecánica de suelos y saneamiento físico legal de la empresa.

## 🚀 Tecnologías utilizadas

- [Astro](https://astro.build/) — Framework web estático híbrido.
- [Node.js](https://nodejs.org/) — Ejecución y dependencias.
- HTML5, CSS3 y JavaScript (ESM).
- Integración con Open Graph y SEO optimizado.

## 📋 Requisitos previos

Para ejecutar este proyecto necesitas tener instalado:

- **Node.js** `>= 22.14.0`  
  _(Se recomienda usar [nvm](https://github.com/nvm-sh/nvm) para gestionar versiones de Node)_
- **npm** (incluido con Node) o **pnpm** / **yarn** como gestor de paquetes.

## ⚙️ Instalación y ejecución en local

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/VictorQuicano/SH_and_ML-Landingpage.git
   cd SH_and_ML-Landingpage
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

   o con pnpm:

   ```bash
   pnpm install
   ```

3. **Iniciar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   Esto levantará el proyecto en:

   ```
   http://localhost:4321
   ```

4. **Generar la build para producción**

   ```bash
   npm run build
   ```

5. **Vista previa de la build**

   ```bash
   npm run preview
   ```

## 📂 Estructura básica del proyecto

```
/
├── astro.config.mjs          // Archivo de configuración
├── dist
├── package.json              // Archivo de instalación
├── package-lock.json         // En caso haya problemas al instalar se puede eliminar
├── playwright.config.js      // SEO
├── playwright-report         // SEO
│   └── index.html
├── public                    // Miniaturas e imagenes que se muestran en la web
│   ├── favicon-192x192.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── images
│   ├── search.json
│   ├── site-title.svg
│   └── theme-init.js
├── README.md
├── src
│   ├── components            // Componentes básicos
│   ├── config.ts
│   ├── constants             // Archivos de configuración por servicio
│   ├── content               // Archivos como imágenes, etc
│   ├── pages                 // Páginas en el proyecto
│   ├── styles
│   └── utils
├── test-results
└── tsconfig.json

```

## 📦 Despliegue

El sitio puede ser desplegado en cualquier hosting compatible con sitios estáticos o adaptado para SSR.
Recomendado:

- [Netlify](https://www.netlify.com/) (Usado actualmente)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)

## 🛠 Mantenimiento y mejoras

- Mantener actualizado Astro y sus dependencias.
- Optimizar imágenes antes de subir.
- Revisar el rendimiento y SEO con [Lighthouse](https://developer.chrome.com/docs/lighthouse/).

## 📄 Licencia

Este proyecto es propiedad de **SH & ML S.R.L. Ingeniería Soluciones**.
No está permitido su uso o distribución sin autorización.

---

💡 _Desarrollado con Astro para velocidad, seguridad y escalabilidad._

```

```
