import React from "react";
import Skeleton from "@layouts/Skeleton";

// Comopnents
import Button from "@components/core/Button";
import Divider from "@components/core/Divider";

// Sections
import ProjectsBlock from "@blocks/ProjectsBlock";

// Images
// import dp from "../images/dp.jpg";

function Index() {
  return (
    <Skeleton>
      <section
        className="h-screen w-full grid grid-cols-1 max-w-screen-2xl mx-auto items-center p-8"
        id="me"
      >
        <div className="mx-auto p-8 max-w-5xl">
          <h1 className="font-montserrat uppercase text-5xl leading-relaxed font-black mb-0">
            <span class="font-serif tracking-widester text-sm block">HELLO, I'M</span>
            Malik Zubayer Ul Haider.
          </h1>
          <Divider className="mx-auto" />
          <h4 className="text-md font-montserrat font-thin tracking-wide text-gray-400 mb-4 pt-2">
            Front-End Engineer with an undying{" "}
            <span role="img" aria-label="Heart">
              ❤
            </span>{" "}
            for JavaScript & Tea{" "}
            <span role="img" aria-label="Coffee">
              ☕
            </span>
          </h4>
          {/* <Button>PROJECTS</Button> */}
        </div>
        {/* <div className="p-8 h-full w-full flex items-center justify-center">
          <div className="relative border-opacity-40 h-96 w-96 flex items-center justify-center">
            <div className="absolute -top-4 -left-4 hover:top-0 hover:left-0 border-2 border-purple-700 border-opacity-40 h-full w-full transition-all"></div>
            <div className="absolute top-4 left-4 hover:top-0 hover:left-0 border-2 border-purple-700 border-opacity-40 h-full w-full transition-all"></div>
            <img src={dp} alt="Malik Zubayer Ul Haider" className="z-10" />
          </div>
        </div> */}
      </section>

      {/* Projects Section */}
      {/* <ProjectsBlock /> */}

      {/* <section>
        // footer + social + copyright
      </section> */}
    </Skeleton>
  );
}

export default Index;
