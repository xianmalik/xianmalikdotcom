<script lang="ts">
let { phase = $bindable('loading') }: { phase?: 'loading' | 'zoom' | 'done' } = $props();

$effect(() => {
	const zoomTimer = setTimeout(() => {
		phase = 'zoom';
	}, 1600);
	const doneTimer = setTimeout(() => {
		phase = 'done';
	}, 2800);
	return () => {
		clearTimeout(zoomTimer);
		clearTimeout(doneTimer);
	};
});
</script>

{#if phase !== 'done'}
	<div class="boot-intro" class:zooming={phase === 'zoom'}>
		<div class="boot-monitor">
			<img src="/crt-monitor.png" alt="" draggable="false" />
			<div class="boot-label crt-glow-title">loading...<span class="cursor-blink">_</span></div>
		</div>
	</div>
{/if}

<style>
	.boot-intro {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: grid;
		place-items: center;
		background: #101010;
	}

	.boot-monitor {
		position: relative;
		width: min(76vmin, 620px);
		/* origin sits at the center of the monitor's screen hole, so the
		   zoom flies into the screen rather than the case */
		transform-origin: 50% 46.5%;
	}

	.boot-monitor img {
		display: block;
		width: 100%;
		height: auto;
		user-select: none;
	}

	.boot-label {
		position: absolute;
		left: 50%;
		top: 46.5%;
		transform: translate(-50%, -50%);
		color: var(--text-bright);
		font-family: var(--font-mono);
		font-size: clamp(18px, 3.2vmin, 26px);
		white-space: nowrap;
	}

	.zooming {
		animation: boot-fade 0.5s ease 0.65s forwards;
	}

	.zooming .boot-monitor {
		animation: boot-zoom 1.2s cubic-bezier(0.55, 0, 0.85, 0.4) forwards;
	}

	.zooming .boot-label {
		animation: boot-fade 0.2s ease forwards;
	}

	@keyframes boot-zoom {
		to {
			transform: scale(9);
		}
	}

	@keyframes boot-fade {
		to {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.boot-intro {
			display: none;
		}
	}
</style>
