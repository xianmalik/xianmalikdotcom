<!-- A single highlighter-pen pass; the parent positions and sizes it -->
<script lang="ts">
interface Props {
	class?: string;
}

let { class: className = '' }: Props = $props();
</script>

<svg
	class="highlight-swipe {className}"
	viewBox="0 0 400 40"
	preserveAspectRatio="none"
	aria-hidden="true"
	focusable="false"
>
	<path
		d="M6 13 C 70 8, 150 11, 230 7 S 350 5, 395 9 C 398 16, 397 24, 394 31 C 300 35, 210 31, 120 36 S 30 37, 3 34 C 1 27, 2 19, 6 13 Z"
	/>
</svg>

<style>
	.highlight-swipe {
		pointer-events: none;
	}

	.highlight-swipe path {
		fill: var(--color-highlight);
	}
</style>
