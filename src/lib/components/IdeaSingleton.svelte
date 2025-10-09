<script lang="ts">
	import Button from './Button.svelte';

	interface Project {
		name: string;
		tagline: string;
		excerpt: string;
		link: string;
		image: string;
		impact: string[];
		stack: string[];
	}

	let { project }: { project: Project } = $props();
</script>

<!-- <div class="relative aspect-[3/2] bg-shade/10"> -->
<div class="relative bg-shade/10">
	<div class="grid grid-cols-2">
		<!-- Content -->
		<div class="relative flex h-full flex-col justify-between p-6 text-black">
			<!-- Header Content -->
			<div class="mb-4">
				<div class="flex-1">
					<h2 class="mb-1 font-serif text-xl leading-tight font-medium md:text-3xl">
						{project.name}
					</h2>
					<p class="mb-2 font-sans text-sm tracking-[1px] text-black uppercase">
						{project.tagline}
					</p>
				</div>
				<p class="mt-2 font-sans text-sm text-shade">
					{project.excerpt}
				</p>
			</div>

			<!-- Footer Content -->
			<div class="space-y-2">
				<!-- Tech Stack -->
				<div class="flex flex-col flex-wrap items-start font-mono text-sm text-black uppercase">
					{#each project.impact as copy}
						<span class="px-2 py-1 font-mono text-sm leading-4 font-medium text-black">
							{copy}
						</span>
					{/each}
				</div>
				<!-- CTA -->
				<a
					href={project.link}
					rel="noopener noreferrer"
					class="group mt-2 inline-flex items-center gap-2 bg-white px-3 py-1 font-mono text-sm leading-4 font-medium text-black transition-all duration-300 hover:bg-shade/10"
				>
					<span>READ MORE</span>
					<span class=" text-center transition-transform duration-300 group-hover:translate-x-0.5"
						>→</span
					>
				</a>
			</div>
		</div>
		<div class="bg-shade px-10 pt-10 transition-all duration-300 hover:p-0">
			<img
				src={project.image}
				alt="Keys & Quests"
				class="h-full max-w-full object-cover opacity-90"
			/>
		</div>
	</div>

	<span>
		<span class="[&>span]:absolute [&>span]:h-6 [&>span]:w-0.5">
			<span class="top-0 right-0 bg-gradient-to-b from-shade to-transparent"></span>
			<span class="top-0 left-0 bg-gradient-to-b from-shade to-transparent"></span>
			<span class="right-0 bottom-0 bg-gradient-to-t from-shade to-transparent"></span>
			<span class="bottom-0 left-0 bg-gradient-to-t from-shade to-transparent"></span>
		</span>

		<span class="[&>span]:absolute [&>span]:h-0.5 [&>span]:w-6">
			<span class="top-0 right-0 bg-gradient-to-l from-shade to-transparent"></span>
			<span class="right-0 bottom-0 bg-gradient-to-l from-shade to-transparent"></span>
			<span class="top-0 left-0 bg-gradient-to-r from-shade to-transparent"></span>
			<span class="bottom-0 left-0 bg-gradient-to-r from-shade to-transparent"></span>
		</span>
	</span>
</div>
