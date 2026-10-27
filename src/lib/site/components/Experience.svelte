<script lang="ts">
import { experience, skills } from '$lib/site/content/content.json';
import { reveal } from '$lib/site/reveal';
import SectionHead from './SectionHead.svelte';
</script>

<section id="experience" class="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
	<SectionHead index="02" title="Experience" aside="Corporate since 2020, freelance since 2015" />

	<ol>
		{#each experience as job, i}
			<li
				use:reveal={i * 60}
				class="row grid gap-2 border-b border-ivory/15 py-7 md:grid-cols-[180px_1fr_1.25fr] md:items-baseline md:gap-8 md:py-9"
			>
				<span class="text-[11px] tracking-[0.16em] text-ivory/50 uppercase">{job.dates}</span>
				<div>
					<p class="font-display text-3xl tracking-[-0.02em] md:text-4xl">{job.role}</p>
					<p class="mt-1 text-[15px] text-signal">{job.company}</p>
				</div>
				<p class="max-w-[52ch] text-base leading-relaxed text-ivory/65">{job.note}</p>
			</li>
		{/each}
	</ol>
</section>

<section id="stack" class="mx-auto max-w-[1320px] px-5 pb-20 md:px-10 md:pb-32">
	<SectionHead index="03" title="Stack" aside="TypeScript end to end, Python where the ML lives" />

	<div class="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
		{#each skills as group, i}
			<div use:reveal={i * 80}>
				<p class="text-[11px] tracking-[0.16em] text-ivory/50 uppercase">{group.group}</p>
				<ul class="mt-4 space-y-1">
					{#each group.items as item}
						<li class="font-display text-2xl md:text-3xl">{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<style>
	.row {
		transition: background-color 0.3s ease;
	}

	@media (hover: hover) {
		.row:hover {
			background-color: rgb(250 249 246 / 3%);
		}
	}
</style>
