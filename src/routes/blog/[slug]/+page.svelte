<script lang="ts">
import Nav from '$lib/components/Nav.svelte';
import Footer from '$lib/components/Footer.svelte';
import { theme } from '$lib/theme.svelte';
import type { PageProps } from './$types';

let { data }: PageProps = $props();

let bootText = $state('');

$effect(() => {
	const fullText = data.post.body;
	bootText = '';
	let i = 0;
	const timer = setInterval(() => {
		i += 3;
		bootText = fullText.slice(0, i);
		if (i >= fullText.length) clearInterval(timer);
	}, 10);
	return () => clearInterval(timer);
});
</script>

<svelte:head>
	<title>xianmalik@paperhouse — {data.post.title}</title>
</svelte:head>

<div class="crt-screen flex min-h-screen flex-col" data-theme={theme.current} data-screen-label="Blog Post">
	<Nav active="blog" />

	<main class="flex-1 px-6 py-12">
		<div class="mx-auto max-w-[720px]" style="font-family:var(--font-mono);">
			<a href="/blog" style="text-decoration:none; color:var(--text-muted); font-size:var(--text-sm);">&lt; ../blog</a>

			<div class="mt-5" style="color:var(--text-dim); font-size:var(--text-xs);">{data.post.date}</div>
			<h1 class="crt-glow-title my-2 font-bold" style="color:var(--text-bright); font-size:var(--text-xl); line-height:1.25;">
				&gt; {data.post.title}
			</h1>
			<div class="mb-8 flex gap-3.5">
				{#each data.post.tags as tag (tag)}
					<span style="font-size:var(--text-xs); color:var(--text-muted);">#{tag}</span>
				{/each}
			</div>

			<div style="color:var(--text-primary); font-size:var(--text-md); line-height:1.8; white-space:pre-wrap;">{bootText}<span class="cursor-blink">_</span></div>
		</div>
	</main>

	<Footer />
</div>
