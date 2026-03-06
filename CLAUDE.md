# Chas and Alana's Recipe Book

## Project Overview
A shared personal recipe collection web app for two people (Chas and Alana). Users paste a recipe URL and the app automatically parses and saves the recipe details. Built to be deployed as a static site on GitHub Pages.

## Tech Stack
- **React + Vite** — component framework and build tool
- **Tailwind CSS** — all styling, no custom CSS files
- **localStorage** — persists saved recipes in the browser (no backend or database)
- **Spoonacular API** — parses recipe details from a URL (title, image, ingredients, instructions)
- **gh-pages** npm package — for GitHub Pages deployment via `npm run deploy`

## Design & Aesthetic
- **Warm and cozy** — rustic, earthy, handmade collage feel
- **Color palette:** warm creams, terracotta, sage green, warm browns
- **Typography:** a handwritten font for headings (e.g. Playpen Sans from Google Fonts), readable sans-serif for body text
- **UI feel:** like a handwritten recipe box or vintage cookbook — soft shadows, rounded cards, warm backgrounds
- **No cold whites or stark blacks** — keep everything warm-toned

## Core Features

### 1. Add a Recipe (URL Input)
- A prominent input field on the homepage to paste a recipe URL
- On submit, call the Spoonacular Extract Recipe API to parse: title, image, ingredients, instructions, servings, prep/cook time, source URL
- Show a loading state while fetching
- On success, save to localStorage and show the recipe card

### 2. Recipe Collection (Homepage)
- Display all saved recipes as a card grid
- Each card shows: recipe image, title, source site name, star rating, and a short personal note preview
- Clicking a card opens the full recipe detail view

### 3. Recipe Detail View
- Full recipe info: title, image, ingredients list, step-by-step instructions
- Link back to the original source URL
- Editable personal note (textarea, auto-saved to localStorage)
- Star rating (1–5 stars, saved to localStorage)
- Delete recipe button

### 4. Empty State
- When no recipes are saved, show a warm, friendly empty state encouraging the user to add their first recipe

## File & Folder Conventions
- Components go in `src/components/`
- Pages go in `src/pages/`
- All localStorage logic goes in `src/utils/storage.js`
- All Spoonacular API calls go in `src/utils/api.js`
- Keep the Spoonacular API key in a `.env` file as `VITE_SPOONACULAR_API_KEY`
- Never hardcode API keys in source files

## Deployment
- Target: GitHub Pages
- Use the `gh-pages` package with a `deploy` script in `package.json`
- Set the correct `base` path in `vite.config.js` for the GitHub repo name

## Coding Style
- Functional React components only, no class components
- Use React hooks (useState, useEffect) for state management
- Tailwind utility classes for all styling — no separate CSS files
- Keep components small and focused — split into smaller components if a file exceeds ~100 lines
- Use clear, descriptive variable and function names
