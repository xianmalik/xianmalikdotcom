<script lang="ts">
import type { Project } from '$lib/types';
import ProjectSingleton from './ProjectSingleton.svelte';

let { projects }: { projects: Project[] } = $props();
</script>

<!-- A sheet of prints laid out by hand rather than on a grid -->
<div class="archive-sheet">
	{#each projects as project, i}
		<ProjectSingleton {project} {i} />
	{/each}
</div>
