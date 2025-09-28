<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
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