<script lang="ts">
import { contact } from '$lib/site/content/content.json';
import SideSwitch from './SideSwitch.svelte';

const year = new Date().getFullYear();
</script>

<section id="contact" class="border-t border-ivory/10">
	<div class="mx-auto max-w-[1320px] px-5 pt-24 pb-10 md:px-10 md:pt-36">
		<p class="text-[11px] tracking-[0.16em] text-signal uppercase">04 — Contact</p>
		<h2 class="mt-6 max-w-[13ch] text-[clamp(3rem,8.4vw,8rem)] leading-[0.9] font-extralight tracking-[-0.03em]">
			{contact.headline}
		</h2>

		<a href="mailto:{contact.email}" class="email mt-12 inline-block font-display italic">
			{contact.email}
			<span aria-hidden="true" class="email__arrow">→</span>
		</a>

		<div class="mt-10 flex flex-wrap gap-3">
			{#each contact.links as link}
				<a
					href={link.href}
					target="_blank"
					rel="noopener"
					class="rounded-full border border-ivory/20 px-5 py-2.5 text-sm transition-colors hover:border-ivory hover:bg-ivory hover:text-canvas"
				>
					{link.label} ↗
				</a>
			{/each}
		</div>

		<!-- The other side of the record -->
		<a
			href="/bside"
			class="flip mt-24 grid items-center gap-6 rounded-3xl border border-ivory/15 p-6 md:mt-32 md:grid-cols-[auto_1fr_auto] md:p-8"
		>
			<span class="record" aria-hidden="true"><span>B</span></span>
			<span>
				<span class="block text-[11px] tracking-[0.16em] text-ivory/50 uppercase">Flip the record</span>
				<span class="mt-1 block font-display text-4xl md:text-5xl">Side B, <i>fun &amp; games</i></span>
				<span class="mt-2 block text-ivory/60">
					Keyboards, a switch tester, the reel, and everything off the clock.
				</span>
			</span>
			<span class="flip__go text-4xl" aria-hidden="true">→</span>
		</a>

		<div
			class="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ivory/15 pt-6 text-[11px] tracking-[0.16em] text-ivory/50 uppercase"
		>
			<span>© {year} Malik Zubayer Ul Haider</span>
			<SideSwitch />
		</div>
	</div>
</section>

<style>
	.email {
		position: relative;
		font-size: clamp(1.75rem, 4.8vw, 4rem);
		overflow-wrap: anywhere;
	}

	.email::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -2px;
		height: 2px;
		background: var(--color-signal);
		transform-origin: left;
		transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.email:hover::after {
		transform: scaleX(0);
		transform-origin: right;
	}

	.email__arrow {
		display: inline-block;
		font-style: normal;
		color: var(--color-signal);
		transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.email:hover .email__arrow {
		transform: translateX(10px);
	}

	.flip {
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;
	}

	.flip:hover {
		background: rgb(250 249 246 / 4%);
		border-color: rgb(250 249 246 / 35%);
	}

	/* A little vinyl that spins up when you point at it */
	.record {
		display: grid;
		place-items: center;
		width: 84px;
		height: 84px;
		border-radius: 50%;
		background:
			radial-gradient(circle, var(--color-signal) 0 22%, transparent 23%),
			repeating-radial-gradient(circle, #111211 0 2px, #1c1e1c 2px 4px);
		box-shadow: 0 0 0 1px rgb(250 249 246 / 12%);
		transition: transform 1.6s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.record span {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 15px;
		color: var(--color-canvas);
	}

	.flip:hover .record {
		transform: rotate(540deg);
	}

	.flip__go {
		transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.flip:hover .flip__go {
		transform: translateX(8px);
	}

	@media (prefers-reduced-motion: reduce) {
		.record,
		.flip__go,
		.email__arrow {
			transition: none;
		}
	}
</style>
