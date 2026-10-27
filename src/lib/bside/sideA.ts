import { browser } from '$app/environment';

/**
 * A link to the main site (side A). On bside.xianmalik.com every path is rerouted into /bside
 * (see src/hooks.ts), so a plain "/" would land back here; drop the subdomain instead.
 */
export function sideA(path = '/'): string {
	if (!browser) return path;
	const { protocol, hostname, port } = window.location;
	if (!hostname.startsWith('bside.')) return path;
	const host = hostname.slice('bside.'.length) + (port ? `:${port}` : '');
	return `${protocol}//${host}${path}`;
}
