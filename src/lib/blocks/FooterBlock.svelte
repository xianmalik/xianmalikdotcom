<script lang="ts">
import { footer } from '$content/sections.json';
import CrowdCanvas from '$lib/components/CrowdCanvas.svelte';
import HighlightSwipe from '$lib/components/HighlightSwipe.svelte';

const year = new Date().getFullYear();
</script>

<footer id="contact" class="footer relative -mx-6 h-[560px] md:h-[720px] overflow-hidden">
	<div class="relative z-10 flex flex-col items-center text-center pt-16 px-4">
		<div class="whitespace-nowrap font-handwriting text-lg md:text-2xl leading-none text-black -rotate-1 mb-2">
			{footer.subtitle}
		</div>
		<div
			class="wordmark font-wordmark text-black text-[clamp(3.5rem,17cqw,9rem)] leading-[0.8] whitespace-nowrap select-none -mb-[0.12em]"
		>
			<!-- Highlighter swipe across the lower half of the letters -->
			<HighlightSwipe class="wordmark__highlight" />
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
	.wordmark :global(.wordmark__highlight) {
		position: absolute;
		left: -0.18em;
		bottom: 0.1em;
		height: 0.55em;
		width: calc(100% + 0.36em);
		transform: rotate(-1.2deg);
	}
</style>
