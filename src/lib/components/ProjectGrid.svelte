<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte';
	import ProjectSingleton from './ProjectSingleton.svelte';

	interface Project {
		name: string;
		excerpt: string;
		link: string;
		image: string;
		stack: string[];
	}

	let { projects }: { projects: Project[] } = $props();

	// Limit projects to maxItems for 2x2 grid
  let options = { loop: true }
</script>

<div class="embla overflow-visible" use:emblaCarouselSvelte="{{ options, plugins: [] }}">
	<div class="embla__container flex">
		{#each projects as project, i}
			<div class="embla__slide p-4 min-w-0 flex-none basis-1/4">
				<ProjectSingleton {project} />
			</div>
		{/each}
	</div>
</div>