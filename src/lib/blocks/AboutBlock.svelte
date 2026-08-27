<script lang="ts">
import { about } from '$content/sections.json';
import Button from '$lib/components/Button.svelte';
import Polaroid from '$lib/components/Polaroid.svelte';
</script>

<!-- Warps the paper edge only; lives outside .book-spread so nothing else inherits it -->
<svg width="0" height="0" aria-hidden="true" focusable="false" class="absolute">
	<filter id="paper-warp">
		<feTurbulence type="fractalNoise" baseFrequency="0.013 0.021" numOctaves="3" seed="7" result="noise" />
		<feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
	</filter>
</svg>

<div class="py-8 mx-auto">
	<div class="px-8 py-28 border-y border-ink/20 h-full">
		<div class="book-spread w-full max-w-[840px] mx-auto grid grid-cols-1 md:grid-cols-2 px-7 py-12 md:px-10 md:py-12">
			<!-- Left page — photos -->
			<div class="book-page photo-scatter justify-center md:pr-10 mb-10 md:mb-0">
				{#each about.photos as photo, i}
					<Polaroid
						src={photo.src}
						caption={photo.caption}
						tilt={photo.tilt}
						x={photo.x}
						y={photo.y}
						w={photo.w}
						tape={photo.tape}
						{i}
					/>
				{/each}
			</div>

			<!-- Right page — the words -->
			<div class="book-page flex flex-col justify-center md:pl-10">
				<div class="font-display text-5xl md:text-6xl lowercase text-marker leading-none">
					{about.title}
				</div>
				<div class="font-handwriting text-xl text-ink mt-2 -rotate-1">
					{about.subtitle}
				</div>

				<div class="font-sans text-[13.5px] leading-[21px] text-ink/70 mt-6">
					Hi, I'm Malik Zubayer Ul Haider
					<br />
					<br />
					I'm a software engineer focused on building high-performance, user-centric applications with
					React, Next.js, and Node.js. I've built products used by 40,000+ active users, improved
					performance metrics by 25-30%, and developed scalable CMS and booking platforms for startups
					and SMEs. I believe in clean architecture, consistent documentation, and performance-focused
					engineering. My goal is to bridge product vision with reliable technical execution, ensuring
					your ideas are delivered efficiently and scalably.
				</div>

				<div class="mt-6 -ml-3">
					<Button href={about.cta.link}>
						{about.cta.text}
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
