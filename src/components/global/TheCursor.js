import React from 'react'
import useMousePosition from "@hooks/useMousePosition"

const TheCursor = () => {
	const { x, y } = useMousePosition();
	return (
		<>
			{/* <span
				style={{ left: `${x}px`, top: `${y}px` }}
				className="fixed top-0 left-0 h-10 w-10 border-2 border-white opacity-25 border-opacity-75 rounded-full -translate-x-1/2 -translate-y-1/2 transform z-50 transition-all duration-200 ease-out pointer-events-none"
			></span>
			<span
				className="fixed top-1/2 left-1/2 w-2 h-2 bg-white opacity-50 rounded-full -translate-x-1/2 -translate-y-1/2 transform z-50 pointer-events-none"
				style={{ left: `${x}px`, top: `${y}px` }}
			></span> */}
			<span
				style={{ left: `${x}px`, top: `${y}px` }}
				className="fixed top-0 left-0 h-12 w-12 border-2 border-xm-black-dark opacity-75 border-opacity-75 rounded-full -translate-x-1/2 -translate-y-1/2 transform z-50 transition-all duration-200 ease-out pointer-events-none"
			></span>
			<span
				className="fixed top-1/2 left-1/2 w-6 h-6 bg-xm-black-dark rounded-full opacity-75 -translate-x-1/2 -translate-y-1/2 transform z-50 pointer-events-none"
				style={{ left: `${x}px`, top: `${y}px` }}
			></span>
		</>
	);
};

export default TheCursor;
