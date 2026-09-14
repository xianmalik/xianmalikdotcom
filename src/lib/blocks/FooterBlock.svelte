<script lang="ts">
import { footer } from '$content/sections.json';
import CrowdCanvas from '$lib/components/CrowdCanvas.svelte';

const year = new Date().getFullYear();
</script>

<footer class="footer relative -mx-6 h-[560px] md:h-[720px] overflow-hidden">
	<div class="relative z-10 flex flex-col items-center text-center pt-16 px-4">
		<div class="whitespace-nowrap font-handwriting text-lg md:text-2xl leading-none text-black -rotate-1 mb-2">
			{footer.subtitle}
		</div>
		<div
			class="wordmark font-wordmark text-black text-[clamp(3.5rem,17cqw,9rem)] leading-[0.8] whitespace-nowrap select-none -mb-[0.12em]"
		>
			<!-- Highlighter swipe across the lower half of the letters -->
			<svg
				class="wordmark__highlight"
				viewBox="0 0 400 40"
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				<path
					d="M6 13 C 70 8, 150 11, 230 7 S 350 5, 395 9 C 398 16, 397 24, 394 31 C 300 35, 210 31, 120 36 S 30 37, 3 34 C 1 27, 2 19, 6 13 Z"
				/>
			</svg>
			<span class="relative">{footer.title}</span>
		</div>
		<div class="font-mono text-[11px] uppercase tracking-[0.12em] text-shade mt-[5px]">
			© {year} {footer.copyright}
		</div>
	</div>

	<CrowdCanvas
		src={footer.crowd}
		cols={15}
		rows={7}
		class="absolute bottom-0 left-0 w-full h-[60%] md:h-[68%]"
	/>
</footer>

<style>
	.footer {
		container-type: inline-size;
	}

	.wordmark {
		position: relative;
		isolation: isolate;
	}

	/* Sized in em so the swipe tracks the wordmark at every width */
	.wordmark__highlight {
		position: absolute;
		left: -0.18em;
		bottom: 0.1em;
		height: 0.55em;
		width: calc(100% + 0.36em);
		transform: rotate(-1.2deg);
		pointer-events: none;
	}

	.wordmark__highlight path {
		fill: var(--color-highlight);
	}
</style>
