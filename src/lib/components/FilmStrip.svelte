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
</script>

<div class="film-strip-bleed">
	<div class="film-strip">
		{#each reel as { frame, label, repeat }}
			<div class="film-strip__cell">
				<span class="film-strip__edge film-strip__edge--stock font-mono" aria-hidden="true">
					XIANMALIK 400
				</span>
				<div class="film-strip__frame" aria-hidden={repeat || undefined}>
					<img src={frame.src} alt={repeat ? '' : frame.caption} loading="lazy" />
				</div>
				<span class="film-strip__edge film-strip__edge--num font-mono" aria-hidden="true">
					{label}
				</span>
			</div>
		{/each}
	</div>
</div>
