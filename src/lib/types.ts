/** Layout data for a print on the portfolio archive sheet. */
export interface Frame {
	/** Position and width as a % of the sheet, so the scatter scales with it. */
	x?: number;
	y?: number;
	w?: number;
	/** CSS aspect-ratio for the print itself, e.g. "3 / 4". */
	ratio?: string;
	/** Where the label sits: under the print, or set vertically beside it. */
	caption?: 'below' | 'side-left' | 'side-right';
	tilt?: number;
}

export interface Project {
	name: string;
	excerpt: string;
	link: string;
	image: string;
	stack: string[];
	frame?: Frame;
}

/** One print on the life wall. The photo runs at its own proportions —
    nothing is cropped — so size and shape come from the picture itself. */
export interface LifePhoto {
	src: string;
	caption: string;
	/** Quartz date-back stamp, burnt into the corner of the print. */
	date?: string;
	/** Intrinsic pixel size. Optional, but supplying it reserves the right
	    space before the photo loads instead of shifting the wall. */
	width?: number;
	height?: number;
	/** Overrides the tilt the wall would pick for this print. */
	tilt?: number;
}

export interface FilmFrame {
	src: string;
	caption: string;
}
