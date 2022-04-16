import React from 'react';
import { AppProps } from 'next/app';

import 'antd/dist/antd.css';
import '../styles/index.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Meo Stream</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
