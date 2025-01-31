import { motion } from 'framer-motion';
import styles from './Summary.module.css';

function Pop({ delay = 0, children }) {
  return (
    <>
      <motion.div
        className={styles.focus}
        initial={{ opacity: 0, y: 50 }} // Initial position: faded out and slightly below
        animate={{ opacity: 1, y: 0 }} // Animation to fade in and slide up
        exit={{ opacity: 0, y: 50 }} // Exit animation
        transition={{ duration: 0.3, delay }}
      // variants={{
      //   visible: { opacity: 1, y: 0 },
      //   hidden: { opacity: 0, y: 10 }
      // }}
      >
        {children}
      </motion.div>
    </>
  )
}

export default function Summary() {
  return (
    <>
      <div className={styles.canvas_container}>
        <div className={styles.canvas__backdrop}></div>
      </div>
      <section className={styles.wrapper}>
        <motion.h1 className={styles.summary_title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          Hi, I&apos;m <Pop>Malik Zubayer</Pop> <br />
          A <Pop delay={0.1}>Software Engineer</Pop> dedicated to <br />
          crafting <Pop delay={0.2}>efficient</Pop> and <Pop delay={0.3}>innovative</Pop> solutions
        </motion.h1>
      </section>
    </>
  )
}
