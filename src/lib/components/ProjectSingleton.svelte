<script lang="ts">
	import Button from './Button.svelte';

	interface Project {
		name: string;
		excerpt: string;
		link: string;
		image: string;
		stack: string[];
	}

	let { project }: { project: Project } = $props();
</script>

<div class="relative bg-cover bg-center rounded-xl overflow-hidden h-80 group hover:scale-[1.02] transition-transform duration-300">
	<!-- Background Image -->
	<div 
		class="absolute inset-0 bg-cover bg-center"
		style="background-image: url('{project.image}')"
	></div>
	
	<!-- Dark Overlay -->
	<div class="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300"></div>
	
	<!-- Content -->
	<div class="relative h-full flex flex-col justify-between p-6 text-white">
		<!-- Header Content -->
		<div class="flex-1 flex flex-col justify-center">
			<h2 class="font-display text-3xl md:text-4xl font-bold mb-2 leading-tight">
				{project.name}
			</h2>
			<p class="font-sans text-sm md:text-base uppercase tracking-wider text-gray-200 mb-6">
				{project.excerpt}
			</p>
		</div>
		
		<!-- Footer Content -->
		<div class="flex justify-between items-end">
			<!-- Tech Stack -->
			<div class="flex items-center space-x-1 text-xs uppercase font-sans tracking-wider text-gray-300">
				{#each project.stack as tech, i}
					<span>{tech}</span>
					{#if i < project.stack.length - 1}
						<span class="text-gray-400">|</span>
					{/if}
				{/each}
			</div>
			
			<!-- CTA Button -->
			<a 
				href={project.link} 
				target="_blank" 
				rel="noopener noreferrer"
				class="inline-flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-md font-sans text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
			>
				<span>READ MORE</span>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</a>
		</div>
	</div>
</div>