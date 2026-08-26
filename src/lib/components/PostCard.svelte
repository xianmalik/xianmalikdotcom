<script lang="ts">
let {
	title,
	date,
	excerpt,
	tags,
	href
}: { title: string; date: string; excerpt: string; tags: string[]; href: string } = $props();
</script>

<a
	{href}
	class="block py-5 transition-opacity duration-150 hover:opacity-75"
	style="text-decoration:none; color:var(--text-primary); font-family:var(--font-mono);"
>
	<div style="font-size:var(--text-xs); color:var(--text-dim); margin-bottom:6px;">{date}</div>
	<div class="crt-glow-title font-bold" style="font-size:var(--text-md); color:var(--text-bright); margin-bottom:8px;">
		&gt; {title}
	</div>
	<p style="font-size:var(--text-sm); color:var(--text-muted); line-height:var(--leading-normal); margin:0 0 12px;">
		{excerpt}
	</p>
	<div class="flex flex-wrap gap-3">
		{#each tags as tag (tag)}
			<span style="font-size:var(--text-xs); color:var(--text-muted);">#{tag}</span>
		{/each}
	</div>
</a>
