<script lang="ts">
import type { FilmFrame } from '$lib/types';

let { frames }: { frames: FilmFrame[] } = $props();

/** The strip runs off both edges of the screen, so cycle the frames until
 *  there are enough to cover the widest viewport. The surplus is clipped. */
const REEL = 26;

/** 35mm is numbered 1, 1A, 2, 2A … along the edge, one mark per frame. */
const edgeNumber = (n: number) => `${Math.floor(n / 2) + 12}${n % 2 ? 'A' : ''}`;

const reel = $derived(
	Array.from({ length: REEL }, (_, n) => ({
		frame: frames[n % frames.length],
		label: edgeNumber(n),
		/** Only the first pass is real content; the rest is repeat, and
		 *  announcing the same few photos six times helps nobody. */
		repeat: n >= frames.length
	}))
);

/** How much larger than the frame the loupe sits — it magnifies. */
const MAG = 1.5;

const frameEls: HTMLElement[] = [];
let lit = $state<number | null>(null);
/** Held after the pointer leaves so the loupe can fade out on the last
 *  frame it read rather than going blank mid-transition. */
let held = $state(0);
let box = $state({ x: 0, y: 0, w: 0, h: 0 });

/** Snap the loupe onto a frame. offsetLeft/Top are layout coordinates, so
 *  they ignore the strip's rotation — the loupe inherits that rotation from
 *  the strip instead and stays square to the film. */
function snapTo(n: number) {
	const el = frameEls[n];
	if (!el) return;
	const w = el.offsetWidth * MAG;
	const h = el.offsetHeight * MAG;
	box = {
		x: el.offsetLeft + el.offsetWidth / 2 - w / 2,
		y: el.offsetTop + el.offsetHeight / 2 - h / 2,
		w,
		h
	};
	lit = n;
	held = n;
}
</script>

<div class="film-strip-bleed">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="film-strip" onpointerleave={() => (lit = null)}>
		{#each reel as { frame, label, repeat }, n}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="film-strip__cell" onpointerenter={() => snapTo(n)}>
				<span class="film-strip__edge film-strip__edge--stock font-mono" aria-hidden="true">
					XIANMALIK 400
				</span>
				<div class="film-strip__frame" bind:this={frameEls[n]} aria-hidden={repeat || undefined}>
					<img src={frame.src} alt={repeat ? '' : frame.caption} loading="lazy" />
				</div>
				<span class="film-strip__edge film-strip__edge--num font-mono" aria-hidden="true">
					{label}
				</span>
			</div>
		{/each}

		<!-- The loupe: reads one frame at a time, off the negative and into
		     the real photograph -->
		<div
			class="film-lens"
			class:film-lens--lit={lit !== null}
			style="--lx: {box.x}px; --ly: {box.y}px; --lw: {box.w}px; --lh: {box.h}px"
			aria-hidden="true"
		>
			<img src={reel[held]?.frame.src} alt="" />
		</div>
	</div>
</div>
