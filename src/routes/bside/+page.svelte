<script>
import AboutBlock from '$lib/bside/blocks/AboutBlock.svelte';
import FooterBlock from '$lib/bside/blocks/FooterBlock.svelte';
import LifeBlock from '$lib/bside/blocks/LifeBlock.svelte';
import PlayBlock from '$lib/bside/blocks/PlayBlock.svelte';
import SummaryBlock from '$lib/bside/blocks/SummaryBlock.svelte';
</script>

<svelte:head>
	<title>Side B — xianmalik</title>
	<meta name="description" content="The B side: keyboards, games, books and a life mostly off the clock." />
</svelte:head>

<!-- Work lives on side A now; ProjectBlock and IdeaBlock are kept but not shown here -->
<SummaryBlock />
<PlayBlock />
<LifeBlock />
<AboutBlock />
<FooterBlock />
