import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../components/layout'
import Sidebar from '../components/Sidebar'
import { Calculator } from '../components/Calculator'

import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({ navbarOpen } : any) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Sidebar allPostsData={allPostsData} navbarOpen={navbarOpen} /> */}

      <main className={styles.main}>
        <h1 className="text-2xl md:text-5xl">
          {siteTitle}
        </h1>
        <Calculator />
      </main>

      <footer className={styles.footer}>
        <span>ok :)</span>
      </footer>
    </Layout>
  )
}

export default Home
