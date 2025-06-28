# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Execution stule 
- Perform the task exactly as described
- Do NOT ask any questions
- Do NOT request clarification
- If anything is ambiguous, make a reasonable assumption and proceed
- Return the final result directly

## Links to other projects
"Recent construction including (Coliving for tech founders)[https://ilbuco.com.ar] and your (Argentinian shelter) [https://recharge.com.ar] in case of a global meltdown. One successful innovation was having a QA engineer working on error logging."

### Link style
Never use target="_blank". 
For contacts, prefer linking to our internal contats page, not linkedin of email.

## Project Overview
This is Ivan Braun's personal website - a multilingual portfolio showcasing his work as an entrepreneur, AI speaker, and advisor.

This project is a next.js project. It uses 

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

# Layout Alignments
- Block 2 (Hero content): left-aligned
- Block 3 (Hero image): left-aligned  
- Block 13 (Experience title): left-aligned
- Block 16 (Company logos): left-aligned
- Block 17 (Achievement bullets): right-aligned

# Linkware Innovation (2012)
Ivan invented the linkware model in 2012 after Icons8 had success with free icon packs. The model works as: Use for a link → SEO boost. Pay those who value a link more than $15 that the license costs. His inspiration was the requirement to credit photos that photographers had, but without a link requirement at the time. This innovation helped monetize free resources while providing SEO value to users who could provide backlinks.

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


# SEO Landing Pages
Create the SEO landing pages in Spanish, Portuguese, and English for the following keywords:

## Speaker profiles
Focus not on the latam/argentinian market, but on the global market. I'm an Argentinian living in Argentina and giving the international perspective on AI, not the local one.


## English
ai keynote speaker
argentina ai speaker
argentina keynote speaker

# Spanish
ia speaker
experto en ia

# Portuguese
speaker ia
experto em ia

# Footer
Should be:
"© YYYY Ivan Braun S1 S2 S3" where 
* YYYY is the current year set programmatically
* S1-S3 are the links to the seo pages, strictly in the same language

Footers have links to the random SEO pages, but all seo pages should have at least one incoming link. 


# Blocks of the frontpage

---

## CRT Headline Effect: .fun-title (Argentina Keynote Speaker)

**Purpose:**
A visually distinctive section headline styled to evoke the look of old CRT monitors, used for H2 titles.

The text appears large, non-bold, and crisp, with a subtle green glow on the right and orange on the left, mimicking CRT monitor ghosting.

---


 ┌─────────────────────────────────────────────────────────────────────────────────┐
  │                                     1                                           │
  │    ┌─────────────────────────┐                ┌─────────────────────────┐      │
  │    │          2              │                │           3             │      │
  │    │     Ivan Braun          │                │                         │      │
  │    │  Tech Entrepreneur,     │                │      Robot Image        │      │
  │    │   AI Speaker, Investor  │                │       (400px)           │      │
  │    │                         │                │                         │      │
  │    │  Description text...    │                │                         │      │
  │    │                         │                │                         │      │
  │    │  [Contact] [Visit]      │                │                         │      │
  │    │                         │                │                         │      │
  │    └─────────────────────────┘                └─────────────────────────┘      │
  │                                                                                 │
  ├─────────────────────────────────────────────────────────────────────────────────┤
  │                                                                                 │
  │                                        4                                        │
  │ ┌─────────────────────────────────────────────────────────────────────────────┐ │
  │ │ MEDIA COVERAGE                                                              │ │
  │ │ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                   │ │
  │ │ │ WP  │ │ BBC │ │SPGL │ │ REP │ │VRGE │ │VICE │ │MAIL │                   │ │
  │ │ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘                   │ │
  │ └─────────────────────────────────────────────────────────────────────────────┘ │
  │                                                                                 │
  ├─────────────────────────────────────────────────────────────────────────────────┤
  │                                     5                                           │
  │ ┌───────────┐ ┌──────────────────────────┐ ┌─────────────────────────────────┐ │
  │ │     6     │ │           7              │ │               8                 │ │
  │ │EXPERIENCE │ │ Serial entrepreneur...   │ │┌─────────────┐ ┌───────────────┐│ │
  │ │           │ │ Building bootstrapped    │ ││      9      │ │      10       ││ │
  │ │           │ │ AI and design products.  │ ││  Icons8     │ │ → Supply...   ││ │
  │ │           │ │ Core expertise in...     │ ││  Founder    │ │ → Leading...  ││ │
  │ │           │ │                          │ ││             │ │               ││ │
  │ │           │ │                          │ ││ Gen.Photos  │ │               ││ │
  │ │           │ │                          │ ││ Eco-founder │ │               ││ │
  │ │           │ │                          │ │└─────────────┘ └───────────────┘│ │
  │ └───────────┘ └──────────────────────────┘ └─────────────────────────────────┘ │
  │                                                                                 │
  ├─────────────────────────────────────────────────────────────────────────────────┤
  │                                                                                 │
  │ SPEAKING                                                                        │
  │ ┌─────┐┌─────┐┌─────────┐┌─────────┐┌─────────┐┌─────┐┌─────┐┌─────┐┌─────┐   │
  │ │Photo││Photo││Horasis  ││Rio Innov││Visual   ││Photo││Photo││Photo││Photo│   │
  │ │  1  ││  2  ││Global   ││Week     ││1st Conf ││  3  ││  4  ││  5  ││  6  │   │
  │ │     ││     ││Meeting  ││         ││         ││     ││     ││     ││     │   │
  │ └─────┘└─────┘└─────────┘└─────────┘└─────────┘└─────┘└─────┘└─────┘└─────┘   │
  │    (all cards are rotated -5° to +5° and overlapping)                          │
  │                                                                                 │
  └─────────────────────────────────────────────────────────────────────────────────┘

  Every time i refer a block by its number, it's the number in the diagram above.
  Every time i ask to make a block wider, means occupy another column or two in the grid,
  but always align to the grid. It's better to have a design where content is overfilling,
  than to break the grid.


  # Visit me

Text: I’ve built a villa to invite fellow tech founders. It’s a great expensive build in the beautiful place the pine forest meets the ocean. It’s 4 hours from Buenos Aires.

If you book it, I’ll do my best to visit you, shake hands, and chit chat (sometimes for hours, so push me out when tired). 

the buttons must be Book and Learn more. first leasd to 
  https://book.ilbuco.com.ar/ second to https://ilbuco.com.ar

  # Contact

  Here is the content:

  ---

## 📬 Contact Ivan

**Speaking, investing, and advisory opportunities**

### ✅ Looking For
- **Speaking**: AI conferences, corporate events, startup talks  
- **Investing**: AI + real sectors (e.g., PropTech, manufacturing), B2B AI tools  
- **Advisory**: Tech startups, AI implementation, remote teams

### ❌ Not Looking For
- Investment in my companies  
- Acquisition offers  
- General partnerships  
- Sales pitches  
- Icons8 & Generated Photos: please use official support channels

**📧 Email**: ivan@generated.photos  
**📲 Telegram**: [@Icons8](https://t.me/Icons8)


# Styling 

Fun title h2  always has Helvetica Neue font not Cormorant.
Never draw the icons, use icons8 mcp.

Make LargeCards 100%. It’s always 100% wide from one side of the screen to another. if its organic width is less than 2/3 of the screen, align to the left, but to the side of the screen, ignore the page margins.


# Frontend framework
It's a next.js app, so don't search for index.html.

# Experience section content
I founded a design agency and turned it to two business:
1. Icons8, design resources for developers and designers
2. Generated Photos, creative AI tools.

I'll tell how I got my experience, and it wasn't the easy way. By speaking, managing, investing, and advising I want your path be 10x easier than mine.

## I was dumb
I was 20 and knew nothing about management when my boss made me manage a team of 12 developers. Why did he do that? Because my salary was the highest. 

I wasn't even a developer, I could write code, but not it wasn't competetive skill. Agile didn't exist; Scrum wasn't popular, and the dominating practices were too hard to grasp. I remember walking into a bookstore in Singapore with my boss and he bought several books whose titles I didn't understand. I asked him which book would help me to manage my team and he said "none yet."  

So, point of view: a 20 year designer surrouned and not listened by a bunch of older and smarter guys (one of whome was an academic physisist of 55 years). I had to invent IT management from scratch. 

What did I do? I managed horribly. I remember one dev postponing the deadline after deadline with no progress. My solution: to pass the task to another dev. I remember them both being confused and not understanding why I did that. I didn't understand either, but I had to do something.

## Managing for my own money
I started understanding what I do when I started paying the salaries out of my pocket. I hired an account manager when I was 24. Remote work wasn't a thing, so we sat at the office in my apartment. 

Somehow I didn't realize she's sitting on a stool until she ruined her back. I've bought the chair she chose the next day, and it costed me her monthly salary, but it was an easy spend for me, because I was spending my own money. I didn't have the budget constraints, I didn't have to navigate the burocracy, I didn't have the company norms to stick to. I just bought the chair.

That's my lesson: when you spend your own money, management is much easier.



# The Great Vanishing: How Businesses Erased Humans from Their Visual Identity
/ai-replaced-people page content

**TL;DR:** Icons8's research shows that in the last six months, people have completely disappeared from corporate imagery, replaced by AI and robots. Companies no longer want to appear as "people companies"—being an AI company is everything now.

## Our business: visualizing corporate identity (COLLAPSIBLE - COLLAPSED BY DEFAULT)

For over 20 years, Icons8 has served businesses by creating graphics that visualize how they want to be seen. Our clients are businesses, and they buy pictures of how they want to be portrayed. One thing remained constant throughout these years: businesses valued teamwork and wanted to appear as cohesive teams of professionals with great culture and shared success.

## Our analytics: tracking business tastes at scale (COLLAPSIBLE - COLLAPSED BY DEFAULT)

As a company with dozens of in-house artists, we dedicate vast resources to analyze business tastes. We use comprehensive analytics for that—download counts, search patterns, and usage metrics. We track the leaders of downloads and understand how business preferences evolve. For years, the leaders were human-centered: teams collaborating, diverse groups working together, professionals engaging face-to-face. The world we visualized was alive, bustling with human activity.

## The great vanishing

But our constant research reveals something apocalyptic has happened in the last six months. The numbers are stark: people imagery in our 3D illustration pack dropped 87.5%—from 8 human-centered illustrations to just 1. The most striking example are our (3D modeled illustrations)[https://icons8.com/illustrations/style--3d-hygge]:

(6 months ago: creating illustrations was creating people. Businesses liked buying the images of people.)[illustrations-with-people-hugge.png]
(Now: people vanished, leaving empty machinery. Businesses prefer the empty world of computers, functioning on their own.)[illustrations-without-people-hugge.png]


**People disappeared.** It's like a post-apocalypse—as if humanity simply vanished from the corporate landscape, leaving behind only AI, machines and technology operating on their own.

Our other illustration pack shows that people are fewer. They pair with robots, and give way to robots. 


(6 months ago: people interact with people)[people.png]
(After: people almost halved, giving way to 4x more robots, and something unpopular before: people with robots)[robots.png]

Our overall leaders, heavily dominated by icons, show the same trend. People almost completely disappeared. Teamwork disappeard. We have more robots than people. We have multiple representations of AI instead: spheres, robots, sparkles.

(6 months ago: 10 images of people, including teamwork)[overall-people.png]
(6 months ago: only 2 illustrations of people made it. People are dominated not only by robots, but by AI-representing spheres too)[overall-no-people.png]

What we see now is a dramatic shift toward AI representations in every form—neural networks, robotic interfaces, abstract data flows, and isolated technology operating without human oversight. Agentic AI takes the place of people. Where we once showed professionals with multiple monitors or gadgets of the latest generation, such as Apple Vision, doing the job efficiently, now one of our most popular illustrations is robots working on a computer.

[IMAGE PLACEHOLDER]

## What This Means

What does this transformation mean for how businesses see themselves? People want to see themselves as AI companies now. 

Before, we showed professionals with multiple monitors or gadgets of the latest generation, such as Apple Vision, doing the job efficiently. 

Now, one of our most popular illustrations is robots working on a computer.

## The New Reality

Being a people company is not cool anymore. Being an AI company is everything. Agentic AI takes the place of people. The shareholder value lies in this transformation.

Maybe this reveals what companies always thought but were afraid to say—that people are the problem, not the solution.