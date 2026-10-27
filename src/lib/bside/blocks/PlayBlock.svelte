<script lang="ts">
import play from '$lib/bside/content/play.json';
import SwitchTester from '$lib/bside/components/SwitchTester.svelte';
</script>

<div id="play" class="mx-auto py-8">
	<div class="mx-auto w-full max-w-[1040px] px-6 pt-12 pb-12 md:px-10">
		<!-- Section Heading -->
		<div class="mb-12 flex flex-col items-center justify-center text-center font-sans">
			<div class="font-display text-6xl lowercase text-marker md:text-8xl">{play.title}</div>
			<div class="-mt-1 -rotate-1 font-handwriting text-xl text-ink">{play.subtitle}</div>
		</div>

		<SwitchTester />

		<!-- The shelf: index cards pinned up, one per hobby -->
		<ul class="mt-20 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
			{#each play.shelf as card}
				<li class="card" style="--tint: {card.tint}; --tilt: {card.tilt}deg">
					<span class="card__pin" aria-hidden="true"></span>
					<div class="font-display text-7xl leading-none text-ink">{card.value}</div>
					<div class="mt-1 font-mono text-[11px] tracking-[0.12em] text-ink/60 uppercase">
						{card.label}
					</div>
					<p class="mt-4 font-handwriting text-[17px] leading-snug text-ink/85">{card.note}</p>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.card {
		position: relative;
		padding: 26px 22px 22px;
		background-color: var(--tint);
		/* ruled lines, like an index card */
		background-image: linear-gradient(to bottom, transparent 0 calc(100% - 1px), rgb(33 33 33 / 8%) 0);
		background-size: 100% 26px;
		background-position: 0 72px;
		border-radius: 3px;
		transform: rotate(var(--tilt));
		box-shadow:
			0 1px 2px rgb(40 48 66 / 12%),
			0 14px 24px -14px rgb(40 48 66 / 40%);
		transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.card:hover {
		transform: rotate(0deg) translateY(-6px) scale(1.02);
	}

	.card__pin {
		position: absolute;
		top: -7px;
		left: 50%;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 35%, #f87171, #b8381a 70%);
		box-shadow: 0 3px 4px rgb(40 48 66 / 35%);
		transform: translateX(-50%);
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			transition: none;
		}
	}
</style>
