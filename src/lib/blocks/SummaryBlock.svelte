<script lang="ts">
import { summary } from '$content/sections.json';
import Button from '$lib/components/Button.svelte';
</script>

<!-- <div class="py-8 mx-auto min-h-[calc(100svh-48px)] flex flex-col"> -->
<div class="py-8 mx-auto">
	<div class="px-8 py-28 border-y border-ink/20 h-full">
		<div class="w-full max-w-[840px] h-full mx-auto">
			<div class="flex flex-col items-center justify-center text-center font-sans py-12">
				<div class="font-handwriting text-xl text-ink mb-6 -rotate-2">
					Hi I'm {summary.name}
				</div>
				<div class="mb-8">
					<img
						src={summary.avatar}
						alt={summary.name}
						class="w-32 h-32 rounded-full object-cover border-4 border-ink/30"
					/>
				</div>
				<h3 class="font-display text-4xl mb-6 text-marker leading-tight whitespace-pre-line">
					{summary.tagline}
				</h3>
				<p class="font-handwriting text-2xl text-ink leading-snug rotate-1 whitespace-pre-line mb-8">
					{summary.description}
				</p>
				<Button href="#" class="bg-ink/10 uppercase text-ink px-3 py-1 font-mono text-sm leading-4 font-medium hover:bg-ink/20 transition-all duration-300 inline-flex items-center gap-2 hover:gap-3">
					Let's talk
				</Button>
			</div>
		</div>
	</div>
</div>
