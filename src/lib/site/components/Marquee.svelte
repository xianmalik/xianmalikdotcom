<script lang="ts">
import { skills } from '$lib/site/content/content.json';

const items = skills.flatMap((group) => group.items);
</script>

<!-- A band of the stack, running sideways forever; doubled so the loop is seamless -->
<div class="marquee border-y border-ivory/10 py-6" aria-label="Stack: {items.join(', ')}">
	<div class="marquee__track" aria-hidden="true">
		{#each [0, 1] as copy (copy)}
			<ul class="marquee__row">
				{#each items as item, i}
					<li class="flex items-center gap-10 font-display text-3xl md:text-4xl" class:italic={i % 2 === 1}>
						{item}
						<span class="text-signal text-xl">✦</span>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</div>

<style>
	.marquee {
		overflow: hidden;
	}

	.marquee__track {
		display: flex;
		width: max-content;
		animation: slide 56s linear infinite;
	}

	.marquee:hover .marquee__track {
		animation-play-state: paused;
	}

	.marquee__row {
		display: flex;
		gap: 40px;
		padding-right: 40px;
	}

	@keyframes slide {
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee__track {
			animation: none;
		}
	}
</style>
