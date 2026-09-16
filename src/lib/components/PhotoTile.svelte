<script lang="ts">
import type { LifePhoto } from '$lib/types';

let { photo, i = 0 }: { photo: LifePhoto; i?: number } = $props();

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
/** Hung between 84% and 100% of the column, so sizes stay uneven. */
const size = $derived(+(0.84 + seeded(`w${key}`) * 0.16).toFixed(3));
</script>

<figure class="vintage-print" style="--tilt: {tilt}deg; --size: {size}">
	<span class="vintage-print__frame">
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
	</span>
	<figcaption class="vintage-print__caption font-mono">{photo.caption}</figcaption>
</figure>
