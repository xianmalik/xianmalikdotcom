<script lang="ts">
	import { portfolio } from '$content/sections.json';
	import projects from '$content/projects.json';
	import Button from '$lib/components/Button.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
</script>

<div class="py-8 mx-auto overflow-hidden">
	<div class="px-8 border-y border-[#00002D]/10">
		<div class="w-full py-12 h-full mx-auto">
			<!-- Section Heading -->
			<div class="flex flex-col items-center justify-center text-center font-sans mb-4 max-w-[840px] mx-auto">
				<div class="font-display text-4xl md:text-9xl lowercase">
					{portfolio.title}
				</div>
				<div class="font-handwriting text-3xl text-gray-500 -mt-2 mb-2 -rotate-1">
					{portfolio.subtitle}
				</div>
			</div>
			<!-- Projects Grid -->
			<div class="px-8 mb-8">
				<ProjectGrid {projects} />
			</div>
			<!-- CTA Button -->
			<div class="text-center">
				<Button
					href={portfolio.cta.link}>
					{portfolio.cta.text}
				</Button>
			</div>
		</div>
	</div>
</div>
