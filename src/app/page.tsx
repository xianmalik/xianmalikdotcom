'use client';

// Section Views
import Summary from "@/blocks/Summary/Summary";
import Projects from "@/blocks/Projects/Projects";
import Skills from "@/blocks/Skills/Skills";

export default function Home() {
  return (
    <>
      <Summary />
      <Projects />
      <Skills />

      {/* Filler */}
      <div style={{ height: '2000px'}}></div>

    </>
  );
}
