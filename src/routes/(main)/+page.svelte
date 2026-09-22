<script lang="ts">
import InfiniteGrid from '$lib/site/InfiniteGrid.svelte';
import projects from '$lib/site/content/projects.json';
</script>

<svelte:head>
	<title>Malik Zubayer Ul Haider</title>
</svelte:head>

<section class="relative h-dvh overflow-hidden">
	<InfiniteGrid {projects} />

	<div class="pointer-events-none absolute inset-0 grid place-items-center p-4">
		<div class="border border-ivory/20 px-8 py-6 sm:px-12 sm:py-8">
			<h1 class="text-center text-[clamp(1.75rem,3.5vw,3.25rem)] leading-none uppercase">
				Malik<br />Zubayer
			</h1>
		</div>
	</div>
</section>
