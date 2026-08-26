<script lang="ts">
	import { case_studies } from '$content/sections.json';
	import ideas from '$content/ideas.json';
	import IdeaGrid from '$lib/components/IdeaGrid.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<div class="py-8 mx-auto">
	<div class="px-8 border-y border-[#00002D]/10">
		<div class="w-full max-w-[840px] bg-[url('/gray-bg.jpg')] bg-cover py-12 h-full mx-auto">
			<!-- Section Heading -->
			<div class="flex flex-col items-center justify-center text-center font-sans mb-8">
				<div class="font-display text-4xl md:text-9xl lowercase">
					{case_studies.title}
				</div>
				<div class="font-handwriting text-3xl text-gray-500 -mt-2 mb-2 -rotate-1">
					{case_studies.subtitle}
				</div>
			</div>

			<!-- Ideas Grid -->
			<div class="px-8 mb-10">
				<IdeaGrid projects={ideas} maxItems={4} />
			</div>

			<!-- CTA Button -->
			<div class="text-center">
				<Button
					href={case_studies.cta.link}>
					{case_studies.cta.text}
				</Button>
			</div>
		</div>
	</div>
</div>
