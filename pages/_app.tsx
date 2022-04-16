import React from 'react';
import { AppProps } from 'next/app';

import 'antd/dist/antd.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
