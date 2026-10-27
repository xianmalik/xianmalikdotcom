<script lang="ts">
import InfiniteGrid from '$lib/site/InfiniteGrid.svelte';
import Contact from '$lib/site/components/Contact.svelte';
import Experience from '$lib/site/components/Experience.svelte';
import Intro from '$lib/site/components/Intro.svelte';
import Marquee from '$lib/site/components/Marquee.svelte';
import Topbar from '$lib/site/components/Topbar.svelte';
import Work from '$lib/site/components/Work.svelte';
import projects from '$lib/site/content/projects.json';
import type { Project } from '$lib/site/types';
</script>

<svelte:head>
	<title>Malik Zubayer Ul Haider — Senior Software Engineer</title>
	<meta
		name="description"
		content="Full-stack TypeScript engineer building fast, type-safe web platforms with React, Next.js and Node.js. Based in Dhaka."
	/>
</svelte:head>

<section class="relative h-dvh overflow-hidden">
	<InfiniteGrid projects={projects as Project[]} />

	<Topbar />

	<div class="pointer-events-none absolute inset-0 grid place-items-center p-4">
		<div class="border border-ivory/20 bg-canvas/40 px-8 py-6 backdrop-blur-sm sm:px-12 sm:py-8">
			<h1 class="text-center text-[clamp(1.75rem,3.5vw,3.25rem)] leading-none uppercase">
				Malik<br />Zubayer
			</h1>
			<p class="mt-3 text-center text-[11px] tracking-[0.16em] text-ivory/60 uppercase">
				Senior Software Engineer
			</p>
		</div>
	</div>
</section>

<main>
	<Intro />
	<Marquee />
	<Work />
	<Experience />
</main>
<Contact />
