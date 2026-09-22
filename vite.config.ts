import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// WSL can't watch files on a Windows drive (/mnt/c/...), so edits made from Windows
// never reach Vite. Poll for changes there instead.
const onWindowsDrive = process.env.WSL_DISTRO_NAME && process.cwd().startsWith('/mnt/');

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	server: {
		watch: onWindowsDrive ? { usePolling: true, interval: 300 } : undefined
	}
});
