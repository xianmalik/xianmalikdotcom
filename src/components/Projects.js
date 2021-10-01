import React from 'react'
import { useSpring, animated } from 'react-spring'

// Utils | Data
import { classNames } from '@utils'
import { ProjectsList } from '@data/projects'

export default function Projects() {
	const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
	const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 0, tension: 0, friction: 0 } }))

	return (
		<section
			id="projects"
			onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
			className="w-full min-h-screen bg-black bg-opacity-20 text-white grid items-center p-8">
			{/* <animated.div
				className="text-9xl -ml-8 font-black font-montserrat"
				style={{ transform: props.xy.interpolate((x, y) => `translate3d(${x / 50}px,${y / 50}px,0)`) }}>
				DAWN GROUP
			</animated.div> */}
			<div className="text-left mx-auto p-8 max-w-5xl">
				<h2 className="font-serif text-5xl font-black mb-8 text-left">
					Selected Works
				</h2>
				<div className="relative">
					{ProjectsList.map((prj, idx) => (
						<div className="grid grid-cols-2">
							<figure className={classNames(
								idx % 2 === 0 ? "order-first" : "order-last",
								"rounded-lg overflow-hidden"
							)}>
								<picture className="w-full object-cover object-top" style={{ aspectRatio: "6 / 4" }}>
									<source srcset={prj.thumb} media="(min-width: 900px)" />
									<img src={prj.thumb} alt={prj.title} className="w-full object-cover object-top" style={{ aspectRatio: "6 / 4" }} />
								</picture>
								<figcaption className="-mt-8 text-7xl text-purple-600 font-black font-montserrat">
									DAWN<br />GROUP
								</figcaption>
							</figure>
							{/* <figcaption className={classNames(idx % 2 === 1 ? "order-first" : "order-last")}>
								DAWN GROUP
							</figcaption> */}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}