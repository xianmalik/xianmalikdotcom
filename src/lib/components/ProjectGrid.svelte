<script lang="ts">
	import ProjectSingleton from './ProjectSingleton.svelte';

	interface Project {
		name: string;
		excerpt: string;
		link: string;
		image: string;
		stack: string[];
	}

	let { projects, maxItems = 4 }: { projects: Project[]; maxItems?: number } = $props();

	// Limit projects to maxItems for 2x2 grid
	const displayProjects = projects.slice(0, maxItems);
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
	{#each displayProjects as project, i}
		<ProjectSingleton {project} />
	{/each}
</div>