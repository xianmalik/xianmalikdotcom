import React from "react";
import { Link } from "react-scroll";

import { classNames } from "@purpled/utils";

import Logo from "../../images/xian-malik-2.svg";

function TheHeader({
  menu
}) {
  return (
    <header
      className={classNames(
        "bg-xm-black-dark text-white",
        "border-r border-gray-700 border-opacity-75 fixed left-0 top-0 w-full h-20",
        "flex flex-row items-center justify-between transition-colors z-50"
      )}
    >
      <a
        href="/"
        className="bg-xm-black-dark p-2 border-b border-xm-black-dark border-opacity-75 self-start flex items-center justify-center text-center text-lg font-serif">
        <img src={Logo} alt="Xian Malik" className="opacity-75 p-4 h-auto w-40" />
      </a>
      <nav className="w-20 flex flex-1 items-center px-4">
        <ul className="h-full min-w-max flex flex-row items-center justify-end gap-6 relative flex-1">
          {menu.map((el) => (
            <li
              key={el.href}
              className={classNames(
                "inline-block overflow-visible",
                "hover:border-gray-200 hover:border-opacity-50 border border-transparent",
                "transition-all cursor-pointer px-2 py-0.5",
                "hover:-translate-y-0.5"
              )}
            >
              <Link
                to={el.href}
                spy={true}
                smooth={true}
                duration={300}
                className="px-1 font-serif text-xs font-light tracking-widester text-white uppercase"
              >
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default TheHeader;
