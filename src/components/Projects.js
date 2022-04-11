import React from "react";

// Utils | Data
import { classNames } from "@purpled/utils";
import { ProjectsList } from "@data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full min-h-screen bg-black bg-opacity-20 text-white grid items-center p-8"
    >
      <div className="text-left mx-auto p-8 max-w-5xl">
        <h2 className="font-serif text-5xl font-black mb-8 text-left">
          Selected Works
        </h2>
        <div className="relative">
          {ProjectsList.map((prj, idx) => (
            <div className="grid grid-cols-2" key={idx}>
              <figure
                className={classNames(
                  idx % 2 === 0 ? "order-first" : "order-last",
                  "rounded-lg overflow-hidden"
                )}
              >
                <picture
                  className="w-full object-cover object-top"
                  style={{ aspectRatio: "6 / 4" }}
                >
                  <source srcSet={prj.thumb} media="(min-width: 900px)" />
                  <img
                    src={prj.thumb}
                    alt={prj.title}
                    className="w-full object-cover object-top"
                    style={{ aspectRatio: "6 / 4" }}
                  />
                </picture>
                <figcaption className="-mt-8 text-7xl text-purple-600 font-black font-montserrat">
                  DAWN
                  <br />
                  GROUP
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
  );
}
