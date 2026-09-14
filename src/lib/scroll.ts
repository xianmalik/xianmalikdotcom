import type Lenis from 'lenis';

// The layout owns the Lenis instance; components that need to pause or drive scrolling reach it here
export const scroller: { lenis: Lenis | null } = { lenis: null };
