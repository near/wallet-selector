import React from "react";
import "./styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import favicon from "../public/favicon.ico";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>NEAR Guest Book</title>
        <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
