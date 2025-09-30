<script lang="ts">
	import Button from './Button.svelte';

	interface Project {
		name: string;
		tagline: string;
		excerpt: string;
		link: string;
		image: string;
		stack: string[];
	}

	let { project }: { project: Project } = $props();
</script>

<div class="relative bg-shade/10 aspect-[3/2]">
	<!-- Content -->
	<div class="relative h-full flex flex-col justify-between p-6 text-black">
		<!-- Header Content -->
		<div>
			<div class="flex-1">
				<h2 class="font-display text-xl md:text-2xl font-bold leading-tight">
					{project.name}
				</h2>
				<!-- <p class="text-sm uppercase font-mono text-shade mb-2">
					{project.tagline}
				</p> -->
			</div>
			<p class="font-sans text-sm text-shade/70 mt-2">
				{project.excerpt}
			</p>
		</div>
		
		<!-- Footer Content -->
		<div class="flex justify-between items-center gap-2">
			<!-- Tech Stack -->
			<div class="flex items-center space-x-2 text-sm uppercase font-mono text-shade">
				{project.tagline}
			</div>
			
			<!-- CTA Button -->
			<a 
				href={project.link} 
				target="_blank" 
				rel="noopener noreferrer"
				class="bg-white text-black px-3 py-1 font-mono text-sm leading-4 font-medium hover:bg-shade/10 transition-all duration-300 inline-flex items-center gap-2 hover:gap-3"
			>
				<span>READ MORE</span>
				<span>→</span>
			</a>
		</div>
	</div>

  <span>
    <span class="[&>span]:absolute [&>span]:h-6 [&>span]:w-0.5">
      <span class="top-0 right-0 bg-gradient-to-b from-shade to-transparent"></span>
      <span class="top-0 left-0 bg-gradient-to-b from-shade to-transparent"></span>
      <span class="bottom-0 right-0 bg-gradient-to-t from-shade to-transparent"></span>
      <span class="bottom-0 left-0 bg-gradient-to-t from-shade to-transparent"></span>
    </span>
  
    <span class="[&>span]:absolute [&>span]:h-0.5 [&>span]:w-6">
      <span class="top-0 right-0 bg-gradient-to-l from-shade to-transparent"></span>
      <span class="bottom-0 right-0 bg-gradient-to-l from-shade to-transparent"></span>
      <span class="top-0 left-0 bg-gradient-to-r from-shade to-transparent"></span>
      <span class="bottom-0 left-0 bg-gradient-to-r from-shade to-transparent"></span>
    </span>
  </span>
</div>