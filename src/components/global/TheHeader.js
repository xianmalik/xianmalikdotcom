import React, { useState } from 'react'
import { Link } from "react-scroll"
import {
	UilSun,
	UilMoon,
	UilAngleDoubleUp,
} from '@iconscout/react-unicons'

const main_menu = [
	{ name: "ME", href: "me" },
	{ name: "PROJECTS", href: "projects" },
	{ name: "TECHNOLOGY", href: "technology" },
	{ name: "EXPERIENCE", href: "experience" },
	{ name: "CONTACT", href: "contact" },
]

function TheHeader(props) {
	const [darkTheme, setDarkTheme] = useState(true)
	const changeTheme = () => {
		setDarkTheme(!darkTheme)
	}

	return (
		<nav className="bg-xm-black-dark border-r border-gray-700 border-opacity-75 text-white fixed left-0 top-0 h-screen w-20 flex flex-col">
			<div className="w-20 h-20 border-b border-gray-700 border-opacity-75 self-start flex items-center justify-center text-center text-lg font-serif">
				XM
			</div>
			<div className="w-20 flex flex-1 items-center px-4">
				<ul className="h-full min-w-max flex flex-col items-start justify-center gap-6 relative">
					{/* style={{ textOrientation: 'upright', writingMode: 'vertical-lr' }} */}
					{main_menu.map(el =>
						<li key={el.href} className="inline-block overflow-visible transform translate-y-0 hover:-translate-y-2 border-b-2 border-transparent hover:border-gray-200 transition-all cursor-pointer">
							{/* <li key={el.href} className="w-full flex items-center"> */}
							{/* <span className="block w-4 h-0.5"></span> */}
							<Link
								to={el.href}
								spy={true}
								smooth={true}
								duration={300}
								className="px-1 font-serif text-xs font-light tracking-widester">
								{el.name}
							</Link>
						</li>
					)}
				</ul>
			</div>
			<button
				onClick={changeTheme}
				className="w-full h-20 border-t border-gray-700 border-opacity-75 self-end flex items-center justify-center text-center">
				<Link to="me"
					spy={true}
					smooth={true}
					duration={300}>
					{darkTheme ? (
						<UilMoon size="28" className="text-white text-opacity-75" />
					) : (
						<UilSun size="28" className="text-white text-opacity-75" />
					)}
				</Link>
			</button>
		</nav>
	);
}

export default TheHeader;
