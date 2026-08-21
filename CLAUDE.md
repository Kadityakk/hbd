# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev     # dev server on :3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint (flat config, no path arg needed)
```

No test framework is set up.

## Stack

Next.js 16.3.2 (App Router) · React 19.2 · TypeScript strict · Tailwind CSS v4.

Next 16 differs from older App Router code in ways worth checking before writing:

- **Bundled docs are the source of truth**, not training data. `node_modules/next/dist/docs/01-app/` — `01-getting-started/` for the core concepts, `02-guides/` for topics like `authentication.md`, `environment-variables.md`, `forms.md`, `03-api-reference/` for exact signatures.
- **Route prop types are global.** `app/layout.tsx` uses `LayoutProps<"/">` with no import; pages get `PageProps<"/route">` the same way. These are generated into `.next/dev/types/` — running `next dev` or `next build` at least once is what makes them resolve.

## Styling

There is no `tailwind.config.js` and none should be added — Tailwind v4 configures itself from `app/globals.css` (`@import "tailwindcss"` plus `@theme inline { … }`). PostCSS wiring is `@tailwindcss/postcss` only.

In practice this project barely uses Tailwind utilities. The UI is a direct port of a Claude Design `.dc.html` file whose styling was per-element inline CSS, so **components carry inline `style` objects** with the design's exact values. Keep new work in that idiom rather than half-converting sections to utilities.

`globals.css` holds the two things inline styles cannot express:

- the `@keyframes` (`petalFall`, `marqueeL`/`marqueeR`, `shakeX`, `twinkle`, `pulseSoft`, `swayY`, `caret`, `cardIn`)
- interaction states. The source design encoded these as `style-hover` / `style-active` / `style-focus` attributes, which React has no equivalent for — they became the classes `.keypad-key`, `.field`, `.send-button`, `.play-button`, `.wish-card`, `.marquee-row`.

The palette lives as `:root` custom properties (`--blush --rose --deep --cream --ink --gold`) re-exported through `@theme inline`. Fonts are `next/font/google` (Playfair Display / Quicksand / Space Grotesk) exposed as `--font-playfair` etc., so inline `font:` shorthands reference those variables. This page is deliberately single-theme pink — there is no dark mode.

## Architecture

One page (`app/page.tsx`) renders `components/birthday-experience.tsx`, the client root that owns the **access mode** — the concept the whole site hangs off:

- `"pacar"` — unlocked with the PIN, sees everything
- `"teman"` — entered via "Masuk sebagai Teman", **skips the mood board and video sections**
- `null` — locked, lock screen covers the page and `body` scroll is disabled

Mode persists in `sessionStorage`, so a refresh doesn't re-lock. Partner-only sections are gated by not rendering at all, so they never reach a guest's HTML.

Two scroll effects are driven by direct DOM writes inside `useEffect` rather than React state, because they run per animation frame:

- `journey-gallery.tsx` — five `position: sticky` panels stacked on each other; a rAF-throttled scroll handler writes `transform`/`filter`/`borderRadius` per panel and lights the progress dots. The video section is passed in as `children` so it joins the same sticky stack.
- captions and mood-board cards reveal via `IntersectionObserver`.

`lib/content.ts` is the single place all copy and media paths live — every photo, caption, track and the PIN. It exists so filling in real content never means touching component code. Media flows through `components/media-slot.tsx`, which renders a themed placeholder while a `src` is empty (this replaced the design's `<image-slot>` web component).

Guestbook is realtime Firestore (`onSnapshot`) with a local-state fallback when Firebase env vars are absent. `lib/moderation.ts` filters profanity before submit; `?admin=<NEXT_PUBLIC_ADMIN_KEY>` reveals delete buttons.

## Gotchas

- **`react-hooks/set-state-in-effect` is an error, not a warning.** Reading browser-only state (sessionStorage, query string, `matchMedia`) and calling `setState` in an effect fails lint. Use `lib/use-client-value.ts` (a `useSyncExternalStore` wrapper) instead — it is SSR-safe and returns `serverFallback` during prerender.
- Background music starts on unlock, because that keypress is the user gesture browsers require for autoplay. Don't move playback earlier.
- `howler` and `framer-motion` are in `package.json` but unused — audio is a plain `<audio>` element, animation is CSS. `howler` also ships no types, so importing it under `strict` fails until `@types/howler` is added.
- The `@/*` alias maps to the repo root: `@/lib/content`, `@/components/...`.
- The PIN gate is client-side only — full page text is in the HTML before unlock. That's accepted (PRD §9 calls it a UX gate, not security), but don't put anything genuinely private behind it.
