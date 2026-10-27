/** Fades an element up the first time it scrolls into view. Pass a delay in ms to stagger siblings. */
export function reveal(node: HTMLElement, delay = 0) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	node.classList.add('reveal');
	node.style.setProperty('--reveal-delay', `${delay}ms`);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.classList.add('reveal--in');
				observer.disconnect();
			}
		},
		{ rootMargin: '0px 0px -8% 0px' }
	);
	observer.observe(node);

	return {
		destroy: () => observer.disconnect()
	};
}
