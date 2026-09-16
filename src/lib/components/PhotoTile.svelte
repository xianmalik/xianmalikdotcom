<script lang="ts">
import type { LifePhoto } from '$lib/types';

let {
	photo,
	i = 0,
	open = false,
	ontoggle
}: { photo: LifePhoto; i?: number; open?: boolean; ontoggle?: (n: number) => void } = $props();

/** A stable number in 0..1 from a string.
 *  Math.random() would give a different answer on the server than in the
 *  browser, so every print would jump the moment the page hydrated. */
function seeded(key: string): number {
	let h = 2166136261;
	for (let n = 0; n < key.length; n++) {
		h ^= key.charCodeAt(n);
		h = Math.imul(h, 16777619);
	}
	return ((h >>> 0) % 10000) / 10000;
}

const key = $derived(`${photo.src}|${photo.caption}|${i}`);
/** Off the level by up to 1.6°, never square to the page. */
const tilt = $derived(photo.tilt ?? +((seeded(key) * 2 - 1) * 1.6).toFixed(2));
/** Hung between 72% and 88% of the column, so sizes stay uneven. */
const size = $derived(+(0.72 + seeded(`w${key}`) * 0.16).toFixed(3));

const under = $derived(photo.stack ?? []);

let el = $state<HTMLElement | null>(null);
/** Which way the pile opens, in radians. Measured when it opens: a pile in
 *  the left column throws its prints right, one at the bottom throws up —
 *  always toward the middle of the screen, so nothing lands off it. */
let fan = $state(-Math.PI / 2);

$effect(() => {
	if (!open || !el) return;
	const r = el.getBoundingClientRect();
	fan = Math.atan2(
		window.innerHeight / 2 - (r.top + r.height / 2),
		window.innerWidth / 2 - (r.left + r.width / 2)
	);
});

/** Where each print underneath sits, closed and open. Both are seeded off
 *  the file name, so a print always lands the same way, and both scatter in
 *  their own direction rather than alternating left/right. */
const layers = $derived(
	under.map((layer, n) => {
		const a = seeded(`a${layer.src}${n}${i}`);
		const b = seeded(`b${layer.src}${n}${i}`);
		const c = seeded(`c${layer.src}${n}${i}`);

		// closed: a nudge in any direction, corners showing
		const restAng = c * Math.PI * 2;
		const restR = 4 + a * 5;

		// open: fanned across an arc pointing at the middle of the screen
		const count = under.length;
		const span = 2.3;
		const step = count > 1 ? span / (count - 1) : 0;
		const ang = fan - span / 2 + step * n + (a - 0.5) * 0.55;
		const dist = 74 + b * 34;

		return {
			...layer,
			rx: `${(Math.cos(restAng) * restR).toFixed(1)}px`,
			ry: `${(Math.sin(restAng) * restR).toFixed(1)}px`,
			rr: `${((a - 0.5) * 7).toFixed(1)}deg`,
			ox: `${(Math.cos(ang) * dist).toFixed(1)}%`,
			oy: `${(Math.sin(ang) * dist * 0.74).toFixed(1)}%`,
			or: `${((b - 0.5) * 26).toFixed(1)}deg`
		};
	})
);
</script>

<figure
	bind:this={el}
	class="vintage-print"
	class:vintage-print--open={open}
	style="--tilt: {tilt}deg; --size: {size}"
>
	<figcaption class="vintage-print__caption font-handwriting">{photo.caption}</figcaption>

	<div class="vintage-stack">
		{#each layers as layer, n}
			<div
				class="vintage-print__frame vintage-stack__under"
				style="--rx: {layer.rx}; --ry: {layer.ry}; --rr: {layer.rr}; --ox: {layer.ox}; --oy: {layer.oy}; --or: {layer.or}; --depth: {layers.length -
					n}"
				aria-hidden="true"
			>
				<img src={layer.src} alt="" width={layer.width} height={layer.height} loading="lazy" />
			</div>
		{/each}

		<button
			type="button"
			class="vintage-print__frame vintage-stack__top"
			aria-expanded={under.length ? open : undefined}
			aria-label={under.length
				? `${photo.caption} — ${under.length + 1} prints. ${open ? 'Close the pile' : 'Spread the pile out'}`
				: photo.caption}
			onclick={() => ontoggle?.(i)}
		>
			<img
				src={photo.src}
				alt={photo.caption}
				width={photo.width}
				height={photo.height}
				loading="lazy"
			/>
			{#if photo.date}
				<span class="vintage-print__date font-mono" aria-hidden="true">{photo.date}</span>
			{/if}
		</button>
	</div>
</figure>
