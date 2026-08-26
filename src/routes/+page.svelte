<script lang="ts">
import Nav from '$lib/components/Nav.svelte';
import Footer from '$lib/components/Footer.svelte';
import { theme } from '$lib/theme.svelte';
import profile from '$content/profile.json';

let bootText = $state('');

$effect(() => {
	const fullText = profile.summary;
	let i = 0;
	const timer = setInterval(() => {
		i += 2;
		bootText = fullText.slice(0, i);
		if (i >= fullText.length) clearInterval(timer);
	}, 14);
	return () => clearInterval(timer);
});
</script>

<svelte:head>
	<title>xianmalik@paperhouse — about</title>
</svelte:head>

<div
	class="crt-screen flex min-h-screen flex-col"
	data-theme={theme.current}
	data-screen-label="About"
>
	<Nav active="about" />

	<main class="flex-1 px-8 py-16">
		<div class="mx-auto flex max-w-[940px] flex-wrap items-start gap-14">
			<div class="min-w-[280px] flex-none">
				<pre
					class="crt-glow-title mb-7 overflow-x-auto font-bold whitespace-pre"
					style="color:var(--text-bright); font-family:var(--font-mono); font-size:13px; line-height:1.15;">
        _                      ___ __
 __ __ (_)__ ____  __ _  ___ _/ (_) /__
 \ \ // / _ `/ _ \/  ' \/ _ `/ / /  '_/
/_\_\/_/\_,_/_//_/_/_/_/\_,_/_/_/_/\_\
                                       </pre>
				<ul
					class="m-0 flex list-none flex-col gap-[11px] p-0"
					style="color:var(--text-primary); font-family:var(--font-mono); font-size:var(--text-sm); line-height:1.5;"
				>
					{#each profile.highlights as highlight (highlight)}
						<li class="flex items-start gap-3">
							<span class="crt-glow-text" style="color:var(--text-bright);">&#9608;</span>
							<span>{highlight}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div
				class="min-w-[320px] flex-1"
				style="color:var(--text-primary); font-family:var(--font-mono); font-size:var(--text-md); line-height:1.8;"
			>
				<div class="crt-glow-title font-bold" style="color:var(--text-bright);">
					xianmalik@paperhouse
				</div>
				<div style="color:var(--text-dim); margin:2px 0 18px;">---------------------</div>
				<div style="white-space:pre-wrap;">{bootText}<span class="cursor-blink">_</span></div>
			</div>
		</div>
	</main>

	<Footer />
</div>
