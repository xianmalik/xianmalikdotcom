<script lang="ts">
import type { LifePhoto } from '$lib/types';
import PhotoTile from './PhotoTile.svelte';

let { photos }: { photos: LifePhoto[] } = $props();

let openIndex = $state<number | null>(null);

function toggle(n: number) {
	openIndex = openIndex === n ? null : n;
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

<div class="photo-wall">
	{#each photos as photo, i}
		<PhotoTile {photo} {i} open={openIndex === i} ontoggle={toggle} />
	{/each}
</div>
