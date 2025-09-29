<script lang="ts">
	import data from '$content/summary.json';
</script>

<!-- <div class="py-8 mx-auto min-h-[calc(100svh-48px)] flex flex-col"> -->
<div class="py-8 mx-auto">
	<div class="px-8 py-28 border-y border-[#00002D]/10 h-full">
		<div class="w-full max-w-[840px] h-full mx-auto">
			<div class="flex flex-col items-center justify-center text-center font-sans py-12">
				<div class="font-handwriting text-3xl text-gray-500 mb-6 -rotate-2">
					Hi I'm {data.name}
				</div>
				<div class="mb-8">
					<img
						src={data.avatar}
						alt={data.name}
						class="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
					/>
				</div>
				<h3 class="font-display text-4xl font-bold mb-6 text-black leading-tight whitespace-pre-line">
					{data.tagline}
				</h3>
				<p class="font-handwriting text-3xl text-shade leading-none font-light rotate-1 whitespace-pre-line">
					{data.description}
				</p>
			</div>
		</div>
	</div>
</div>
