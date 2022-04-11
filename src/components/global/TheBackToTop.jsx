import React, { useState, useEffect } from "react";
import { IoArrowDown } from "react-icons/io5";
import { VscArrowDown } from "react-icons/vsc";
// Utils
import { classNames } from "@purpled/utils";

export default function TheBackToTop(props) {
  const [percent, setPercent] = useState(0);

  const scrollTop = () => {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const height = window.innerHeight;
    const percent = Math.round((top / height) * 100);
    return percent;
  };

  useEffect(() => {
    const handleScroll = () => {
      const p = scrollTop();
      setPercent(p);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-16 right-16 rounded-full z-50 text-white">
      <div className="relative flex items-center justify-center transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 300 300"
          className="absolute w-64 h-64 top-1/2 left-1/2"
          style={{
            transform: `translate(-50%,-50%) rotate(calc(${
              percent / 300
            }*1turn))`,
            transition: "transform .5s cubic-bezier(.215,.61,.355,1)",
          }}
        >
          <defs>
            <path
              fill="white"
              id="txt-path"
              d=" M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0"
            ></path>
          </defs>
          <text dy="0" fontSize="14">
            <textPath
              startOffset="0"
              xlinkHref="#txt-path"
              side="left"
              method="stretch"
              class="tracking-widest"
            >
              SCROLL DOWN •
            </textPath>
            <textPath
              startOffset="33.33%"
              xlinkHref="#txt-path"
              side="left"
              method="stretch"
              class="tracking-widest"
            >
              SCROLL DOWN •
            </textPath>
            <textPath
              startOffset="66.67%"
              xlinkHref="#txt-path"
              side="left"
              method="stretch"
              class="tracking-widest"
            >
              SCROLL DOWN •
            </textPath>
          </text>
        </svg>
        <button
          type="button"
          className="relative bg-gray-800 text-white h-20 w-20 rounded-full overflow-hidden text-center"
        >
          <span
            className={classNames("block absolute w-full bg-purple-500 top-0")}
            style={{
              height: `${percent}%`,
            }}
          ></span>
          <span className="relative z-10 w-full flex items-center justify-center">
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 21 14"
              className="h-6 w-6 text-white transform rotate-90"
            >
              <path d="M0 7.3999h19.2v-1.5H0z" className="fill-current"></path>
              <path
                d="M14.3999 12.9727l5.3383-6.18637L14.3999.6"
                stroke-width="1.5"
                className="stroke-current"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
