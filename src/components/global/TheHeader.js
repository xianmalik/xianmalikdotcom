import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { UilSun, UilMoon } from "@iconscout/react-unicons";

import { classNames } from "@purpled/utils";

import XMLogo from "../../images/xm-logo.svg";

const main_menu = [
  { name: "ME", href: "me" },
  { name: "PROJECTS", href: "projects" },
  { name: "TECHNOLOGY", href: "technology" },
  { name: "EXPERIENCE", href: "experience" },
  { name: "CONTACT", href: "contact" },
];

function TheHeader(props) {
  const [theme, setTheme] = useState("light");

  // const changeTheme = () => {
  // 	const _t = theme === 'dark' ? 'light' : 'dark'
  // 	setTheme(_t)
  // 	localStorage.setItem('xmtheme', _t)
  // }

  // useEffect(() => {
  // 	if ( localStorage.getItem('xmtheme') ) {
  // 		setTheme(localStorage.getItem('xmtheme'))
  // 	} else {
  // 		localStorage.setItem('xmtheme', 'dark')
  // 	}
  // }, [])

  return (
    <header
      className={classNames(
        theme !== "dark"
          ? "bg-white text-xm-black-dark"
          : "bg-xm-black-dark text-white",
        "border-r border-gray-700 border-opacity-75 fixed left-0 top-0 h-screen w-20 flex flex-col transition-colors"
      )}
    >
      <div className="w-20 h-20 bg-xm-black-dark p-1 border-b border-xm-black-dark border-opacity-75 self-start flex items-center justify-center text-center text-lg font-serif">
        <img src={XMLogo} alt="Xian Malik" className="opacity-75" />
      </div>
      <nav className="w-20 flex flex-1 items-center px-4">
        <ul className="h-full min-w-max flex flex-col items-start justify-center gap-6 relative">
          {main_menu.map((el) => (
            <li
              key={el.href}
              className="inline-block overflow-visible transform translate-y-0 hover:-translate-y-2 border-b-2 border-transparent hover:border-gray-200 transition-all cursor-pointer"
            >
              <Link
                to={el.href}
                spy={true}
                smooth={true}
                duration={300}
                className="px-1 font-serif text-xs font-light tracking-widester"
              >
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        // onClick={changeTheme}
        className="w-full h-20 border-t border-gray-700 border-opacity-75 self-end flex items-center justify-center text-center text-opacity-75"
      >
        {theme === "dark" ? <UilMoon size="28" /> : <UilSun size="28" />}
      </button>
    </header>
  );
}

export default TheHeader;
