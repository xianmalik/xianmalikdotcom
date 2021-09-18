import React from 'react';
import { Helmet } from 'react-helmet';
import "@fontsource/roboto";
import "@fontsource/merriweather";

import TheCursor from "@components/global/TheCursor"
import TheHeader from "@components/global/TheHeader"

function Base(props) {
	return (
		<main className="bg-xm-black-dark text-white h-full w-full">
			<Helmet>
				<title>Xian Malik - A Front-End Engineer</title>
			</Helmet>

			<TheHeader />

			{props.children}

			<TheCursor />
		</main>
	);
}

export default Base;
