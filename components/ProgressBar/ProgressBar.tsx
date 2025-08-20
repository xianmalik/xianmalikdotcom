'use client'

import { motion, useScroll, useSpring } from "framer-motion";

import styles from "./ProgressBar.module.css";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={styles.progress}>
      <motion.div className={styles.progress__inner} style={{ scaleX }} />
    </div>
  );
}
