# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Links to other projects
"Recent construction including (Coliving for tech founders)[https://ilbuco.com.ar] and your (Argentinian shelter) [https://recharge.com.ar] in case of a global meltdown. One successful innovation was having a QA engineer working on error logging."

## Project Overview
This is Ivan Braun's personal website - a multilingual portfolio showcasing his work as an entrepreneur, AI speaker, and advisor. The project uses a **hybrid architecture** that combines React development tooling with static HTML deployment.

## Development Commands
```bash
npm install      # Install dependencies
npm start        # Start development server (React with hot reload)
npm run build    # Build for production
npm test         # Run Jest tests
```

## Architecture Overview

### Hybrid Development Pattern
- **Development**: React 19.1.0 with Create React App for modern dev experience
- **Production**: Static HTML files served directly (no React in production)
- **Key Insight**: Uses React tooling benefits while maintaining static HTML performance

### Directory Structure
- `public/` - **Production website content** (this is what gets deployed)
  - `index.html` - English version (main)
  - `es.html` - Spanish version  
  - `pt.html` - Portuguese version
  - `i/` - Images and media assets
- `src/` - React development files (standard CRA boilerplate, not used in production)
- `build/` - Production build output (mirrors public/)

### Content Management
- **Website changes**: Edit HTML files directly in `public/` directory
- **Images**: Add to `public/i/` directory
- **Multilingual**: Three separate HTML files for EN/ES/PT versions
- **CDN**: Uses ImageKit for image optimization

### Key Features
- Multilingual support with auto-detection via IP geolocation
- Swiss Grid System design principles
- Fancybox integration for image galleries
- Mobile-first responsive design
- SEO-optimized static HTML

## Development Workflow
1. Run `npm start` for development with hot reload
2. Edit content in `public/` HTML files (not React components)
3. Add images to `public/i/` directory
4. Test with `npm test`
5. Build with `npm run build` for production

## Important Notes
- The actual website lives in `public/` - edit HTML files there, not React components
- This hybrid approach provides modern dev tooling while maintaining static HTML benefits
- All three language versions need to be updated manually for content changes
- Images should use ImageKit CDN integration for optimization

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.


# es/formularios-startup-argentina
Here are the startup forms for Argentina. Make this page only available in Spanish. Make it formatted for reading, with blocks, bulleted lists, emoji, bold, and italics.

Take the forms from /public/forms

Make it visible that these are not real law-rewiewed forms.


# Cómo iniciar un emprendimiento con socios en Argentina: acuerdos, formularios y pasos clave

## 📝 Guía práctica para emprendedores que quieren empezar un negocio entre socios en Argentina, con o sin sociedad formal. Modelos de acuerdos, pasos previos a crear una SAS, y formularios esenciales para iniciar una startup.

**¿Por qué esta guía?**  
Iniciar un **emprendimiento en Argentina** con uno o más socios exige algo más que una buena idea: se necesitan acuerdos claros, un plan de acción y los **formularios de AFIP** correctos. Aquí encontrarás modelos listos para usar —desde un **contrato entre socios** hasta la cesión de propiedad intelectual— y los pasos previos para pasar de una **sociedad de hecho** a una SAS registrada.

**Qué vas a lograr con esta página**

- **Evitar conflictos** futuros mediante un **acuerdo entre socios Argentina** con cláusulas de vesting, drag-along y confidencialidad.  
- **Ahorrar tiempo** siguiendo un checklist de **pre constitución empresa Argentina** con los documentos mínimos para operar antes de inscribir la sociedad.  
- **Formalizar** tu actividad económica presentando el **formulario inicio de actividad AFIP** y otros trámites clave para **abrir una startup en Argentina**.  
- **Escalar** rápidamente cuando llegue la primera ronda, convirtiendo el préstamo inicial en equity sin fricciones.

> **Tip rápido:** Si recién empezás, podés funcionar como **sociedad de hecho Argentina** con responsabilidad ilimitada; este paquete de contratos te blinda mientras reunís el cash-flow necesario para constituir tu SAS.

---

## Pasos esenciales para emprender en Argentina con socios

1. **Firmar el Contrato entre Socios (MoU 50 / 50 %)**  
   Fija roles, derechos de preferencia y plan de vesting.

2. **Proteger la Propiedad Intelectual**  
   Usa nuestro fideicomiso expreso para registrar software, marcas y patentes.

3. **Financiar con un Mutuo Convertible**  
   Recibí capital inicial sin perder control y convertí cuando levantes inversión.

4. **Presentar la Declaración de Inicio ante AFIP**  
   Trámite online que otorga CUIT y habilita la facturación.

5. **Constituir la SAS** (cuando alcance el flujo de caja objetivo)  
   Inscripción 100 % digital en 48–72 h, con estatuto y libros societarios electrónicos.

---

## Formularios y plantillas que encontrarás aquí

- **MoU** (Acuerdo de Fundadores)  
- **Cesión y Fideicomiso de PI**  
- **Mutuo Convertible**  
- **NDA multilateral**  
- **Checklist Due Diligence** (UIF, AFIP, antecedentes)

> **Disclaimer:** Todos los modelos son plantillas de referencia y **no sustituyen asesoría legal profesional**.

---

¿Listo para **crear tu emprendimiento en Argentina**?  
Usá estos modelos como base para avanzar con seguridad y claridad.

---

### 🔍 Keywords objetivo (integradas)
- acuerdo entre socios Argentina  
- cómo empezar un negocio en Argentina  
- pasos para emprender en Argentina  
- abrir una startup en Argentina  
- formulario inicio de actividad AFIP  
- pre constitución empresa Argentina  
- modelo contrato entre socios  
- sociedad de hecho Argentina  
- crear emprendimiento Argentina



