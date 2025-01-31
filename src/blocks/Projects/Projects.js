import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

import styles from './Projects.module.css';

export default function Projects() {
  const { scrollYProgress } = useScroll();
  const progressL = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const progressR = useTransform(scrollYProgress, [0, 1], [200, -200]);

  const images = Array(20).fill({ src: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" });

  return (
    <section className={styles.main__wrapper} id="projects">
      <div className={styles.project__content}>
        <button className="btn-primary">
          VIEW PROJECTS
        </button>
      </div>
      <div className={styles.project}>
        <motion.div
          style={{ translateX: progressL }}
          className={styles.project__wrapper}
        >
          {images.map(({ src }, idx) => (
            <div className={styles.project__item} key={idx}>
              <Image src={src} width={300} height={200} alt="Image" />
            </div>
          ))}
        </motion.div>
        <motion.div
          style={{ translateX: progressR }}
          className={styles.project__wrapper}
        >
          {images.map(({ src }, idx) => (
            <div className={styles.project__item} key={idx}>
              <Image src={src} height={200} width={300} alt="Image" />
            </div>
          ))}
        </motion.div>
        <motion.div
          style={{ translateX: progressL }}
          className={styles.project__wrapper}
        >
          {images.map(({ src }, idx) => (
            <div className={styles.project__item} key={idx}>
              <Image src={src} width={300} height={200} alt="Image" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
