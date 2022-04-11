import React from "react";
import Base from "@layouts/Base";
import { Link } from "react-scroll";

// Comopnents
import Button from "@components/core/Button";
import Divider from "@components/core/Divider";

// Sections
import Projects from "@components/Projects";

// Images
import dp from "../images/dp.jpg";

function Index() {
  return (
    <Base>
      <section
        className="h-screen w-full grid grid-cols-2 max-w-screen-2xl mx-auto items-center p-8"
        id="me"
      >
        <div className="text-left mx-auto p-8 max-w-5xl">
          <h1 className="font-serif text-5xl leading-relaxed font-black mb-0">
            Hello, I'm
            <br />
            Malik Zubayer Ul Haider.
          </h1>
          <Divider />
          <h4 className="text-lg tracking-wide text-gray-400 mb-4 pt-2">
            Front-End Developer with an undying{" "}
            <span role="img" aria-label="Heart">
              ❤
            </span>{" "}
            for JavaScript & Coffee{" "}
            <span role="img" aria-label="Coffee">
              ☕
            </span>
          </h4>
          <Button>PROJECTS</Button>

          {/* <Link
						to="projects"
						spy={true}
						smooth={true}
						duration={300}
						className="text-sm tracking-widester text-gray-300 font-medium font-serif uppercase border border-gray-300 px-6 py-1.5 rounded-full hover:bg-gray-300 hover:text-black transition-colors cursor-pointer">
						PROJECTS
					</Link> */}
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
      <Projects />
    </Base>
  );
}

export default Index;
