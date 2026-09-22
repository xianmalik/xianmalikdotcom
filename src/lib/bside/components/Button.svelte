<script lang="ts">
interface Props {
	children: import('svelte').Snippet;
	href?: string;
	[key: string]: unknown;
}

let { children, href, ...props }: Props = $props();
</script>

{#snippet content()}
	<span class="marker-link__label">{@render children()}</span>
	<svg
		class="marker-link__stroke"
		viewBox="0 0 100 10"
		preserveAspectRatio="none"
		aria-hidden="true"
		focusable="false"
	>
		<!-- pathLength=1 normalises the dash maths regardless of the label's width -->
		<path
			class="marker-link__pass"
			pathLength="1"
			d="M1.5 6.2c13-2.7 26 1.4 39-1.1 13-2.4 26 1.9 39-0.7 6-1.2 12 0.6 19-0.6"
		/>
		<path
			class="marker-link__pass marker-link__pass--second"
			pathLength="1"
			d="M2.5 8.1c12-1.9 27 1.1 40-0.9 12-1.9 25 1.6 38-0.5 6-0.9 12 0.4 18-0.5"
		/>
	</svg>
{/snippet}

{#if href}
	<a {...props} {href} class="marker-link">{@render content()}</a>
{:else}
	<button {...props} type="button" class="marker-link">{@render content()}</button>
{/if}
