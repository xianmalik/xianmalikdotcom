<script lang="ts">
import { onMount } from 'svelte';
import type { Project } from '$lib/site/types';

let { projects }: { projects: Project[] } = $props();

// Geometry in unscaled px; `scale` sizes it all to the screen.
const TILE_W = 340;
const TILE_H = 212;
const PITCH_X = TILE_W + 36;
const PITCH_Y = TILE_H + 36;
const PERSPECTIVE = 1100;
// The grid is laid on the inside of a globe. You look into it from CAMERA px in front of its
// centre, so the middle sits furthest away and the edges arch round toward you.
const RADIUS = 1300;
const CAMERA = 500;
// Idle drift and speed cap, in px per ms
const DRIFT_X = -0.012;
const DRIFT_Y = -0.008;
const MAX_SPEED = 3;
// Tiles fade out over the last 20% before they wrap to the other side, so the jump is never seen.
const FADE_FROM = 0.8;
// A hovered tile grows, lifts off the globe and pushes its neighbours aside
const HOVER_SCALE = 1.15;
const HOVER_LIFT = 40;
const PUSH = 140;
const PUSH_FALLOFF = 300;

let world: HTMLDivElement;
const els: HTMLAnchorElement[] = [];

let scale = $state(1);
let cols = $state(0);
let rows = $state(0);
let dragging = $state(false);
let active: Project | null = $state(null);

const tiles = $derived.by(() => {
	const seen = new Set<number>();
	return Array.from({ length: cols * rows }, (_, k) => {
		const col = k % cols;
		const row = Math.floor(k / cols);
		// Stride through the list so neighbouring tiles never show the same project
		const index = (col * 5 + row * 3) % projects.length;
		const first = !seen.has(index);
		seen.add(index);
		return { col, row, project: projects[index], hue: (index * 137.5) % 360, first };
	});
});

// Motion state lives outside Svelte's reactivity: it changes every frame.
let ox = 0;
let oy = 0;
let vx = DRIFT_X;
let vy = DRIFT_Y;
let panX = 0;
let panY = 0;
let tiltX = 0;
let tiltY = 0;
let aimX = 0;
let aimY = 0;
let viewW = 0;
let viewH = 0;
let reduceMotion = false;
let hovered = -1;
// A press on the grid. `gu`/`gv` is the grabbed grid point, relative to the offset.
let pointer: {
	id: number;
	downX: number;
	downY: number;
	x: number;
	y: number;
	t: number;
	moved: number;
	gu: number;
	gv: number;
} | null = null;
// Per tile: flat grid position, hover amount (0 to 1), and the last filter values written
const flatX: number[] = [];
const flatY: number[] = [];
const lift: number[] = [];
const lastBlur: number[] = [];
const lastDim: number[] = [];

const clampSpeed = (v: number) => Math.max(-MAX_SPEED, Math.min(MAX_SPEED, v));
const wrap = (v: number, size: number) => ((((v + size / 2) % size) + size) % size) - size / 2;
const smooth = (t: number) => t * t * (3 - 2 * t);
const edgeFade = (u: number) => (u < FADE_FROM ? 1 : 1 - smooth((u - FADE_FROM) / (1 - FADE_FROM)));

// How far from the centre of the screen a point `arc` px along the globe (on the middle row
// or column) appears
function onScreen(arc: number) {
	const a = arc / RADIUS;
	return (RADIUS * Math.sin(a) * PERSPECTIVE) / (CAMERA + RADIUS * Math.cos(a));
}

// How far the grid must reach so its fading edge stays beyond `half` px of screen
function reach(half: number) {
	let arc = 0;
	while (onScreen(arc) < half + TILE_W * 0.6 && arc < RADIUS * 1.3) arc += 10;
	return arc / FADE_FROM;
}

function layout() {
	const vw = window.innerWidth;
	// About this many tiles span the screen
	const across = vw >= 1024 ? 6 : vw >= 640 ? 4 : 2.5;
	scale = vw / (2 * onScreen((across / 2) * PITCH_X));
	viewW = vw / scale;
	viewH = window.innerHeight / scale;
	cols = Math.max(4, Math.ceil((2 * reach(viewW / 2)) / PITCH_X));
	rows = Math.max(4, Math.ceil((2 * reach(viewH / 2)) / PITCH_Y));
	lift.length = 0;
	lastBlur.length = 0;
	lastDim.length = 0;
}

function place(dt: number) {
	const w = cols * PITCH_X;
	const h = rows * PITCH_Y;
	const n = tiles.length;
	const s = scale;
	const ease = 1 - Math.exp(-dt / 140);
	const lifted: number[] = [];
	for (let k = 0; k < n; k++) {
		flatX[k] = wrap(tiles[k].col * PITCH_X + ox, w);
		flatY[k] = wrap(tiles[k].row * PITCH_Y + oy, h);
		lift[k] = (lift[k] ?? 0) + ((k === hovered ? 1 : 0) - (lift[k] ?? 0)) * ease;
		if (lift[k] > 0.001) lifted.push(k);
	}

	for (let k = 0; k < n; k++) {
		const el = els[k];
		if (!el) continue;
		let u = flatX[k];
		let v = flatY[k];
		for (const j of lifted) {
			if (j === k) continue;
			const dx = u - flatX[j];
			const dy = v - flatY[j];
			const d = Math.hypot(dx, dy) || 1;
			const push = PUSH * lift[j] * Math.exp(-d / PUSH_FALLOFF);
			u += (dx / d) * push;
			v += (dy / d) * push;
		}

		// Wrap the flat grid onto the globe: across is longitude, down is latitude
		const theta = u / RADIUS;
		const phi = v / RADIUS;
		const x = RADIUS * Math.sin(theta) * Math.cos(phi);
		const y = RADIUS * Math.sin(phi);
		const depth = CAMERA + RADIUS * Math.cos(theta) * Math.cos(phi);
		const z = PERSPECTIVE - depth;
		const grow = 1 + (HOVER_SCALE - 1) * lift[k];
		// Turn each tile to face the centre of the globe, then lift it along its own normal
		el.style.transform =
			`translate3d(${x * s}px, ${y * s}px, ${z * s}px) rotateY(${-theta}rad) ` +
			`rotateX(${phi}rad) translateZ(${HOVER_LIFT * lift[k] * s}px) scale(${grow})`;

		// Further from the centre of the screen: dimmer, softer, fainter
		const sx = (x * PERSPECTIVE) / depth;
		const sy = (y * PERSPECTIVE) / depth;
		const d = Math.min(1, Math.hypot(sx / (viewW / 2), sy / (viewH / 2)));
		const wrapFade = edgeFade(Math.abs(flatX[k]) / (w / 2)) * edgeFade(Math.abs(flatY[k]) / (h / 2));
		const opacity = depth < 300 ? 0 : wrapFade * (1 - 0.2 * d);
		el.style.opacity = opacity.toFixed(3);
		el.style.visibility = opacity < 0.01 ? 'hidden' : '';

		// Filters repaint, so only touch them when the rounded value changes
		const blur = Math.round(Math.max(0, d - 0.3) * 4.5 * 2) / 2;
		const dim = Math.round((0.9 - 0.3 * d) * 20) / 20;
		if (blur !== lastBlur[k]) {
			el.style.setProperty('--blur', `${blur}px`);
			lastBlur[k] = blur;
		}
		if (dim !== lastDim[k]) {
			el.style.setProperty('--dim', `${dim}`);
			lastDim[k] = dim;
		}
	}
}

function frame(dt: number) {
	if (!dragging) {
		// Ease back toward the idle drift, which is what makes a flick glide to a stop.
		// Hovering a tile settles the grid so it doesn't slide out from under the cursor.
		const still = reduceMotion || hovered >= 0;
		const ease = 1 - Math.exp(-dt / 900);
		vx += ((still ? 0 : DRIFT_X) - vx) * ease;
		vy += ((still ? 0 : DRIFT_Y) - vy) * ease;
		ox += vx * dt;
		oy += vy * dt;
	}
	if (panX || panY) {
		const step = 1 - Math.exp(-dt / 160);
		ox += panX * step;
		oy += panY * step;
		panX -= panX * step;
		panY -= panY * step;
		if (Math.abs(panX) < 0.5 && Math.abs(panY) < 0.5) panX = panY = 0;
	}
	const ease = 1 - Math.exp(-dt / 400);
	tiltX += (aimX - tiltX) * ease;
	tiltY += (aimY - tiltY) * ease;
	world.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
	place(dt);
}

// The flat-grid point under a screen position: cast a ray from the eye through it and see
// where it meets the globe.
function unproject(clientX: number, clientY: number) {
	const sx = (clientX - window.innerWidth / 2) / scale;
	const sy = (clientY - window.innerHeight / 2) / scale;
	const len = Math.hypot(sx, sy, PERSPECTIVE);
	const dx = sx / len;
	const dy = sy / len;
	const dz = -PERSPECTIVE / len;
	// Seen from the globe's centre, the eye sits at (0, 0, CAMERA)
	const b = CAMERA * dz;
	const t = -b + Math.sqrt(b * b - CAMERA * CAMERA + RADIUS * RADIUS);
	const nx = (t * dx) / RADIUS;
	const ny = (t * dy) / RADIUS;
	const nz = (CAMERA + t * dz) / RADIUS;
	return {
		u: Math.atan2(nx, -nz) * RADIUS,
		v: Math.asin(Math.max(-1, Math.min(1, ny))) * RADIUS
	};
}

function onpointerdown(e: PointerEvent) {
	if (e.button !== 0) return;
	pointer = {
		id: e.pointerId,
		downX: e.clientX,
		downY: e.clientY,
		x: e.clientX,
		y: e.clientY,
		t: e.timeStamp,
		moved: 0,
		gu: 0,
		gv: 0
	};
}

function onpointermove(e: PointerEvent) {
	// Lean toward the cursor, but hold still while dragging so the grid stays under it
	if (e.pointerType === 'mouse' && !reduceMotion && !dragging) {
		aimY = (e.clientX / window.innerWidth - 0.5) * 6;
		aimX = -(e.clientY / window.innerHeight - 0.5) * 6;
	}
	if (!pointer || e.pointerId !== pointer.id) return;
	pointer.moved += Math.abs(e.clientX - pointer.x) + Math.abs(e.clientY - pointer.y);
	pointer.x = e.clientX;
	pointer.y = e.clientY;
	if (!dragging) {
		if (pointer.moved <= 6) return;
		dragging = true;
		hovered = -1;
		active = null;
		aimX = tiltX;
		aimY = tiltY;
		// Grab the grid point that was under the press; from here on it stays pinned to the cursor
		const grab = unproject(pointer.downX, pointer.downY);
		pointer.gu = grab.u - ox;
		pointer.gv = grab.v - oy;
	}
	const at = unproject(e.clientX, e.clientY);
	const dt = Math.max(1, e.timeStamp - pointer.t);
	const nx = at.u - pointer.gu;
	const ny = at.v - pointer.gv;
	vx = clampSpeed(vx * 0.5 + ((nx - ox) / dt) * 0.5);
	vy = clampSpeed(vy * 0.5 + ((ny - oy) / dt) * 0.5);
	ox = nx;
	oy = ny;
	pointer.t = e.timeStamp;
}

function swallowClick(e: MouseEvent) {
	e.preventDefault();
	e.stopPropagation();
}

function onpointerup(e: PointerEvent) {
	if (!pointer || e.pointerId !== pointer.id) return;
	// Held still before letting go: no fling
	if (reduceMotion || e.timeStamp - pointer.t > 80) vx = vy = 0;
	pointer = null;
	if (!dragging) return;
	dragging = false;
	// The click that ends a drag shouldn't open a project
	window.addEventListener('click', swallowClick, { capture: true, once: true });
	setTimeout(() => window.removeEventListener('click', swallowClick, { capture: true }), 50);
}

function onwheel(e: WheelEvent) {
	const unit = e.deltaMode === 1 ? 16 : 1;
	vx = clampSpeed(vx - e.deltaX * unit * 0.003);
	vy = clampSpeed(vy - e.deltaY * unit * 0.003);
}

function hover(k: number) {
	if (dragging) return;
	hovered = k;
	active = tiles[k].project;
}

function unhover(k: number) {
	if (hovered !== k) return;
	hovered = -1;
	active = null;
}

// Keyboard focus can land on a tile that's off screen, so glide it to the centre
function onfocus(k: number) {
	hover(k);
	panX = -wrap(tiles[k].col * PITCH_X + ox, cols * PITCH_X);
	panY = -wrap(tiles[k].row * PITCH_Y + oy, rows * PITCH_Y);
}

onMount(() => {
	const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
	const readMotion = () => {
		reduceMotion = motion.matches;
		if (reduceMotion) vx = vy = aimX = aimY = 0;
	};
	readMotion();
	motion.addEventListener('change', readMotion);

	layout();
	window.addEventListener('resize', layout);
	window.addEventListener('pointermove', onpointermove);
	window.addEventListener('pointerup', onpointerup);
	window.addEventListener('pointercancel', onpointerup);

	let last = performance.now();
	let raf = requestAnimationFrame(function tick(now) {
		frame(Math.min(now - last, 48));
		last = now;
		raf = requestAnimationFrame(tick);
	});

	return () => {
		cancelAnimationFrame(raf);
		motion.removeEventListener('change', readMotion);
		window.removeEventListener('resize', layout);
		window.removeEventListener('pointermove', onpointermove);
		window.removeEventListener('pointerup', onpointerup);
		window.removeEventListener('pointercancel', onpointerup);
	};
});
</script>

<div
	class="stage"
	class:is-dragging={dragging}
	style:--tw="{TILE_W * scale}px"
	style:--th="{TILE_H * scale}px"
	style:--p="{PERSPECTIVE * scale}px"
	{onpointerdown}
	{onwheel}
>
	<div class="world" bind:this={world}>
		{#each tiles as tile, k (k)}
			<a
				class="tile"
				href={tile.project.href}
				aria-label="{tile.project.title}, {tile.project.year}"
				aria-hidden={!tile.first}
				tabindex={tile.first ? 0 : -1}
				draggable="false"
				bind:this={els[k]}
				onpointerenter={() => hover(k)}
				onpointerleave={() => unhover(k)}
				onfocus={() => onfocus(k)}
				onblur={() => unhover(k)}
			>
				<span class="tile__art" style:--hue={tile.hue}>
					{#if tile.project.image}
						<img src={tile.project.image} alt="" loading="lazy" decoding="async" draggable="false" />
					{:else}
						<span class="tile__label font-display italic">{tile.project.title}</span>
					{/if}
				</span>
			</a>
		{/each}
	</div>
	<div class="vignette"></div>
</div>

<div class="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-xs sm:p-6">
	<span class="uppercase tracking-widest text-ivory/50">Drag to explore</span>
	<span class="absolute inset-x-0 bottom-4 text-center sm:bottom-6" aria-hidden="true">
		{active ? `${active.title} · ${active.year}` : ''}
	</span>
</div>

<style>
	.stage {
		position: absolute;
		inset: 0;
		overflow: hidden;
		perspective: var(--p);
		touch-action: none;
		user-select: none;
		cursor: pointer;
		animation: arrive 1.4s ease-out both;
	}

	.world {
		position: absolute;
		inset: 0;
		/* No opacity, filter or overflow here: any of them would flatten the 3D */
		transform-style: preserve-3d;
	}

	.tile {
		position: absolute;
		top: 50%;
		left: 50%;
		width: var(--tw);
		height: var(--th);
		margin: calc(var(--th) / -2) 0 0 calc(var(--tw) / -2);
		backface-visibility: hidden;
		will-change: transform, opacity;
		outline-offset: 4px;
	}

	.is-dragging .tile {
		pointer-events: none;
	}

	.tile__art {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: linear-gradient(
			135deg,
			hsl(var(--hue) 55% 58%),
			hsl(calc(var(--hue) + 50) 45% 24%)
		);
		filter: grayscale(1) brightness(var(--dim, 0.85)) blur(var(--blur, 0px));
		transition: filter 0.5s ease;
	}

	.tile__art img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.tile__label {
		position: absolute;
		left: 0.75em;
		bottom: 0.5em;
		font-size: calc(var(--tw) * 0.08);
		color: var(--color-ivory);
		opacity: 0.85;
	}

	.tile:focus-visible .tile__art {
		filter: none;
	}

	@media (hover: hover) {
		.tile:hover .tile__art {
			filter: none;
		}
	}

	/* Blur on dozens of moving tiles is too heavy for most phones */
	@media (pointer: coarse) {
		.tile__art {
			filter: grayscale(1) brightness(var(--dim, 0.85));
		}
	}

	.vignette {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(ellipse at center, transparent 40%, var(--color-canvas) 100%);
	}

	@keyframes arrive {
		from {
			opacity: 0;
		}
	}
</style>
