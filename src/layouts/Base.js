import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import TheCursor from '@components/global/TheCursor';
import TheHeader from '@components/global/TheHeader';
import TheBackToTop from '@components/global/TheBackToTop';

import { classNames } from '@purpled/utils';

function Base(props) {
  // const [theme] = useState(localStorage.getItem('xmtheme'))
  const [theme] = 'light';

  return (
		<main className={classNames(
		  theme !== 'dark' ? 'bg-white text-xm-black-dark' : 'bg-xm-black-dark text-white',
		  ' h-full w-full',
		)}>
			<Helmet>
				<title>Xian Malik - A Front-End Engineer</title>
			</Helmet>
			<article>

				<TheHeader />
				{props.children}

			</article>

			{/* <TheCursor /> */}

			<TheBackToTop />
		</main>
  );
}

export default Base;
