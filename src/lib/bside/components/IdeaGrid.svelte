<script lang="ts">
	import IdeaSingleton from './IdeaSingleton.svelte';

	interface Project {
		name: string;
		tagline: string;
		excerpt: string;
		link: string;
		image: string;
		impact: string[];
		stack: string[];
	}

	let { projects, maxItems = 4 }: { projects: Project[]; maxItems?: number } = $props();

	// Limit projects to maxItems for 2x2 grid
	const displayProjects = projects.slice(0, maxItems);
</script>

<!-- <div class="grid grid-cols-1 md:grid-cols-2 mx-auto gap-6"> -->
<div class="mx-auto grid grid-cols-1 gap-6">
	{#each displayProjects as project, i}
		<IdeaSingleton {project} />
	{/each}
</div>
