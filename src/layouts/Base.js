import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

import TheCursor from "@components/global/TheCursor"
import TheHeader from "@components/global/TheHeader"

import { classNames } from '@utils'

function Base(props) {
	const [theme] = useState(localStorage.getItem('xmtheme'))

	return (
		<main className={classNames(
			theme === 'dark' ? "bg-xm-black-dark text-white" : "bg-white text-xm-black-dark",
			" h-full w-full",
		)}>
			<Helmet>
				<title>Xian Malik - A Front-End Engineer</title>
			</Helmet>
			<article>

				<TheHeader />
				{props.children}

			</article>

			<TheCursor />
		</main>
	);
}

export default Base;
