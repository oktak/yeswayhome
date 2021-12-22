import React, { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import type { AppProps } from 'next/app'

import { init } from "@socialgouv/matomo-next";
const MATOMO_URL: string = "" + process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID: string = "" + process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
  }, []);
  return <Component {...pageProps} />
}
export default MyApp
