<!--
	Crowd Canvas — a crowd of hand-drawn people strolling across the bottom of the page.

	Author: Malik Zubayer (https://xianmalik.com)

	Adapted from Szenia Zadvornykh's "Open Peeps" pen (https://codepen.io/zadvorsky/pen/xxwbBQV).
	Illustrations by Pablo Stanley, Open Peeps (https://www.openpeeps.com/), CC0.
-->
<script lang="ts">
import { onMount } from 'svelte';
import gsap from 'gsap';

interface Props {
	src: string;
	/** Figures per row of the sprite sheet */
	cols?: number;
	/** Rows of figures in the sprite sheet */
	rows?: number;
	class?: string;
}

let { src, cols = 15, rows = 7, class: className = '' }: Props = $props();

let canvas: HTMLCanvasElement;

type Peep = {
	image: HTMLImageElement;
	rect: [number, number, number, number];
	width: number;
	height: number;
	x: number;
	y: number;
	anchorY: number;
	scaleX: number;
	walk: gsap.core.Timeline | null;
};

onMount(() => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// UTILS
	const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
	const randomIndex = (array: unknown[]) => randomRange(0, array.length) | 0;
	const removeFromArray = <T>(array: T[], i: number) => array.splice(i, 1)[0];
	const removeItemFromArray = <T>(array: T[], item: T) =>
		removeFromArray(array, array.indexOf(item));
	const removeRandomFromArray = <T>(array: T[]) => removeFromArray(array, randomIndex(array));

	// scale shrinks the figures on narrow screens so phones get a crowd, not three faces
	const stage = { width: 0, height: 0, scale: 1 };
	const img = new Image();
	const allPeeps: Peep[] = [];
	const availablePeeps: Peep[] = [];
	const crowd: Peep[] = [];

	// TWEEN FACTORIES
	const resetPeep = (peep: Peep) => {
		const direction = Math.random() > 0.5 ? 1 : -1;
		// bias toward the front so the crowd thins out as it recedes
		const offsetY = (100 - 250 * gsap.parseEase('power2.in')(Math.random())) * stage.scale;
		const startY = stage.height - peep.height + offsetY;
		let startX: number;
		let endX: number;

		if (direction === 1) {
			startX = -peep.width;
			endX = stage.width;
			peep.scaleX = 1;
		} else {
			startX = stage.width + peep.width;
			endX = 0;
			peep.scaleX = -1;
		}

		peep.x = startX;
		peep.y = startY;
		peep.anchorY = startY;

		return { startY, endX };
	};

	const walk = (peep: Peep, { startY, endX }: { startY: number; endX: number }) => {
		const xDuration = 10;
		const yDuration = 0.25;

		const tl = gsap.timeline();
		tl.timeScale(randomRange(0.5, 1.5));
		tl.to(peep, { duration: xDuration, x: endX, ease: 'none' }, 0);
		// the bob in each step
		tl.to(
			peep,
			{ duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - 10 * stage.scale },
			0
		);

		return tl;
	};

	// CROWD
	const createPeeps = () => {
		const { naturalWidth, naturalHeight } = img;
		const rectWidth = naturalWidth / cols;
		const rectHeight = naturalHeight / rows;

		for (let i = 0; i < cols * rows; i++) {
			allPeeps.push({
				image: img,
				rect: [(i % cols) * rectWidth, ((i / cols) | 0) * rectHeight, rectWidth, rectHeight],
				width: rectWidth,
				height: rectHeight,
				x: 0,
				y: 0,
				anchorY: 0,
				scaleX: 1,
				walk: null
			});
		}
	};

	const addPeepToCrowd = () => {
		const peep = removeRandomFromArray(availablePeeps);
		peep.walk = walk(peep, resetPeep(peep)).eventCallback('onComplete', () => {
			removePeepFromCrowd(peep);
			addPeepToCrowd();
		});

		crowd.push(peep);
		crowd.sort((a, b) => a.anchorY - b.anchorY);

		return peep;
	};

	const removePeepFromCrowd = (peep: Peep) => {
		removeItemFromArray(crowd, peep);
		availablePeeps.push(peep);
	};

	const initCrowd = () => {
		while (availablePeeps.length) {
			addPeepToCrowd().walk?.progress(Math.random());
		}
	};

	const renderPeep = (peep: Peep) => {
		const [sx, sy, sw, sh] = peep.rect;
		ctx.save();
		ctx.translate(peep.x, peep.y);
		ctx.scale(peep.scaleX, 1);
		ctx.drawImage(peep.image, sx, sy, sw, sh, 0, 0, peep.width, peep.height);
		ctx.restore();
	};

	const render = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.scale(devicePixelRatio, devicePixelRatio);
		for (const peep of crowd) renderPeep(peep);
		ctx.restore();
	};

	const resize = () => {
		stage.width = canvas.clientWidth;
		stage.height = canvas.clientHeight;
		canvas.width = stage.width * devicePixelRatio;
		canvas.height = stage.height * devicePixelRatio;
		stage.scale = Math.min(1, Math.max(0.45, stage.width / 800));

		for (const peep of allPeeps) {
			peep.width = peep.rect[2] * stage.scale;
			peep.height = peep.rect[3] * stage.scale;
		}

		for (const peep of crowd) peep.walk?.kill();
		crowd.length = 0;
		availablePeeps.length = 0;
		availablePeeps.push(...allPeeps);

		initCrowd();

		// no walking, just a still crowd
		if (reducedMotion) {
			for (const peep of crowd) peep.walk?.pause();
			render();
		}
	};

	// Only tick while the footer is on screen
	let ticking = false;
	const setTicking = (on: boolean) => {
		if (reducedMotion || on === ticking) return;
		ticking = on;
		if (on) {
			gsap.ticker.add(render);
			for (const peep of crowd) peep.walk?.resume();
		} else {
			gsap.ticker.remove(render);
			for (const peep of crowd) peep.walk?.pause();
		}
	};

	const visibility = new IntersectionObserver(([entry]) => setTicking(entry.isIntersecting));

	// Mobile browsers fire resize as the URL bar slides; only rebuild when the box really changes
	let lastWidth = 0;
	let lastHeight = 0;
	const sizeObserver = new ResizeObserver(() => {
		if (!allPeeps.length) return;
		if (canvas.clientWidth === lastWidth && canvas.clientHeight === lastHeight) return;
		lastWidth = canvas.clientWidth;
		lastHeight = canvas.clientHeight;
		resize();
		if (!ticking) for (const peep of crowd) peep.walk?.pause();
	});

	img.onload = () => {
		createPeeps();
		lastWidth = canvas.clientWidth;
		lastHeight = canvas.clientHeight;
		resize();
		sizeObserver.observe(canvas);
		visibility.observe(canvas);
	};
	img.src = src;

	return () => {
		img.onload = null;
		visibility.disconnect();
		sizeObserver.disconnect();
		gsap.ticker.remove(render);
		for (const peep of crowd) peep.walk?.kill();
	};
});
</script>

<canvas bind:this={canvas} class={className} aria-hidden="true"></canvas>
