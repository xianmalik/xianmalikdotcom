<!--
	Site menu — a notepad pinned to the top of the page. Closed it's just the top bar;
	open, a page hinged to the bar folds out below it with the handwritten links.
-->
<script lang="ts">
import { menu } from '$content/sections.json';
import HighlightSwipe from '$lib/components/HighlightSwipe.svelte';
import { scroller } from '$lib/scroll';
import { tick } from 'svelte';

let open = $state(false);
let toggle: HTMLButtonElement;
let sheet: HTMLDivElement;

const year = new Date().getFullYear();

const show = async () => {
	open = true;
	// hold the page still underneath the notepad
	scroller.lenis?.stop();
	await tick();
	sheet.querySelector('a')?.focus({ preventScroll: true });
};

const hide = (restoreFocus = true) => {
	open = false;
	scroller.lenis?.start();
	if (restoreFocus) toggle.focus({ preventScroll: true });
};

const onKeydown = (event: KeyboardEvent) => {
	if (open && event.key === 'Escape') hide();
};

const go = (event: MouseEvent, href: string) => {
	event.preventDefault();
	if (open) hide(false);

	const target = href === '#top' ? 0 : document.querySelector<HTMLElement>(href);
	if (target === null) return;

	if (scroller.lenis) {
		scroller.lenis.scrollTo(target);
	} else if (typeof target === 'number') {
		window.scrollTo({ top: target, behavior: 'smooth' });
	} else {
		target.scrollIntoView({ behavior: 'smooth' });
	}
};
</script>

<svelte:window onkeydown={onKeydown} />

<button
	type="button"
	class="menu-scrim"
	class:open
	aria-label="Close menu"
	aria-hidden={!open}
	tabindex="-1"
	onclick={() => hide(false)}
></button>

<header class="site-menu" class:open>
	<div class="notepad">
		<div class="notepad__bar">
			<a href="#top" class="notepad__name font-wordmark" onclick={(event) => go(event, '#top')}>
				{menu.name}
			</a>
			<button
				bind:this={toggle}
				type="button"
				class="notepad__toggle"
				aria-expanded={open}
				aria-controls="site-menu-sheet"
				onclick={() => (open ? hide() : show())}
			>
				{open ? 'close' : 'menu'}
			</button>
		</div>

		<div bind:this={sheet} id="site-menu-sheet" class="notepad__sheet" inert={!open}>
			<div class="notepad__clip">
				<div class="notepad__page">
					<nav aria-label="Main" class="notepad__nav">
						<ol class="notepad__list">
							{#each menu.items as item, i}
								<li style="--i: {i}">
									<a href={item.href} class="notepad__item" onclick={(event) => go(event, item.href)}>
										<HighlightSwipe class="notepad__swipe" />
										<span class="notepad__text">{item.label}</span>
									</a>
								</li>
							{/each}
						</ol>
					</nav>

					<div class="notepad__foot">
						<span>© {year}</span>
						<span class="notepad__hint">esc to close</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>

<style>
	.site-menu {
		--ease: cubic-bezier(0.23, 1, 0.32, 1);

		position: fixed;
		top: 16px;
		left: 50%;
		z-index: 50;
		width: min(420px, calc(100% - 32px));
		transform: translateX(-50%);
	}

	.menu-scrim {
		position: fixed;
		inset: 0;
		z-index: 40;
		border: 0;
		background: rgb(33 33 33 / 16%);
		backdrop-filter: blur(3px);
		-webkit-backdrop-filter: blur(3px);
		cursor: default;
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		/* gone almost instantly on close */
		transition:
			opacity 0.1s ease,
			visibility 0s linear 0.1s;
	}

	.menu-scrim.open {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		transition:
			opacity 0.25s ease,
			visibility 0s;
	}

	/* ── The paper ─────────────────────────────────────────────── */
	.notepad {
		position: relative;
	}

	.notepad__bar,
	.notepad__clip {
		background-color: var(--color-notepad);
		/* faint grain so it reads as paper, not a panel; the white wash keeps it from greying the sheet */
		background-image:
			linear-gradient(rgb(255 255 255 / 60%), rgb(255 255 255 / 60%)),
			url('/noise.png');
		background-size: auto, 256px 256px;
		background-blend-mode: normal, soft-light;
	}

	.notepad__bar {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 56px;
		padding-inline: 22px 18px;
		border-radius: 18px;
		box-shadow:
			0 0 0 1px rgb(40 48 66 / 12%),
			0 1px 0 rgb(255 255 255 / 70%) inset,
			0 2px 4px rgb(40 48 66 / 7%),
			0 22px 44px -22px rgb(40 48 66 / 34%);
		/* round the corners back only once the page has folded away */
		transition:
			border-radius 0.1s ease 0.16s,
			box-shadow 0.15s ease 0.12s;
	}

	/* the page hangs off the bar, so its lower corners square off and its drop shadow goes */
	.open .notepad__bar {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		box-shadow:
			0 0 0 1px rgb(40 48 66 / 12%),
			0 1px 0 rgb(255 255 255 / 70%) inset;
		transition-delay: 0s;
	}

	.notepad__name {
		font-size: 28px;
		line-height: 1;
		color: #000;
		text-decoration: none;
	}

	.notepad__toggle {
		padding: 8px 4px;
		border: 0;
		background: none;
		cursor: pointer;
		font-family: var(--font-mono);
		font-size: 12px;
		line-height: 1;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-ink);
		transition: color 0.25s ease;
	}

	.notepad__toggle:hover {
		color: var(--color-marker);
	}

	.notepad__name:focus-visible,
	.notepad__toggle:focus-visible,
	.notepad__item:focus-visible {
		outline: 2px solid var(--color-marker);
		outline-offset: 3px;
		border-radius: 4px;
	}

	/* Hinged along the bar's bottom edge */
	.notepad__sheet {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		perspective: 1200px;
		perspective-origin: 50% 0%;
		pointer-events: none;
	}

	.open .notepad__sheet {
		pointer-events: auto;
	}

	/* Folded up edge-on behind the bar; swings down from the back to lie flat */
	.notepad__clip {
		position: relative;
		overflow: hidden;
		border-radius: 0 0 18px 18px;
		transform-origin: top center;
		transform: rotateX(-90deg);
		backface-visibility: hidden;
		visibility: hidden;
		box-shadow:
			0 0 0 1px rgb(40 48 66 / 12%),
			0 2px 4px rgb(40 48 66 / 7%),
			0 22px 44px -22px rgb(40 48 66 / 34%);
		/* closing is a quick snap shut */
		transition:
			transform 0.18s cubic-bezier(0.55, 0, 0.75, 0.2),
			visibility 0s linear 0.18s;
	}

	.open .notepad__clip {
		transform: rotateX(0deg);
		visibility: visible;
		/* a touch of overshoot, like paper settling */
		transition:
			transform 0.8s cubic-bezier(0.22, 1.25, 0.36, 1),
			visibility 0s;
	}

	/* Crease shading: dark while the page is still tilted, gone once it's flat */
	.notepad__clip::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: linear-gradient(to bottom, rgb(40 48 66 / 30%), rgb(40 48 66 / 10%));
		transition: opacity 0.15s ease;
	}

	.open .notepad__clip::after {
		opacity: 0;
		transition: opacity 0.7s ease 0.05s;
	}

	.notepad__page {
		display: flex;
		flex-direction: column;
		height: min(560px, calc(100svh - 104px));
	}

	/* Links sit in the middle of the blank page */
	.notepad__nav {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
	}

	.notepad__list {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		margin: 0;
		padding: 0;
		list-style: none;
		text-align: center;
	}

	/* Items write themselves in, one after the next */
	.notepad__list li {
		opacity: 0;
		transform: translateY(8px);
		/* vanish at once on close */
		transition:
			opacity 0.08s ease,
			transform 0.08s ease;
	}

	.open .notepad__list li {
		opacity: 1;
		transform: none;
		transition:
			opacity 0.3s ease,
			transform 0.45s var(--ease);
		transition-delay: calc(140ms + var(--i) * 45ms);
	}

	.notepad__item {
		position: relative;
		isolation: isolate;
		display: inline-block;
		padding: 4px 6px;
		font-family: var(--font-handwriting);
		font-size: 22px;
		line-height: 1.3;
		color: color-mix(in oklab, var(--color-ink) 72%, transparent);
		text-decoration: none;
		transition: color 0.25s ease;
	}

	.notepad__text {
		position: relative;
	}

	/* The pen stroke, revealed left to right */
	.notepad__item :global(.notepad__swipe) {
		position: absolute;
		left: -0.2em;
		bottom: 0.3em;
		z-index: -1;
		width: calc(100% + 0.4em);
		height: 0.7em;
		transform: rotate(-1.5deg);
		clip-path: inset(0 100% 0 0);
		transition: clip-path 0.45s var(--ease);
	}

	.notepad__item:hover,
	.notepad__item:focus-visible {
		color: var(--color-ink);
	}

	.notepad__item:hover :global(.notepad__swipe),
	.notepad__item:focus-visible :global(.notepad__swipe) {
		clip-path: inset(0 0 0 0);
	}

	.notepad__foot {
		display: flex;
		justify-content: center;
		gap: 16px;
		padding: 14px 22px 18px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-shade);
	}

	@media (hover: none) {
		.notepad__hint {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.notepad__bar,
		.notepad__clip,
		.notepad__clip::after,
		.notepad__list li,
		.notepad__item :global(.notepad__swipe) {
			transition: none;
		}
	}
</style>
