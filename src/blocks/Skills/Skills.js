import { motion } from 'framer-motion';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <section className={styles.wrapper}>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        Skills
      </motion.h1>
    </section>
  )
}
