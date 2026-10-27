export interface Project {
	title: string;
	/** A year, or a word when the year is not on record (e.g. "Shipped") */
	year: number | string;
	href: string;
	/** Cover image. Without one, the tile shows a colored placeholder. */
	image?: string;
}

/** A project in the Selected work list. The first one is the feature and carries the case-study fields. */
export interface Work {
	name: string;
	client: string;
	year: string;
	kind: string;
	summary: string;
	problem?: string;
	approach?: string;
	impact?: { value: string; label: string }[];
	stack: string[];
	link?: string;
	image?: string;
	tone: 'ink' | 'signal' | 'paper';
}
