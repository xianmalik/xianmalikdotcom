<!--
	The record flip: a two-position switch over to the B-side (fun and games).
	The B-side has its own copy styled for the sketchbook; the two sites share no code.
-->
<script lang="ts">
const label = 'Flip to side B: fun and games';
</script>

<a href="/bside" class="side-switch" aria-label={label} title={label}>
	<span class="side-switch__label">Side</span>
	<span class="side-switch__track">
		<span class="side-switch__knob" aria-hidden="true"></span>
		<span class="side-switch__opt on">A</span>
		<span class="side-switch__opt">B</span>
	</span>
</a>

<style>
	.side-switch {
		--ease: cubic-bezier(0.23, 1, 0.32, 1);

		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ivory);
		text-decoration: none;
	}

	.side-switch__label {
		opacity: 0.5;
	}

	.side-switch__track {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 60px;
		height: 30px;
		padding: 3px;
		border-radius: 999px;
		background: rgb(250 249 246 / 8%);
		box-shadow: inset 0 0 0 1px rgb(250 249 246 / 16%);
	}

	.side-switch__knob {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 27px;
		height: 24px;
		border-radius: 999px;
		background: var(--color-ivory);
		transition: transform 0.45s var(--ease);
	}

	/* pointing at it previews the flip */
	.side-switch:hover .side-switch__knob,
	.side-switch:focus-visible .side-switch__knob {
		transform: translateX(27px);
		background: var(--color-signal);
	}

	.side-switch__opt {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		font-family: var(--font-display);
		font-style: italic;
		font-size: 14px;
		letter-spacing: 0;
		transition: color 0.3s ease;
	}

	.side-switch__opt.on {
		color: var(--color-canvas);
	}

	.side-switch:hover .side-switch__opt.on,
	.side-switch:focus-visible .side-switch__opt.on {
		color: var(--color-ivory);
	}

	.side-switch:hover .side-switch__opt:last-child,
	.side-switch:focus-visible .side-switch__opt:last-child {
		color: var(--color-canvas);
	}

	.side-switch:focus-visible {
		outline: 2px solid var(--color-signal);
		outline-offset: 4px;
		border-radius: 999px;
	}

	@media (prefers-reduced-motion: reduce) {
		.side-switch__knob {
			transition: none;
		}
	}
</style>
