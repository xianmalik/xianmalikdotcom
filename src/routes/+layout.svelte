<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Lenis from 'lenis';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let { children } = $props();

	onMount(() => {
		// Register GSAP ScrollTrigger plugin
		gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			smoothWheel: true,
		});

		// Integrate Lenis with GSAP ScrollTrigger
		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);

		return () => {
			lenis.destroy();
			gsap.ticker.remove((time) => {
				lenis.raf(time * 1000);
			});
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children?.()}
</main>

<div class="canvas--top"></div>
<div class="canvas--bottom"></div>
<div class="canvas--wrapper">
	<div class="canvas--inner"></div>
	<div class="canvas--lines"></div>
</div>