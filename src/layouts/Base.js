import React, { useState } from "react";
import { Helmet } from "react-helmet";

import TheCursor from "@components/global/TheCursor";
import TheHeader from "@components/global/TheHeader";
import TheBackToTop from "@components/global/TheBackToTop";

import { classNames } from "@purpled/utils";

import { nav_menu } from "@data";

function Base(props) {

  return (
    <main className="bg-xm-black-dark text-white h-full w-full font-montserrat">
      <Helmet>
        <title>Xian Malik - A Front-End Engineer</title>
      </Helmet>
      <article>
        <TheHeader menu={nav_menu} />
        {props.children}
      </article>

      <TheCursor />

      <TheBackToTop />
    </main>
  );
}

export default Base;
