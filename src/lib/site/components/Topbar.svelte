<!-- Sits over the hero: who and where on the left, the flip and a way to get in touch on the right -->
<script lang="ts">
import { hero } from '$lib/site/content/content.json';
import SideSwitch from './SideSwitch.svelte';
</script>

<header
	class="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 p-4 sm:p-6"
>
	<div class="flex items-center gap-3 text-[11px] tracking-[0.16em] text-ivory/60 uppercase">
		<span class="dot" aria-hidden="true"></span>
		<span class="hidden sm:inline">{hero.status}</span>
		<span class="sm:hidden">Available</span>
	</div>
	<div class="pointer-events-auto flex items-center gap-5">
		<SideSwitch />
		<a
			href="#contact"
			class="hidden rounded-full bg-ivory px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-signal sm:inline-block"
		>
			Let's talk
		</a>
	</div>
</header>

<style>
	.dot {
		position: relative;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-go);
	}

	.dot::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: var(--color-go);
		animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	@keyframes ping {
		75%,
		100% {
			transform: scale(2.6);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dot::after {
			animation: none;
		}
	}
</style>
