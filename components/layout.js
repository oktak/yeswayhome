// import styles from './layout.module.css'

// export default function Layout({ children }) {
//   return <div className={styles.container}>{children}</div>
// }
import React, {useRef, useState, useEffect} from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Icon from './Icon'

import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { faBars } from "@fortawesome/free-solid-svg-icons"; // import the icons you need


export const siteTitle = 'YesWayHome'
const BASEPATH = process.env.NODE_ENV === 'production' ? '/subfolder/' : ''

export default function Layout({ children, home }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={utilStyles.wrapper}>
        <header className={styles.header}>
          {/* <button className="text-right" onClick={() => setNavbarOpen(!navbarOpen)}>
            <Icon icon={faBars}/>
            <span>Menu</span>
          </button> */}
        </header>


        <div className={styles.container}>
          {
            React.Children.map(children, child => React.cloneElement(child, { "data-navbaropen": navbarOpen }))
          }
        </div>

        <noscript dangerouslySetInnerHTML={{__html: `<img src="https://ga.miinikiao.ga/ga/matomo.php?idsite=2&amp;rec=1" alt="" height="0" width="0" style="display:none;visibility:hidden;" />`}} />
      </div>
    </div>
  )
}
