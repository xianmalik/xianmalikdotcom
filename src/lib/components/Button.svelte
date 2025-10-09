<script>
	let { children, ...props } = $props();
</script>

<button
	{...props}
	class="relative m-3 inline-block min-w-[200px] cursor-pointer overflow-visible border-2 border-shade py-4 font-serif text-sm leading-none font-medium tracking-[2px] text-black uppercase transition-colors duration-300"
>
	<!-- class="relative m-3 inline-block min-w-[200px] cursor-pointer overflow-visible border-2 border-shade py-5 font-sans text-xs leading-none font-medium tracking-[3.6px] text-black uppercase transition-colors duration-300" -->
	{@render children()}
	<span>
		<span class="[&>span]:absolute [&>span]:h-6 [&>span]:w-0.5">
			<span class="top-full right-full bg-gradient-to-b from-shade to-transparent"></span>
			<span class="top-full left-full bg-gradient-to-b from-shade to-transparent"></span>
			<span class="right-full bottom-full bg-gradient-to-t from-shade to-transparent"></span>
			<span class="bottom-full left-full bg-gradient-to-t from-shade to-transparent"></span>
		</span>

		<span class="[&>span]:absolute [&>span]:h-0.5 [&>span]:w-6">
			<span class="top-full right-full bg-gradient-to-l from-shade to-transparent"></span>
			<span class="right-full bottom-full bg-gradient-to-l from-shade to-transparent"></span>
			<span class="top-full left-full bg-gradient-to-r from-shade to-transparent"></span>
			<span class="bottom-full left-full bg-gradient-to-r from-shade to-transparent"></span>
		</span>
	</span>
</button>
