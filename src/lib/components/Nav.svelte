<script lang="ts">
import { theme } from '$lib/theme.svelte';

let { active }: { active: 'about' | 'blog' } = $props();
</script>

<nav
	class="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5"
	style="font-family:var(--font-mono); font-size:var(--text-sm);"
>
	<div class="crt-glow-title font-bold whitespace-nowrap" style="color:var(--text-bright);">
		xianmalik@paperhouse<span class="cursor-blink">_</span>
	</div>
	<div class="flex flex-1 justify-center gap-6">
		<a href="/" style="text-decoration:none; color:{active === 'about' ? 'var(--text-bright)' : 'var(--text-muted)'};">
			{active === 'about' ? '[about]' : 'about'}
		</a>
		<a href="/blog" style="text-decoration:none; color:{active === 'blog' ? 'var(--text-bright)' : 'var(--text-muted)'};">
			{active === 'blog' ? '[blog]' : 'blog'}
		</a>
		<a href="#contact" style="text-decoration:none; color:var(--text-muted);">contact</a>
	</div>
	<button
		onclick={() => theme.toggle()}
		class="cursor-pointer whitespace-nowrap rounded-[3px] px-2.5 py-1.5"
		style="background:transparent; border:1px solid var(--border-default); color:var(--text-muted); font-family:var(--font-mono); font-size:var(--text-xs);"
	>
		--theme={theme.current}
	</button>
</nav>
