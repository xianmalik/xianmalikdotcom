<script lang="ts">
import lifeData from '$content/life.json';
import { life } from '$content/sections.json';
import Button from '$lib/components/Button.svelte';
import FilmStrip from '$lib/components/FilmStrip.svelte';
import PhotoWall from '$lib/components/PhotoWall.svelte';
import type { FilmFrame, LifePhoto } from '$lib/types';

const strip = lifeData.strip as FilmFrame[];
const photos = lifeData.photos as LifePhoto[];
</script>

<div id="life" class="mx-auto py-8">
	<div class="mx-auto w-full max-w-[1120px] px-6 pt-12 md:px-10">
		<!-- Section Heading -->
		<div class="mb-10 flex flex-col items-center justify-center text-center font-sans">
			<div class="font-display text-6xl lowercase text-marker md:text-8xl">
				{life.title}
			</div>
			<div class="-mt-1 -rotate-1 font-handwriting text-xl text-ink">
				{life.subtitle}
			</div>
		</div>

	</div>

	<!-- Runs the full width of the screen, outside the measure -->
	<FilmStrip frames={strip} />

	<div class="mx-auto w-full max-w-[1120px] px-6 pt-10 pb-12 md:px-10">
		<PhotoWall {photos} />

		<!-- CTA Button -->
		<div class="mt-12 text-center">
			<Button href={life.cta.link}>
				{life.cta.text}
			</Button>
		</div>
	</div>
</div>
