<script lang="ts">
	import { about } from '$content/sections.json';
	import Button from '$lib/components/Button.svelte';
</script>

<!-- <div class="py-8 mx-auto min-h-[calc(100svh-48px)] flex flex-col"> -->
<div class="py-8 mx-auto">
	<div class="px-8 py-28 border-y border-[#00002D]/10 h-full">
		<div class="w-full max-w-[840px] bg-[url('/bg-lines-paper.png')] bg-cover bg-center pb-12 h-full mx-auto">
			<!-- Section Heading -->
			<div class="flex flex-col items-center justify-center text-center font-sans mb-8">
				<div class="font-display text-4xl md:text-9xl lowercase -mt-11">
					{about.title}
				</div>	
				<div class="font-handwriting text-3xl -mt-4 -rotate-1">
					{about.subtitle}
				</div>
				<div class="font-sans text-base leading-[24px] text-shade mt-12 text-left max-w-xl">
					Hi, I'm Malik Zubayer Ul Haider
					<br>
					<br>
					I'm a software engineer focused on building high-performance, user-centric applications with React, Next.js, and Node.js. I've built products used by 40,000+ active users, improved performance metrics by 25-30%, and developed scalable CMS and booking platforms for startups and SMEs.
					I believe in clean architecture, consistent documentation, and performance-focused engineering. My goal is to bridge product vision with reliable technical execution, ensuring your ideas are delivered efficiently and scalably.
				</div>
			</div>

			<!-- CTA Button -->
			<div class="text-center">
				<Button href={about.cta.link}>
					{about.cta.text}
				</Button>
			</div>
		</div>
	</div>
</div>
