import styles from './index.module.css';

export default function Summary() {

  return (
    <section className={styles.wrapper}>
      <div className={styles.glow}>
        <h1 className={styles.summary_title}>
          Hi, I&apos;m <span className={styles.focus}>Malik Zubayer</span> <br />
          A <span className={styles.focus}>Software Engineer</span> dedicated to <br />
          crafting <span className={styles.focus}>efficient</span> and <span className={styles.focus}>innovative</span> solutions
        </h1>
      </div>
    </section>
  )
}
