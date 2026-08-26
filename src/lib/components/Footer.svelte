<script lang="ts">
import profile from '$content/profile.json';
</script>

<footer
	id="contact"
	class="flex flex-wrap items-center justify-between gap-3 px-6 py-6"
	style="font-size:var(--text-xs); color:var(--text-dim); font-family:var(--font-mono);"
>
	<span>// xianmalik@paperhouse — est. 2019. all rights reserved.</span>
	<div class="flex gap-4">
		<a
			href={profile.links.github}
			target="_blank"
			rel="noopener noreferrer"
			style="text-decoration:none; color:var(--text-muted);">github</a
		>
		<a href="mailto:{profile.links.email}" style="text-decoration:none; color:var(--text-muted);"
			>email</a
		>
	</div>
</footer>
