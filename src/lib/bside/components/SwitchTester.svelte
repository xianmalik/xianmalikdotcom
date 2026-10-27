<!--
	A little keyboard you can type on. Keys go down under your fingers (or the mouse) and each
	press is synthesised live with Web Audio, voiced like the switch you pick. No samples.
-->
<script lang="ts">
import { tester } from '$lib/bside/content/play.json';
import { onMount } from 'svelte';

type SwitchId = 'linear' | 'tactile' | 'clicky';

const rows = [
	['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
	['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
	['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

let kind = $state<SwitchId>('linear');
let down = $state<Record<string, boolean>>({});
let typed = $state('');
let count = $state(0);
let muted = $state(false);
// Only listen to the real keyboard while the board is on screen, so space still scrolls elsewhere
let live = false;
let board: HTMLElement;
let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;

function audio() {
	if (!ctx) {
		ctx = new AudioContext();
		// one shared second of white noise; every click is a filtered slice of it
		noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
		const data = noise.getChannelData(0);
		for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	}
	if (ctx.state === 'suspended') ctx.resume();
	return ctx;
}

/** A filtered burst of noise: the body of every keystroke */
function burst(at: number, freq: number, q: number, gain: number, length: number) {
	const ac = audio();
	const src = ac.createBufferSource();
	src.buffer = noise;
	const filter = ac.createBiquadFilter();
	filter.type = 'bandpass';
	filter.frequency.value = freq * (0.92 + Math.random() * 0.16);
	filter.Q.value = q;
	const amp = ac.createGain();
	amp.gain.setValueAtTime(gain, at);
	amp.gain.exponentialRampToValueAtTime(0.001, at + length);
	src.connect(filter).connect(amp).connect(ac.destination);
	src.start(at, Math.random() * 0.5, length + 0.02);
}

/** A short pitched thump: the low end of a key bottoming out */
function thump(at: number, freq: number, gain: number, length: number) {
	const ac = audio();
	const osc = ac.createOscillator();
	osc.type = 'sine';
	osc.frequency.setValueAtTime(freq, at);
	osc.frequency.exponentialRampToValueAtTime(freq * 0.6, at + length);
	const amp = ac.createGain();
	amp.gain.setValueAtTime(gain, at);
	amp.gain.exponentialRampToValueAtTime(0.001, at + length);
	osc.connect(amp).connect(ac.destination);
	osc.start(at);
	osc.stop(at + length + 0.02);
}

function pressSound(key: string) {
	if (muted) return;
	const t = audio().currentTime;
	// the space bar is bigger and hollower than the rest
	const low = key === ' ' ? 0.8 : 1;
	if (kind === 'linear') {
		burst(t, 900 * low, 1.4, 0.5, 0.05);
		thump(t, 170 * low, 0.35, 0.07);
	} else if (kind === 'tactile') {
		burst(t, 1600, 2, 0.35, 0.03);
		burst(t + 0.018, 1100 * low, 1.6, 0.45, 0.05);
		thump(t + 0.018, 210 * low, 0.25, 0.05);
	} else {
		burst(t, 4200, 6, 0.7, 0.018);
		burst(t + 0.022, 3600, 5, 0.5, 0.02);
		thump(t + 0.022, 240 * low, 0.18, 0.04);
	}
}

function releaseSound() {
	if (muted || !ctx) return;
	const t = ctx.currentTime;
	burst(t, kind === 'clicky' ? 3000 : 1300, 2, 0.12, 0.025);
}

function press(key: string) {
	if (down[key]) return;
	down[key] = true;
	count += 1;
	typed = (typed + key).slice(-42);
	pressSound(key);
}

function release(key: string) {
	if (!down[key]) return;
	down[key] = false;
	releaseSound();
}

function keyName(event: KeyboardEvent) {
	if (event.key === ' ') return ' ';
	const k = event.key.toLowerCase();
	return rows.some((row) => row.includes(k)) ? k : null;
}

function onkeydown(event: KeyboardEvent) {
	if (!live || event.metaKey || event.ctrlKey || event.altKey) return;
	if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select')) return;
	const key = keyName(event);
	if (key === null) return;
	// keep space from scrolling the page while you're playing
	event.preventDefault();
	if (!event.repeat) press(key);
}

function onkeyup(event: KeyboardEvent) {
	const key = keyName(event);
	if (key !== null) release(key);
}

onMount(() => {
	const observer = new IntersectionObserver(
		([entry]) => {
			live = entry.isIntersecting;
		},
		{ threshold: 0.5 }
	);
	observer.observe(board);
	return () => {
		observer.disconnect();
		ctx?.close();
	};
});
</script>

<svelte:window {onkeydown} {onkeyup} onblur={() => (down = {})} />

<div class="tester" bind:this={board}>
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<div class="font-display text-4xl text-marker md:text-5xl">{tester.title}</div>
			<div class="font-handwriting -rotate-1 text-lg text-ink/80">{tester.note}</div>
		</div>
		<div class="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Switch type">
			{#each tester.switches as option}
				<button
					type="button"
					role="radio"
					aria-checked={kind === option.id}
					class="pick"
					class:on={kind === option.id}
					title={option.feel}
					onclick={() => {
						kind = option.id as SwitchId;
						pressSound('a');
					}}
				>
					{option.name}
				</button>
			{/each}
			<button
				type="button"
				class="pick pick--mute"
				aria-pressed={muted}
				onclick={() => (muted = !muted)}
			>
				{muted ? 'sound off' : 'sound on'}
			</button>
		</div>
	</div>

	<!-- what you've typed, as if on the paper under the board -->
	<div class="readout font-handwriting" aria-live="off">
		<span>{typed}</span><span class="caret" aria-hidden="true"></span>
		{#if !typed}<span class="text-ink/35">start typing…</span>{/if}
	</div>

	<div class="board">
		{#each rows as row, r}
			<div class="board__row" style="--indent: {r * 0.5}">
				{#each row as key}
					<button
						type="button"
						class="cap"
						class:down={down[key]}
						tabindex="-1"
						aria-label={key}
						onpointerdown={(event) => {
							event.preventDefault();
							press(key);
						}}
						onpointerup={() => release(key)}
						onpointerleave={() => release(key)}
					>
						<span class="cap__top">{key}</span>
					</button>
				{/each}
			</div>
		{/each}
		<div class="board__row board__row--space">
			<button
				type="button"
				class="cap cap--space"
				class:down={down[' ']}
				tabindex="-1"
				aria-label="space"
				onpointerdown={(event) => {
					event.preventDefault();
					press(' ');
				}}
				onpointerup={() => release(' ')}
				onpointerleave={() => release(' ')}
			>
				<span class="cap__top"></span>
			</button>
		</div>
	</div>

	<div class="mt-4 flex justify-between font-mono text-[11px] tracking-[0.12em] text-ink/50 uppercase">
		<span>{kind} switches</span>
		<span>{count} {count === 1 ? 'keystroke' : 'keystrokes'}</span>
	</div>
</div>

<style>
	.pick {
		padding: 6px 12px;
		border: 1.5px solid var(--color-ink);
		border-radius: 14px 12px 13px 12px / 12px 14px 12px 13px;
		background: transparent;
		font-family: var(--font-handwriting);
		font-size: 15px;
		line-height: 1;
		color: var(--color-ink);
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			transform 0.2s ease;
	}

	.pick:hover {
		transform: rotate(-2deg);
	}

	.pick.on {
		background: var(--color-highlight);
	}

	.pick--mute {
		border-style: dashed;
		opacity: 0.7;
	}

	.pick:focus-visible {
		outline: 2px solid var(--color-marker);
		outline-offset: 3px;
	}

	.readout {
		min-height: 44px;
		margin: 22px 0 18px;
		padding-bottom: 6px;
		border-bottom: 1.5px dashed rgb(33 33 33 / 25%);
		font-size: 26px;
		line-height: 1.4;
		white-space: pre;
		overflow: hidden;
		color: var(--color-ink);
	}

	.caret {
		display: inline-block;
		width: 2px;
		height: 0.9em;
		margin-left: 2px;
		vertical-align: -0.1em;
		background: var(--color-marker);
		animation: blink 1s steps(1) infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	/* The board: a dark case with a lip, the caps sitting proud of it */
	.board {
		--u: clamp(22px, 6.4vw, 56px);
		--gap: clamp(4px, 0.9vw, 7px);

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--gap);
		padding: clamp(12px, 2.4vw, 22px);
		border-radius: 18px;
		background: linear-gradient(to bottom, #2d2f33, #1f2124);
		box-shadow:
			0 0 0 1px rgb(0 0 0 / 40%),
			0 2px 0 rgb(255 255 255 / 8%) inset,
			0 22px 40px -18px rgb(40 48 66 / 60%);
		touch-action: manipulation;
		user-select: none;
		-webkit-user-select: none;
	}

	.board__row {
		display: flex;
		gap: var(--gap);
	}

	/* the stagger of a real board, once there's room for it */
	@media (min-width: 640px) {
		.board__row {
			transform: translateX(calc(var(--indent) * var(--u) * 0.5));
		}
	}

	.cap {
		position: relative;
		width: var(--u);
		height: var(--u);
		padding: 0;
		border: 0;
		border-radius: 7px;
		/* the skirt of the cap, darker than the top */
		background: #cfc8bb;
		box-shadow:
			0 calc(var(--u) * 0.09) 0 #a49c8d,
			0 calc(var(--u) * 0.09 + 2px) 6px rgb(0 0 0 / 45%);
		cursor: pointer;
		transition:
			transform 0.06s ease,
			box-shadow 0.06s ease;
	}

	.cap__top {
		position: absolute;
		inset: 8% 10% 16%;
		display: grid;
		place-items: start;
		padding: 8% 12%;
		border-radius: 5px;
		background: linear-gradient(to bottom, #f6f1e7, #e9e2d4);
		font-family: var(--font-mono);
		font-size: calc(var(--u) * 0.22);
		line-height: 1;
		text-transform: uppercase;
		color: #3a3a3a;
	}

	/* every few keys a modifier-coloured accent, the way a real set mixes colourways */
	.board__row:first-child .cap:first-child,
	.board__row:nth-child(2) .cap:nth-child(6),
	.board__row:nth-child(3) .cap:last-child {
		background: #b8381a;
		box-shadow:
			0 calc(var(--u) * 0.09) 0 #7d2410,
			0 calc(var(--u) * 0.09 + 2px) 6px rgb(0 0 0 / 45%);
	}

	.board__row:first-child .cap:first-child .cap__top,
	.board__row:nth-child(2) .cap:nth-child(6) .cap__top,
	.board__row:nth-child(3) .cap:last-child .cap__top {
		background: linear-gradient(to bottom, #e0532e, #c8411f);
		color: #fff4ec;
	}

	.cap.down {
		transform: translateY(calc(var(--u) * 0.08));
		box-shadow:
			0 calc(var(--u) * 0.01) 0 #a49c8d,
			0 1px 2px rgb(0 0 0 / 45%);
	}

	.cap--space {
		width: calc(var(--u) * 6 + var(--gap) * 5);
	}

	@media (prefers-reduced-motion: reduce) {
		.caret {
			animation: none;
		}
	}
</style>
