<script lang="ts">
import content from '$lib/site/content/content.json';
import type { Work } from '$lib/site/types';
import SectionHead from './SectionHead.svelte';
import WorkCard from './WorkCard.svelte';

const [feature, ...rest] = content.work as Work[];
</script>

<section id="work" class="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-32">
	<SectionHead index="01" title="Selected work" aside="Problem → approach → impact, where the numbers are real" />

	<div class="mt-12 md:mt-16">
		<WorkCard work={feature} index={0} feature />
	</div>

	<div class="mt-20 grid gap-x-10 gap-y-20 md:mt-28 md:grid-cols-2">
		{#each rest as work, i}
			<!-- the right-hand column sits lower, so the two never line up into a plain grid -->
			<div class={i % 2 === 1 ? 'md:mt-28' : ''}>
				<WorkCard {work} index={i + 1} />
			</div>
		{/each}
	</div>
</section>
