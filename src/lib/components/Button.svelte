<script>
	let props = $props();
</script>
<button
  {...props}
  class="relative m-3 inline-block overflow-visible min-w-[200px] border-2 border-black text-xs uppercase font-medium leading-none tracking-[3.6px] font-sans py-5 hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer">
  <slot />
  <span>
    <span class="[&>span]:absolute [&>span]:h-6 [&>span]:w-0.5">
      <span class="top-full right-full bg-gradient-to-b from-black to-transparent"></span>
      <span class="top-full left-full bg-gradient-to-b from-black to-transparent"></span>
      <span class="bottom-full right-full bg-gradient-to-t from-black to-transparent"></span>
      <span class="bottom-full left-full bg-gradient-to-t from-black to-transparent"></span>
    </span>
  
    <span class="[&>span]:absolute [&>span]:h-0.5 [&>span]:w-6">
      <span class="top-full right-full bg-gradient-to-l from-black to-transparent"></span>
      <span class="bottom-full right-full bg-gradient-to-l from-black to-transparent"></span>
      <span class="top-full left-full bg-gradient-to-r from-black to-transparent"></span>
      <span class="bottom-full left-full bg-gradient-to-r from-black to-transparent"></span>
    </span>
  </span>
</button>