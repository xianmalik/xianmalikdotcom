# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog + portfolio site ("Paperhouse") built with SvelteKit, TypeScript, and TailwindCSS v4. It uses a CRT-terminal visual design (green/amber phosphor themes, scanline haze, boot-sequence typing text) and a content-driven architecture with JSON files. The site is deployed on Vercel.

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

### Content-Driven Design
Site content lives in `src/content/`:
- `posts.json` - Blog posts with slug, title, date, excerpt, tags, and body
- `profile.json` - Bio summary, highlight bullets, and contact links rendered on the about page and footer; sourced from the resume YAMLs in `~/gh/folia/source/`

### Component Structure
- **Routes** (`src/routes/`) - `/` (about/home), `/blog` (index with tag filtering), `/blog/[slug]` (post detail)
- **Components** (`src/lib/components/`) - `Nav`, `Footer`, `CrtChrome` (bezel + SVG curvature filter, mounted once in `+layout.svelte`), `PostCard`, `Tag`
- **Theme store** (`src/lib/theme.svelte.ts`) - runes-based singleton toggling `'green' | 'amber'`, read via `data-theme` on each page's `.crt-screen` container

### Path Aliases
Two custom path aliases are configured in `svelte.config.js`:
- `$content` → `src/content` (for JSON content files)
- `$lib` → `src/lib` (for components and utilities)

Use these aliases when importing:
```typescript
import posts from '$content/posts.json';
import Nav from '$lib/components/Nav.svelte';
```

### Styling Architecture
- **TailwindCSS v4** via Vite plugin (no separate config file needed), used for layout utilities
- **Design tokens** in `src/lib/styles/tokens/` (colors, typography, spacing, effects, fonts), imported from `src/app.css`
- **Single font**: Share Tech Mono (`--font-mono`) — thin technical-display strokes, terminal character without the pixel look. Loaded via `<link>` in `src/app.html`; external `@import` in bundled CSS gets dropped mid-file, so don't move it back into a CSS file. One weight (400); `font-synthesis: none` in `tokens/typography.css` disables fake bold — emphasis comes from bright color + glow
- **Theming**: all colors are semantic CSS custom properties (`--text-primary`, `--text-bright`, `--bg-page`, etc.) that get swapped by `[data-theme="amber"]` in `tokens/colors.css`
- **CRT effect classes** (`tokens/effects.css`): `.crt-screen` (fixed, internally-scrolling viewport with barrel-curve SVG filter + phosphor glow), `.crt-bezel` (fixed vignette/scanline overlay), `.crt-haze`, `.crt-glow-text` / `.crt-glow-title` (text bloom), `.cursor-blink`

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

### Adding a New Blog Post
Edit `src/content/posts.json` and add an object with:
```json
{
  "slug": "url-safe-slug",
  "title": "Post Title",
  "date": "YYYY.MM.DD",
  "excerpt": "Short description shown on the blog index",
  "tags": ["tag1", "tag2"],
  "body": "Full post text, rendered with the boot-sequence typing effect"
}
```

The post becomes reachable at `/blog/<slug>` automatically; no route changes needed.

## Deployment

The project is configured for Vercel deployment via `@sveltejs/adapter-vercel`. The build command is `npm run build` and output is in `.vercel/output`.
