import React from 'react'
import Base from '@layouts/Base'
import { Link } from "react-scroll"

import dp from '../images/dp.jpg'
import placeholder from '../images/placeholder.png'

function Index() {
	return (
		<Base>
			<section className="h-screen w-full grid grid-cols-2 max-w-screen-2xl mx-auto items-center p-8" id="me">
				<div className="text-left mx-auto p-8 max-w-5xl">
					<h1 className="font-serif text-5xl font-black mb-4">
						Hello, I'm<br />
						Malik Zubayer Ul Haider.
					</h1>
					<h4 className="text-lg tracking-wide text-gray-400 mb-4">Front-End Developer with an undying <span role="img" aria-label="Heart">❤</span> for JavaScript & Coffee <span role="img" aria-label="Coffee">☕</span></h4>
					<Link
						to="projects"
						spy={true}
						smooth={true}
						duration={300}
						className="text-sm tracking-widester text-gray-300 font-medium font-serif uppercase border border-gray-300 px-6 py-1.5 rounded-full hover:bg-gray-300 hover:text-black transition-colors cursor-pointer">
						PROJECTS
					</Link>
				</div>
				<div className="p-8 h-full w-full flex items-center justify-center">
					<div className="relative border-opacity-40 h-96 w-96 flex items-center justify-center">
						<div className="absolute -top-4 -left-4 hover:top-0 hover:left-0 border-2 border-purple-700 border-opacity-40 h-full w-full transition-all"></div>
						<div className="absolute top-4 left-4 hover:top-0 hover:left-0 border-2 border-purple-700 border-opacity-40 h-full w-full transition-all"></div>
						<img src={dp} alt="Malik Zubayer Ul Haider" className="z-10" />
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section className="w-full h-screen bg-xm-black bg-opacity-20 text-white grid items-center p-8" id="projects">
				<div className="text-left mx-auto p-8 max-w-5xl">
					<h2 className="font-serif text-5xl font-black mb-8 text-center">
						Projects
					</h2>
					<div className="grid grid-cols-3 gap-4 relative">
						<img src={placeholder} alt="placeholder" />
						<img src={placeholder} alt="placeholder" />
						<img src={placeholder} alt="placeholder" />
						<img src={placeholder} alt="placeholder" />
						<img src={placeholder} alt="placeholder" />
						<img src={placeholder} alt="placeholder" />
						<img src={placeholder} alt="placeholder" />
						<img src={placeholder} alt="placeholder" />
					</div>
				</div>
			</section>
		</Base>
	);
}

export default Index;
