<!--
	The record flip, sketchbook edition: a little two-position switch drawn in ink,
	sitting on B. Pointing at it slides the knob over to A; clicking goes there.
-->
<script lang="ts">
import { sideA } from '$lib/bside/sideA';
import { onMount } from 'svelte';

let href = $state('/');
onMount(() => {
	href = sideA('/');
});

const label = 'Flip to side A: the portfolio';
</script>

<a {href} class="side-switch" aria-label={label} title={label}>
	<span class="side-switch__track">
		<span class="side-switch__knob" aria-hidden="true"></span>
		<span class="side-switch__opt">A</span>
		<span class="side-switch__opt on">B</span>
	</span>
</a>

<style>
	.side-switch {
		display: inline-flex;
		text-decoration: none;
	}

	.side-switch__track {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 54px;
		height: 26px;
		padding: 2px;
		border: 1.5px solid var(--color-ink);
		/* hand-drawn, not machined */
		border-radius: 14px 12px 13px 12px / 12px 14px 12px 13px;
		transform: rotate(-2deg);
	}

	.side-switch__knob {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 24px;
		height: 19px;
		border-radius: 11px 9px 10px 9px;
		background: var(--color-highlight);
		transform: translateX(24px);
		transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.side-switch:hover .side-switch__knob,
	.side-switch:focus-visible .side-switch__knob {
		transform: none;
	}

	.side-switch__opt {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		font-family: var(--font-handwriting);
		font-size: 14px;
		line-height: 1;
		color: var(--color-ink);
		opacity: 0.5;
	}

	.side-switch__opt.on {
		opacity: 1;
	}

	.side-switch:hover .side-switch__opt {
		opacity: 1;
	}

	.side-switch:focus-visible {
		outline: 2px solid var(--color-marker);
		outline-offset: 4px;
		border-radius: 6px;
	}

	@media (prefers-reduced-motion: reduce) {
		.side-switch__knob {
			transition: none;
		}
	}
</style>
