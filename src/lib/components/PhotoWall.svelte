<script lang="ts">
import type { LifePhoto } from '$lib/types';
import PhotoTile from './PhotoTile.svelte';

let { photos }: { photos: LifePhoto[] } = $props();

let openIndex = $state<number | null>(null);
/** The doodle is a hint — once a pile has been opened it has done its job. */
let hinted = $state(false);

function toggle(n: number) {
	openIndex = openIndex === n ? null : n;
	hinted = true;
}

function onKeydown(e: KeyboardEvent) {
	if (e.key === 'Escape') openIndex = null;
}
</script>

<svelte:window onkeydown={onKeydown} />

<!-- Everything behind the opened pile goes soft. Clicking it puts the pile
     back down. -->
<div
	class="stack-scrim"
	class:stack-scrim--lit={openIndex !== null}
	onclick={() => (openIndex = null)}
	aria-hidden="true"
></div>

<!-- The wrapper is what the note in the margin is positioned against -->
<div class="photo-wall-wrap">
	<!-- Scribbled in the side margin, looping round and pointing in at the
	     piles. One stroke, drawn in pencil. -->
	<div class="click-hint" class:click-hint--done={hinted} aria-hidden="true">
		<span class="click-hint__label font-handwriting">click the image</span>
		<svg class="click-hint__arrow" viewBox="0 0 118 150" fill="none" focusable="false">
			<!-- One unbroken stroke: it leaves the end of the label, sweeps back
			     under it, loops, then runs out at the photographs. Sampled from a
			     lead-in curve, a 350° circle and a run-out, then refitted as
			     Catmull-Rom beziers so the joins carry no cusp. -->
			<path class="click-hint__stroke" d="M86.0 6.0C85.4 7.1 83.5 10.7 82.2 12.8C80.9 15.0 79.5 17.0 78.1 18.9C76.7 20.8 75.2 22.6 73.6 24.4C72.1 26.2 70.5 27.8 68.8 29.5C67.2 31.1 65.5 32.7 63.8 34.2C62.0 35.8 60.2 37.3 58.4 38.8C56.5 40.4 54.6 41.8 52.7 43.4C50.7 44.9 48.7 46.4 46.7 48.0C44.7 49.6 42.6 51.1 40.5 52.8C38.4 54.5 34.9 56.3 34.0 58.0C33.1 59.7 35.0 61.9 34.9 63.1C34.8 64.4 33.8 64.7 33.4 65.6C33.0 66.5 32.7 67.4 32.5 68.3C32.2 69.2 32.1 70.2 32.0 71.1C32.0 72.1 32.0 73.0 32.1 74.0C32.3 74.9 32.5 75.9 32.8 76.8C33.1 77.7 33.5 78.5 33.9 79.4C34.4 80.2 35.0 81.0 35.6 81.7C36.2 82.4 36.9 83.1 37.6 83.7C38.4 84.3 39.2 84.8 40.0 85.3C40.9 85.7 41.8 86.1 42.7 86.4C43.6 86.6 44.5 86.8 45.5 86.9C46.4 87.0 47.4 87.0 48.3 86.9C49.3 86.9 50.2 86.7 51.1 86.4C52.0 86.2 53.0 85.8 53.8 85.4C54.6 84.9 55.5 84.4 56.2 83.8C57.0 83.3 57.7 82.6 58.3 81.9C58.9 81.2 59.5 80.4 60.0 79.6C60.4 78.7 60.8 77.9 61.2 77.0C61.5 76.1 61.7 75.1 61.8 74.2C62.0 73.2 62.0 72.3 62.0 71.3C61.9 70.4 61.8 69.4 61.6 68.5C61.4 67.6 61.0 66.7 60.7 65.8C60.3 64.9 59.8 64.1 59.2 63.3C58.7 62.5 58.0 61.8 57.4 61.2C56.7 60.5 55.9 59.9 55.1 59.4C54.3 58.9 53.5 58.4 52.6 58.1C51.7 57.7 50.8 57.4 49.8 57.3C48.9 57.1 47.9 57.0 47.0 57.0C46.0 57.0 45.1 57.1 44.1 57.3C43.2 57.5 42.3 57.7 41.4 58.1C40.5 58.4 38.4 58.3 38.9 59.4C39.3 60.5 42.5 62.8 44.2 64.6C45.9 66.4 47.6 68.3 49.2 70.2C50.9 72.2 52.5 74.2 54.1 76.2C55.7 78.3 57.3 80.4 58.9 82.5C60.4 84.7 62.0 86.9 63.6 89.1C65.2 91.4 66.8 93.6 68.4 96.0C70.1 98.3 71.7 100.6 73.4 103.0C75.1 105.4 76.9 107.8 78.7 110.2C80.5 112.6 82.3 115.1 84.3 117.6C86.2 120.0 88.2 122.5 90.3 125.0C92.4 127.5 94.6 130.0 96.8 132.5C99.1 135.0 102.8 138.7 104.0 140.0" />
			<path class="click-hint__stroke" d="M104 140l-16.2-5.1" />
			<path class="click-hint__stroke" d="M104 140l-3.7-16.6" />
		</svg>
	</div>

	<div class="photo-wall">
		{#each photos as photo, i}
			<PhotoTile {photo} {i} open={openIndex === i} ontoggle={toggle} />
		{/each}
	</div>
</div>
