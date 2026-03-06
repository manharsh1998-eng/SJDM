# SJDM Construction — React + Vite + Sass
A clean, fast brochure website for **SJDM Construction** built with **React 18**, **Vite 5**, and **Sass (SCSS)**. No Tailwind used.

## Quick Start
1. Ensure you have **Node 18+** installed.
2. Open a terminal in this folder and run:
   ```bash
   npm install
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   npm run preview
   ```

## Structure
- `src/components/` — UI sections (Navbar, Hero, About, Services, Projects, Testimonials, Contact, Footer)
- `src/styles/` — global SCSS with variables/mixins and component styles
- `src/assets/logo-sjdm.svg` — custom logo (vector)
- `src/data/site.js` — simple data for services/projects/testimonials

## Notes
- The contact form is demo‑only. Hook it up to your backend or a form service to receive submissions.
- Colors and spacing are tuned for readability and construction brand feel: deep navy + construction orange + soft neutrals.
