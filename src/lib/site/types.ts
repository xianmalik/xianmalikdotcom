export interface Project {
	title: string;
	year: number;
	href: string;
	/** Cover image. Without one, the tile shows a colored placeholder. */
	image?: string;
}
