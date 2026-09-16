<script lang="ts">
import type { Project } from '$lib/types';

let { project, i = 0 }: { project: Project; i?: number } = $props();

const f = $derived(project.frame ?? {});
const place = $derived(f.caption ?? 'below');
</script>

<a
	class="archive-print"
	class:archive-print--side={place !== 'below'}
	class:archive-print--side-left={place === 'side-left'}
	href={project.link}
	target="_blank"
	rel="noopener noreferrer"
	style="--x: {f.x ?? 0}%; --y: {f.y ?? 0}%; --print-w: {f.w ?? 24}%; --tilt: {f.tilt ??
		0}deg; --i: {i}"
>
	<figure>
		<span class="archive-print__mat">
			<img
				src={project.image}
				alt={project.name}
				loading="lazy"
				style="aspect-ratio: {f.ratio ?? '3 / 4'}"
			/>
		</span>
		<figcaption class="archive-print__label font-mono">
			<span class="archive-print__name">{project.name}</span>
			<span class="archive-print__note">{project.excerpt}</span>
		</figcaption>
	</figure>
</a>
