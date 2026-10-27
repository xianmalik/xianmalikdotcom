<!-- The pitch, straight after the grid: one big statement, a line of detail, and the numbers -->
<script lang="ts">
import { hero } from '$lib/site/content/content.json';
import { reveal } from '$lib/site/reveal';
</script>

<section class="mx-auto max-w-[1320px] px-5 pt-24 pb-16 md:px-10 md:pt-36 md:pb-24">
	<p class="text-[11px] tracking-[0.16em] text-ivory/50 uppercase" use:reveal>{hero.eyebrow}</p>

	<h2
		class="mt-8 text-[clamp(2.9rem,8.6vw,8.25rem)] leading-[0.92] font-extralight tracking-[-0.03em]"
		use:reveal={80}
	>
		{#each hero.headline as line, i}
			<span class="block" class:last={i === hero.headline.length - 1}>{line}</span>
		{/each}
	</h2>

	<div class="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1.1fr_1fr] md:items-end" use:reveal={160}>
		<p class="max-w-[36ch] text-xl leading-[1.5] text-ivory/70 md:text-[22px]">{hero.lede}</p>
		<div class="flex flex-wrap gap-3 md:justify-end">
			<a href="#work" class="btn btn--solid">See selected work <span aria-hidden="true">↓</span></a>
			<a href="#contact" class="btn btn--ghost">Get in touch</a>
		</div>
	</div>

	<dl class="mt-16 grid grid-cols-2 border-t border-ivory/15 md:mt-24 md:grid-cols-4">
		{#each hero.stats as stat, i}
			<div class="stat py-6 md:py-8" use:reveal={i * 80}>
				<dd class="font-display text-6xl tracking-[-0.03em] md:text-7xl">{stat.value}</dd>
				<dt class="mt-2 text-[11px] tracking-[0.16em] text-ivory/50 uppercase">{stat.label}</dt>
			</div>
		{/each}
	</dl>
</section>

<style>
	.last {
		font-style: italic;
		font-weight: 800;
		color: var(--color-signal);
	}

	.stat {
		display: flex;
		flex-direction: column;
	}

	.stat:nth-child(even) {
		padding-left: 20px;
		border-left: 1px solid rgb(250 249 246 / 15%);
	}

	@media (min-width: 768px) {
		.stat {
			padding-left: 28px;
		}

		.stat:first-child {
			padding-left: 0;
		}

		.stat + .stat {
			border-left: 1px solid rgb(250 249 246 / 15%);
		}
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		border-radius: 999px;
		padding: 16px 26px;
		font-size: 16px;
		font-weight: 500;
		transition:
			background-color 0.25s ease,
			color 0.25s ease,
			border-color 0.25s ease;
	}

	.btn--solid {
		background: var(--color-ivory);
		color: var(--color-canvas);
	}

	.btn--solid:hover {
		background: var(--color-signal);
	}

	.btn--ghost {
		border: 1px solid rgb(250 249 246 / 25%);
	}

	.btn--ghost:hover {
		border-color: var(--color-ivory);
	}
</style>
