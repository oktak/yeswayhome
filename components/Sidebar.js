import Link from 'next/link'
import ADate from '../components/date'
import Searchbox from '../components/Searchbox'

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Sidebar({ allPostsData, navbarOpen }) {
  const navclass = (navbarOpen ? " block" : " hidden")

  return (
    <aside className={styles.sidebar + navclass}>
      <ul className="">
      </ul>
    </aside>
  )
}
