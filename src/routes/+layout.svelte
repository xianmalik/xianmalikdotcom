<script lang="ts">
import '../app.css';
import favicon from '$lib/assets/favicon.svg';
import CrtChrome from '$lib/components/CrtChrome.svelte';
import BootIntro from '$lib/components/BootIntro.svelte';

let { children } = $props();

let bootPhase: 'loading' | 'zoom' | 'done' = $state('loading');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="site-frame"
	class:boot-hidden={bootPhase === 'loading'}
	class:boot-zoom={bootPhase === 'zoom'}
>
	{@render children?.()}
	<CrtChrome />
</div>

<BootIntro bind:phase={bootPhase} />
