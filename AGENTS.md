# Repository Guidelines

## Project Structure & Module Organization
The Vue 3 entrypoint at `src/main.js` wires Pinia stores, the router, Lenis scrolling, and animation helpers; start integrations there. Reusable UI lives under `src/components`, with globally shared atoms in `src/components/global` and full views in `src/views`. State management resides in `src/stores` (`useUserStore`, `useContentStore`, etc.) for API-driven data and translations. Cross-cutting browser helpers belong in `src/services`, while assets stay in `src/assets` and public files bypassing the bundler live under `public/`.

## Build, Test, and Development Commands
- `npm install` — install dependencies using Node 20+.
- `npm run dev` — launch Vite with HMR at `http://localhost:5173`.
- `npm run build` — produce the optimized bundle in `dist/`.
- `npm run preview` — serve the built bundle to verify routing, scroll resets, and lazy assets.
Run commands from the repository root to pick up the Vite config and alias definitions automatically.

## Coding Style & Naming Conventions
Follow two-space indentation, single-quote imports, and trailing commas inside multi-line objects. Author Vue components with `<script setup>` and PascalCase filenames (`GlobalHeader.vue`). Use the `@/` alias for imports inside `src/`. Keep stateful logic in Pinia stores and confine global styles to `src/assets/main.css`, preferring scoped styles elsewhere.

## Testing Guidelines
A formal test runner is not yet configured. Coordinate with maintainers before adding Vitest or similar. For now, rely on `npm run preview` to confirm translations, route guards, and Lenis-driven scroll resets. When introducing tests, co-locate specs beside components (`FeaturePanel.spec.ts`) and cover both language toggles.

## Commit & Pull Request Guidelines
Write imperative commit subjects under 72 characters (e.g., "Fix location order") and group changes by feature or content sync. Pull requests should summarize user-visible impact, cite touched stores or services, and include before/after captures for UI shifts. Link tickets or discussions and note any manual steps such as new environment keys or cache clears.

## Local Tooling & Environment
Use the supplied `jsconfig.json` for editor path resolution and wire ESLint or formatting only after team agreement. Validate that Lenis configuration and animation helpers behave as expected across breakpoints before merging.
