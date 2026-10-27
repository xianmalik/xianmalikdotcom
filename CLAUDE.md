# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with SvelteKit, TypeScript, and TailwindCSS v4. The site is deployed on Vercel and uses a content-driven architecture with JSON files.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server (or use `bun run dev`)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run Svelte type checking
- `npm run check:watch` - Run type checking in watch mode

### Code Quality
- `npm run lint` - Run Biome linter checks
- `npm run format` - Format code with Biome (auto-fix)
- `npm run format:check` - Check code formatting without modifying files

## Code Style and Formatting

The project uses Biome for linting and formatting with the following conventions:
- **Indentation**: Tabs (width 1)
- **Line width**: 100 characters
- **Quotes**: Single quotes for JavaScript/TypeScript
- **Semicolons**: Always required
- **Trailing commas**: None
- **Arrow parentheses**: Always use parentheses
- **Bracket spacing**: Enabled
- **Line endings**: LF (Unix-style)

### Svelte-Specific Rules
Special overrides for `.svelte` files to work with Svelte's template syntax:
- `noUnusedVariables`: Disabled (Svelte props used in templates may appear unused)
- `noDoubleEquals`: Disabled (common in Svelte template expressions)
- `useConst`: Disabled (conflicts with Svelte's reactive declarations)
- `noExplicitAny`: Disabled globally
- `noNonNullAssertion`: Disabled (safe in Svelte component context)

Always run `npm run format` before committing code.

## Architecture

### Two sites, one repo
- **New site** (xianmalik.com): `src/routes/(main)/`, styled by `src/app.css`. A fresh design, sharing nothing with the old site. Background `bg-canvas` (#1A1C1A), text `text-ivory` (#FAF9F6). Headings use `font-display` (PP Editorial Old: weights 200/400/800, each with an italic) and body text uses `font-sans` (PP Neue Montreal). Font files live in `static/site/fonts/`. Its code lives in `src/lib/site/`. The home page is one fullscreen section: the name in a box over `InfiniteGrid.svelte`, an endless wall of project tiles laid on the inside of a globe with CSS 3D (about 6 across on desktop, 4 on tablets, 2.5 on phones). It reuses a fixed set of tiles and wraps them around the edges. Tiles come from `src/lib/site/content/projects.json`; add an `image` to a project to replace its colored placeholder.
- **B-side** (bside.xianmalik.com, also served at `/bside`): the old site. Its routes are in `src/routes/bside/`. Everything else it uses (blocks, components, content, fonts, its own `app.css`) is in `src/lib/bside/`. Don't import `$lib/bside` from the new site.
- Below the grid, side A is a scrolling portfolio: Intro, Marquee, Work, Experience (+ Stack) and Contact, all in `src/lib/site/components/`, with copy in `src/lib/site/content/content.json` (sourced from the Arcanum vault and the Folia resume; only attach a metric to the project it came from). Accent `text-signal` (#FF5A36), raised surface `bg-smoke`. `$lib/site/reveal.ts` is the scroll-in action.
- Each side has its own `SideSwitch.svelte` linking to the other. Links from the B-side to side A go through `sideA()` in `src/lib/bside/sideA.ts`, which drops the `bside.` subdomain so the reroute doesn't send them back.
- The B-side is the fun-and-games side: Summary, Play (`PlayBlock` — the Web Audio `SwitchTester` keyboard and a hobby shelf from `content/play.json`), the reel, About, Footer. `ProjectBlock` and `IdeaBlock` are kept but no longer rendered.
- `src/hooks.ts` reroutes any `bside.*` host to `/bside`. To try it locally, open `http://bside.localhost:5173`.
- Each stylesheet scans only its own site's files for Tailwind classes (`@source` rules), so utilities and theme tokens stay separate.

The sections below describe the b-side.

### Content-Driven Design
The site is built around a content-first architecture where all site content is stored in JSON files in `src/lib/bside/content/`:
- `sections.json` - Section metadata (summary, portfolio, case_studies, about)
- `projects.json` - Portfolio projects with name, excerpt, link, image, and stack
- `ideas.json` - Case studies and creative ideas

### Component Structure
The architecture follows a block-based layout pattern:
- **Blocks** (`src/lib/bside/blocks/`) - Full-width page sections (SummaryBlock, ProjectBlock, IdeaBlock, AboutBlock)
- **Components** (`src/lib/bside/components/`) - Reusable UI components (Button, ProjectGrid, IdeaGrid, etc.)
- **Routes** - Single-page application with `+page.svelte` composing blocks

The b-side page (`src/routes/bside/+page.svelte`) imports and renders blocks in sequence.

### Path Aliases
`$lib` → `src/lib` (SvelteKit default, also declared in `svelte.config.js`):
```typescript
import { summary } from '$lib/bside/content/sections.json';
import Button from '$lib/bside/components/Button.svelte';
```

### Styling Architecture
- **TailwindCSS v4** via Vite plugin (no separate config file needed)
- **Global styles** in `src/lib/bside/app.css` with CSS custom properties
- **Custom fonts**: InstrumentSerif (display + serif), Karla (sans, variable), JetBrainsMono (mono), ArchitectsDaughter (handwriting)
- **Custom colors**: `--color-surface: #212121` (site background, `bg-surface`), `--color-ink: #f5e1cd` (text and borders, `text-ink` / `border-ink`), `--color-shade: #80808D` (`text-shade` / `bg-shade`)
- **Canvas layout**: Fixed background canvas with centered content area (842px max width with border guides)

### Svelte 5 Features
This project uses Svelte 5 with the new runes API:
- Use `$props()` for component props instead of `export let`
- Use `{@render children?.()}` for slot content
- Refer to Svelte 5 migration patterns when updating components

## Configuration Files

### SvelteKit Configuration (`svelte.config.js`)
- Adapter: `@sveltejs/adapter-vercel` for Vercel deployment
- Prerendering: HTTP errors set to 'warn' level
- Preprocessor: `vitePreprocess()` for TypeScript/SCSS support

### Vite Configuration (`vite.config.ts`)
Plugins in order:
1. `@tailwindcss/vite` - TailwindCSS v4 integration
2. `@sveltejs/kit/vite` - SvelteKit
3. `vite-plugin-devtools-json` - Development tooling

### TypeScript Configuration
- Extends `./.svelte-kit/tsconfig.json`
- Strict mode enabled
- Module resolution: `bundler`
- JSON imports enabled (`resolveJsonModule`)

## Adding Content

### Adding a New Project
Edit `src/lib/bside/content/projects.json` and add an object with:
```json
{
  "name": "Project Name",
  "excerpt": "Short description",
  "link": "https://example.com",
  "image": "/projects/image.png",
  "stack": ["Technology1", "Technology2"]
}
```

Images should be placed in `static/projects/`.

### Modifying Section Content
Edit `src/lib/bside/content/sections.json` to update section titles, subtitles, and CTAs for summary, portfolio, case_studies, and about sections.

## Deployment

The project is configured for Vercel deployment via `@sveltejs/adapter-vercel`. The build command is `npm run build` and output is in `.vercel/output`.
