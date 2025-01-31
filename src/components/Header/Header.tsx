'use client'

import styles from './Header.module.css';

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#' },
  { name: 'Resume', href: '#' },
]

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__logo}>
          Malik Zubayer _
        </div>
        <ul className={styles.header__menu_wrapper}>
          {navigation.map((item, index) => (
            <li key={index} className={styles.header__menu_item}>
              <a href={item.href}>
                <span className={styles.header__menu_item_span}>{String(index + 1).padStart(2, '0')}{'. '}</span>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.header__backdrop} />
      </div>
    </header>
  )
}