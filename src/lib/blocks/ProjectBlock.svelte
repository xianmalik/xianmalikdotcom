<script lang="ts">
import { portfolio } from '$content/sections.json';
import projectsData from '$content/projects.json';
import Button from '$lib/components/Button.svelte';
import ProjectGrid from '$lib/components/ProjectGrid.svelte';
import type { Project } from '$lib/types';

// JSON imports widen the literal unions in Frame, so assert the shape once here
const projects = projectsData as Project[];

// Dated like an issue of a printed archive, e.g. ISSUE/7.7.26
const issue = new Date()
	.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'numeric',
		year: '2-digit'
	})
	.replaceAll('/', '.');
</script>

<div id="portfolio" class="mx-auto py-8">
	<div class="mx-auto w-full max-w-[880px] px-6 py-12 md:px-10">
		<!-- Masthead — a strip of small print across the top of the sheet -->
		<div
			class="flex items-baseline justify-between border-b border-ink/15 pb-3 font-mono text-[10px] font-bold tracking-[0.18em] text-ink/70 uppercase"
		>
			<span>Visual Archive</span>
			<span>Issue/{issue}</span>
		</div>

		<!-- Section Heading -->
		<div class="mt-10 mb-2 flex flex-col items-center justify-center text-center font-sans">
			<div class="font-display text-6xl lowercase text-marker md:text-8xl">
				{portfolio.title}
			</div>
			<div class="-mt-1 -rotate-1 font-handwriting text-xl text-ink">
				{portfolio.subtitle}
			</div>
		</div>

		<!-- Prints, laid out across the sheet -->
		<ProjectGrid {projects} />

		<!-- CTA Button -->
		<div class="mt-4 text-center md:mt-0">
			<Button href={portfolio.cta.link}>
				{portfolio.cta.text}
			</Button>
		</div>
	</div>
</div>
