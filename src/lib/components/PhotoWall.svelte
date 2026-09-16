<script lang="ts">
import type { LifePhoto } from '$lib/types';
import PhotoTile from './PhotoTile.svelte';

let { photos }: { photos: LifePhoto[] } = $props();
</script>

<div class="photo-wall">
	{#each photos as photo, i}
		<PhotoTile {photo} {i} />
	{/each}
</div>
