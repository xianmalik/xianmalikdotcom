<script lang="ts">
	interface Project {
		name: string;
		excerpt: string;
		link: string;
		image: string;
		stack: string[];
		bg?: string;
	}

	let { project }: { project: Project } = $props();
</script>

<div class="relative bg-cover bg-center rounded-xl overflow-hidden group transition-transform duration-300 aspect-square">
	<!-- Background Image -->
	<!-- <div 
		class="absolute inset-0 bg-cover bg-center"
		style="background-image: url('{project.image}')"
	></div> -->
	
	<!-- Dark Overlay -->
	<!-- <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent transition-colors duration-300"></div> -->
	
	<!-- Content -->
	<div class="relative h-full flex bg-[#1F1D2B] flex-col justify-between p-6 text-white">
		<!-- Header Content -->
		<div class="">
			<h2 class="font-serif text-2xl md:text-3xl font-medium mb-0 leading-tight">
				{project.name}
			</h2>
			<p class="font-mono uppercase text-xs md:text-sm tracking-wider text-gray-200">
				{project.excerpt}
			</p>
		</div>
		
		<!-- Image -->
		<div class="w-full relative">
			<img src="{project.image}" alt="{project.name}" class="max-w-full" />
		</div>
		
		<!-- Footer Content -->
		<div class="flex justify-between items-center">
			<!-- Tech Stack -->
			<div class="flex items-center space-x-2 text-xs uppercase font-mono text-white">
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
				class="bg-white text-black px-3 py-1 font-mono text-sm leading-4 font-medium hover:bg-gray-100 transition-colors duration-200"
			>
				<span>VIEW PROJECT →</span>
				<!-- <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg> -->
			</a>
		</div>
	</div>
</div>