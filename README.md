<p align="center">
  <img src="./ascii-logo.png" />
</p>
<p align="center">
	<a href="https://svelte.dev/"><img src="https://img.shields.io/badge/Svelte-302D41?style=for-the-badge&logo=svelte&logoColor=FF3E00" /></a>
	<a href="https://kit.svelte.dev/"><img src="https://img.shields.io/badge/SvelteKit-302D41?style=for-the-badge&logo=svelte&logoColor=FF3E00" /></a>
	<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-302D41?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC"/></a>
	<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-302D41?logo=typescript&logoColor=3178C6&style=for-the-badge"/></a>
	<a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-302D41.svg?logo=vercel&logoColor=white&style=for-the-badge" /></a>
	<a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-302D41?style=for-the-badge&logo=vite&logoColor=646CFF" /></a>
</p>

## Features

- ⚡ Built with SvelteKit for optimal performance
- 🎨 Styled with TailwindCSS v4
- 📱 Fully responsive design
- 🔧 TypeScript for type safety
- 📦 Modern build tools with Vite
- 🚀 Deployed on Vercel

## Development

### Prerequisites

- Node.js 22+ or Bun
- npm, yarn, pnpm, or bun

### Getting Started

```bash
# Clone the repository
git clone https://github.com/xianmalik/xianmalikdotcom.git
cd xianmalikdotcom

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

### Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `check` - Run Svelte type checking
- `check:watch` - Run type checking in watch mode
- `lint` - Run Biome linter checks
- `format` - Format code with Biome
- `format:check` - Check code formatting without modifying files

## Project Structure

```
src/
├── app.html          # HTML template
├── app.css           # Global styles
├── content/          # Content data
│   └── summary.json  # Personal information
├── lib/              # Reusable components and utilities
│   ├── assets/       # Static assets
│   └── components/   # Svelte components
└── routes/           # SvelteKit routes
    ├── +layout.svelte
    └── +page.svelte
```

## Deployment

This project is configured for deployment on Vercel with the `@sveltejs/adapter-vercel` adapter.

## License

This project is private and not licensed for public use.
