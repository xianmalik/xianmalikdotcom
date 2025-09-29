<script lang="ts">
	import content from '$content/portfolio.json';
	import projects from '$content/projects.json';
	import Button from '$lib/components/Button.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
</script>

<div class="py-8 mx-auto">
	<div class="px-8 border-y border-[#00002D]/10">
		<div class="w-full max-w-[840px] py-12 h-full bg-[url('/gray-bg.jpg')] bg-cover mx-auto">
			<!-- Section Heading -->
			<div class="flex flex-col items-center justify-center text-center font-sans mb-12">
				<div class="font-display text-4xl md:text-9xl lowercase">
					{content.title}
				</div>
				<div class="font-handwriting text-3xl text-gray-500 -mt-2 mb-6 -rotate-1">
					{content.subtitle}
				</div>
			</div>
			<!-- Projects Grid -->
			<div class="px-8 mb-12">
				<ProjectGrid {projects} maxItems={4} />
			</div>

			<!-- CTA Button -->
			<div class="text-center">
				<Button
					href={content.cta.link}>
					{content.cta.text}
				</Button>
			</div>
		</div>
	</div>
</div>
