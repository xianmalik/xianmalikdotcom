import type { Reroute } from '@sveltejs/kit';

// bside.xianmalik.com serves the old site, which lives at /bside. Rerouting (not redirecting)
// keeps the subdomain's URLs clean. Matches `bside.localhost` too, for local dev.
export const reroute: Reroute = ({ url }) => {
	if (url.hostname.startsWith('bside.')) {
		return url.pathname === '/' ? '/bside' : `/bside${url.pathname}`;
	}
};
