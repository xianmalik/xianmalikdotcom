'use client';

import {
  motion,
  useScroll,
  useSpring,
} from "framer-motion";

import styles from "./page.module.css";
import Summary from "./views/Summary";
import Projects from "./views/Projects";

export default function Home() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main>
      <Summary />
      <Projects />

      {/* Filler */}
      <div style={{ height: '2000px'}}></div>

      <div className={styles.progress}>
        <motion.div className={styles.progress__inner} style={{ scaleX }} />
      </div>
    </main>
  );
}
