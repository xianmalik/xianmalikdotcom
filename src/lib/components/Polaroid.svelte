<script lang="ts">
interface Props {
	src: string;
	caption?: string;
	tilt?: number;
	/** Position and width as a % of the left page, so the layout scales with the book. */
	x?: number;
	y?: number;
	w?: number;
	tape?: boolean;
	i?: number;
}

let { src, caption = '', tilt = 0, x = 0, y = 0, w = 32, tape = false, i = 0 }: Props = $props();

// $state, not a plain let — the effect below has to re-run once bind:this lands.
let el = $state<HTMLElement | null>(null);
let pos = $state<{ x: number; y: number } | null>(null);
let dragging = $state(false);
let nearHome = $state(false);

// The slot outline is a separate, stationary element, so it has to be told how big
// the print is. Measured rather than derived, so a wrapped caption still fits.
let slotW = $state(0);
let slotH = $state(0);

$effect(() => {
	const node = el;
	if (!node) return;
	const measure = () => {
		slotW = node.offsetWidth;
		slotH = node.offsetHeight;
	};
	measure(); // don't wait on the observer — it only delivers on a render tick
	const ro = new ResizeObserver(measure);
	ro.observe(node);
	return () => ro.disconnect();
});

const NUDGE = 8;
/** Release a print within this many px of its slot and it drops back in. */
const SNAP = 30;

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/** Area of the page the print may sit in, in the parent's padding-box coords. */
function bounds(node: HTMLElement) {
	const page = node.parentElement!;
	const cs = getComputedStyle(page);
	// offsetWidth/Height ignore the rotation, so the print can't creep off the page
	return {
		minX: Number.parseFloat(cs.paddingLeft),
		minY: Number.parseFloat(cs.paddingTop),
		maxX: page.clientWidth - Number.parseFloat(cs.paddingRight) - node.offsetWidth,
		maxY: page.clientHeight - Number.parseFloat(cs.paddingBottom) - node.offsetHeight
	};
}

/** Where the print sits when it's in its slot, in px. */
function home(node: HTMLElement) {
	const page = node.parentElement!;
	return { x: (x / 100) * page.clientWidth, y: (y / 100) * page.clientHeight };
}

function withinSnap(node: HTMLElement, p: { x: number; y: number }) {
	const h = home(node);
	return Math.hypot(p.x - h.x, p.y - h.y) <= SNAP;
}

/** Drag only where the prints are absolutely placed; below md they sit in flow. */
const canDrag = () => window.matchMedia('(min-width: 768px)').matches;

let startX = 0;
let startY = 0;
let originX = 0;
let originY = 0;

function onPointerDown(e: PointerEvent) {
	if (!el || !canDrag() || e.button !== 0) return;
	e.preventDefault();
	dragging = true;
	startX = e.clientX;
	startY = e.clientY;
	originX = el.offsetLeft;
	originY = el.offsetTop;
	el.setPointerCapture(e.pointerId);
}

function onPointerMove(e: PointerEvent) {
	if (!dragging || !el) return;
	const b = bounds(el);
	const next = {
		x: clamp(originX + (e.clientX - startX), b.minX, Math.max(b.minX, b.maxX)),
		y: clamp(originY + (e.clientY - startY), b.minY, Math.max(b.minY, b.maxY))
	};
	pos = next;
	nearHome = withinSnap(el, next);
}

function onPointerUp(e: PointerEvent) {
	if (!dragging || !el) return;
	dragging = false;
	el.releasePointerCapture(e.pointerId);
	// dropped near its slot? let it click back into place
	if (pos && withinSnap(el, pos)) pos = null;
	nearHome = false;
}

function onKeyDown(e: KeyboardEvent) {
	if (!el) return;
	const step: Record<string, [number, number]> = {
		ArrowLeft: [-NUDGE, 0],
		ArrowRight: [NUDGE, 0],
		ArrowUp: [0, -NUDGE],
		ArrowDown: [0, NUDGE]
	};
	const d = step[e.key];
	if (d && canDrag()) {
		e.preventDefault();
		const b = bounds(el);
		const next = {
			x: clamp((pos?.x ?? el.offsetLeft) + d[0], b.minX, Math.max(b.minX, b.maxX)),
			y: clamp((pos?.y ?? el.offsetTop) + d[1], b.minY, Math.max(b.minY, b.maxY))
		};
		pos = withinSnap(el, next) ? null : next;
	} else if ((e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') && pos) {
		// back to the slot it came from
		e.preventDefault();
		pos = null;
	}
}
</script>

<!-- Stationary slot marker: where the print belongs -->
<div
	class="photo-slot"
	class:vacated={pos !== null}
	class:near={dragging && nearHome}
	style="--x: {x}%; --y: {y}%; --tilt: {tilt}deg; --sw: {slotW}px; --sh: {slotH}px"
	aria-hidden="true"
></div>

<div
	bind:this={el}
	class="polaroid"
	class:taped={tape}
	class:dragging
	style="--tilt: {tilt}deg; --x: {pos ? `${pos.x}px` : `${x}%`}; --y: {pos
		? `${pos.y}px`
		: `${y}%`}; --polaroid-w: {w}%; --i: {i}"
	tabindex="0"
	role="button"
	aria-roledescription="Draggable photo"
	aria-label={caption
		? `${caption}. Drag to move, arrow keys to nudge, Enter or Escape to put it back.`
		: 'Photo. Drag to move, arrow keys to nudge, Enter or Escape to put it back.'}
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
	onkeydown={onKeyDown}
>
	<figure>
		<img {src} alt={caption} loading="lazy" draggable="false" />
		{#if caption}
			<figcaption class="font-handwriting text-ink">{caption}</figcaption>
		{/if}
	</figure>
</div>
