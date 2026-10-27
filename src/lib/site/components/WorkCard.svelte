<!--
	One project. The panel up top is either a screenshot or, when there isn't one, a
	typographic tile in the project's tone; the details sit underneath.
	`feature` lays it out wide with the case-study breakdown alongside.
-->
<script lang="ts">
import { reveal } from '$lib/site/reveal';
import type { Work } from '$lib/site/types';

interface Props {
	work: Work;
	index: number;
	feature?: boolean;
}

let { work, index, feature = false }: Props = $props();

const number = $derived(String(index + 1).padStart(2, '0'));
// Bar chart on the feature tile. The heights are decoration, not data.
const bars = [34, 52, 41, 66, 48, 78, 58, 88, 62, 94, 71, 84, 56, 90, 76, 98];
</script>

{#snippet panel()}
	<div class="panel panel--{work.tone}" class:panel--feature={feature}>
		{#if work.image}
			<img src={work.image} alt="{work.name} screenshot" loading="lazy" class="panel__shot" />
		{:else}
			<div class="panel__type">
				<span class="text-[11px] tracking-[0.16em] uppercase opacity-60">{work.kind}</span>
				<span class="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.85] tracking-[-0.03em] italic">
					{work.name}
				</span>
			</div>
			{#if feature}
				<div class="panel__bars" aria-hidden="true">
					{#each bars as h, i}
						<span style="--h: {h}%; --i: {i}"></span>
					{/each}
				</div>
			{/if}
		{/if}
		<span class="panel__num">{number}</span>
		{#if work.link}
			<span class="panel__go" aria-hidden="true">↗</span>
		{/if}
	</div>
{/snippet}

<article use:reveal={feature ? 0 : (index % 2) * 120}>
	{#if work.link}
		<a href={work.link} target="_blank" rel="noopener" class="block" aria-label="Visit {work.name}">
			{@render panel()}
		</a>
	{:else}
		{@render panel()}
	{/if}

	<div class="mt-6 grid gap-6 {feature ? 'md:grid-cols-[1fr_1.2fr] md:gap-16' : ''}">
		<div>
			<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
				<h3 class="text-4xl tracking-[-0.02em] md:text-5xl">{work.name}</h3>
				<span class="text-[11px] tracking-[0.16em] text-ivory/50 uppercase">
					{work.client} · {work.year}
				</span>
			</div>
			<p class="mt-3 max-w-[48ch] text-lg leading-snug text-ivory/65">{work.summary}</p>
			<ul class="mt-5 flex flex-wrap gap-2">
				{#each work.stack as tech}
					<li class="rounded-full border border-ivory/15 px-3 py-1 text-xs text-ivory/70">{tech}</li>
				{/each}
			</ul>
		</div>

		{#if feature && (work.problem || work.impact)}
			<div class="grid gap-6 sm:grid-cols-2">
				{#if work.problem}
					<div>
						<p class="text-[11px] tracking-[0.16em] text-signal uppercase">Problem</p>
						<p class="mt-2 text-[15px] leading-relaxed text-ivory/70">{work.problem}</p>
					</div>
				{/if}
				{#if work.approach}
					<div>
						<p class="text-[11px] tracking-[0.16em] text-signal uppercase">Approach</p>
						<p class="mt-2 text-[15px] leading-relaxed text-ivory/70">{work.approach}</p>
					</div>
				{/if}
				{#if work.impact}
					<div class="grid grid-cols-2 gap-4 border-t border-ivory/15 pt-5 sm:col-span-2">
						{#each work.impact as metric}
							<div>
								<p class="font-display text-6xl tracking-[-0.03em]">{metric.value}</p>
								<p class="mt-1 text-[11px] tracking-[0.16em] text-ivory/50 uppercase">
									{metric.label}
								</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</article>

<style>
	.panel {
		position: relative;
		overflow: hidden;
		aspect-ratio: 4 / 3;
		border-radius: 18px;
		isolation: isolate;
	}

	.panel--feature {
		aspect-ratio: 16 / 8;
	}

	@media (max-width: 767px) {
		.panel--feature {
			aspect-ratio: 4 / 3;
		}
	}

	.panel--ink {
		background: var(--color-smoke);
		box-shadow: inset 0 0 0 1px rgb(250 249 246 / 8%);
	}

	.panel--signal {
		background: var(--color-signal);
		color: var(--color-canvas);
	}

	.panel--paper {
		background: var(--color-ivory);
		color: var(--color-canvas);
	}

	/* faint engineering grid behind the typographic tiles */
	.panel--ink::before,
	.panel--signal::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background-image:
			linear-gradient(to right, rgb(250 249 246 / 6%) 1px, transparent 1px),
			linear-gradient(to bottom, rgb(250 249 246 / 6%) 1px, transparent 1px);
		background-size: 48px 48px;
		mask-image: radial-gradient(120% 90% at 70% 30%, #000 30%, transparent 85%);
	}

	.panel--signal::before {
		background-image:
			linear-gradient(to right, rgb(26 28 26 / 10%) 1px, transparent 1px),
			linear-gradient(to bottom, rgb(26 28 26 / 10%) 1px, transparent 1px);
	}

	.panel__shot {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: left top;
		transition: transform 0.9s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.panel__type {
		position: absolute;
		left: clamp(20px, 4vw, 40px);
		right: clamp(20px, 4vw, 40px);
		bottom: clamp(20px, 4vw, 36px);
		display: flex;
		flex-direction: column;
		gap: 14px;
		transition: transform 0.9s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.panel__bars {
		position: absolute;
		top: 14%;
		right: clamp(20px, 4vw, 40px);
		width: min(46%, 520px);
		height: 50%;
		display: flex;
		align-items: flex-end;
		gap: 6px;
	}

	.panel__bars span {
		flex: 1;
		height: var(--h);
		border-radius: 3px 3px 0 0;
		background: linear-gradient(to top, rgb(250 249 246 / 6%), rgb(250 249 246 / 26%));
		transform-origin: bottom;
		animation: grow 1.2s cubic-bezier(0.19, 1, 0.22, 1) both;
		animation-delay: calc(var(--i) * 45ms + 200ms);
	}

	.panel__bars span:nth-last-child(-n + 3) {
		background: var(--color-signal);
	}

	@keyframes grow {
		from {
			transform: scaleY(0);
		}
	}

	.panel__num {
		position: absolute;
		top: 18px;
		left: 20px;
		font-size: 11px;
		letter-spacing: 0.16em;
		opacity: 0.6;
	}

	.panel__go {
		position: absolute;
		top: 14px;
		right: 14px;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--color-canvas);
		color: var(--color-ivory);
		font-size: 18px;
		transform: scale(0.6) rotate(-45deg);
		opacity: 0;
		transition:
			transform 0.45s cubic-bezier(0.23, 1, 0.32, 1),
			opacity 0.3s ease;
	}

	a:hover .panel__go,
	a:focus-visible .panel__go {
		transform: none;
		opacity: 1;
	}

	a:hover .panel__shot {
		transform: scale(1.04);
	}

	a:hover .panel__type {
		transform: translateY(-6px);
	}

	a:focus-visible {
		outline: none;
	}

	a:focus-visible .panel {
		outline: 3px solid var(--color-signal);
		outline-offset: 4px;
	}

	@media (prefers-reduced-motion: reduce) {
		.panel__bars span {
			animation: none;
		}
	}
</style>
