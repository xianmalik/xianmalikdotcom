<script lang="ts">
import Nav from '$lib/components/Nav.svelte';
import Footer from '$lib/components/Footer.svelte';
import PostCard from '$lib/components/PostCard.svelte';
import Tag from '$lib/components/Tag.svelte';
import { theme } from '$lib/theme.svelte';
import posts from '$content/posts.json';

const allTags = [...new Set(posts.flatMap((p) => p.tags))];

let activeTag: string | null = $state(null);

const filteredPosts = $derived(
	activeTag ? posts.filter((p) => p.tags.includes(activeTag as string)) : posts
);
const postCountLabel = $derived(
	`${filteredPosts.length} post${filteredPosts.length === 1 ? '' : 's'}${activeTag ? ` tagged #${activeTag}` : ''}`
);

function toggleTag(tag: string) {
	activeTag = activeTag === tag ? null : tag;
}
</script>

<svelte:head>
	<title>xianmalik@paperhouse — blog</title>
</svelte:head>

<div class="crt-screen flex min-h-screen flex-col" data-theme={theme.current} data-screen-label="Blog Index">
	<Nav active="blog" />

	<main class="flex-1 px-6 py-12">
		<div class="mx-auto max-w-[960px]">
			<div class="crt-glow-title mb-2 font-bold" style="font-family:var(--font-mono); color:var(--text-bright); font-size:var(--text-lg);">
				$ ls posts/
			</div>
			<div class="mb-8" style="font-family:var(--font-mono); color:var(--text-dim); font-size:var(--text-xs);">
				{postCountLabel}
			</div>

			<div class="mb-8 flex flex-wrap gap-2">
				{#each allTags as tag (tag)}
					<Tag label={tag} active={activeTag === tag} onclick={() => toggleTag(tag)} />
				{/each}
			</div>

			<div class="flex max-w-[720px] flex-col gap-2">
				{#each filteredPosts as post (post.slug)}
					<PostCard title={post.title} date={post.date} excerpt={post.excerpt} tags={post.tags} href="/blog/{post.slug}" />
				{/each}
			</div>
		</div>
	</main>

	<Footer />
</div>
