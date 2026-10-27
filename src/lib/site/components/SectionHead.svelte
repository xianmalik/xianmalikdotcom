<script lang="ts">
interface Props {
	index: string;
	title: string;
	aside?: string;
}

let { index, title, aside }: Props = $props();
</script>

<div class="flex flex-wrap items-end justify-between gap-4 border-b border-ivory/15 pb-6">
	<h2 class="flex items-start gap-4 text-[clamp(2.8rem,6.4vw,6rem)] leading-[0.9] tracking-[-0.03em]">
		<span class="mt-[0.4em] font-sans text-xs tracking-[0.16em] text-signal">{index}</span>
		{title}
	</h2>
	{#if aside}
		<p class="max-w-[32ch] text-[11px] tracking-[0.16em] text-ivory/50 uppercase">{aside}</p>
	{/if}
</div>
