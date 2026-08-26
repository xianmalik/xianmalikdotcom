<script lang="ts">
let {
	label,
	active = false,
	onclick
}: { label: string; active?: boolean; onclick: () => void } = $props();
</script>

<button
	type="button"
	{onclick}
	class="cursor-pointer border-0 bg-transparent p-0"
	class:crt-glow-text={active}
	style="font-family:var(--font-mono); font-size:var(--text-sm); color:{active ? 'var(--text-bright)' : 'var(--text-muted)'};"
>
	#{label}
</button>
