import React, { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';

import 'antd/dist/antd.css';
import '../styles/index.css';
import Head from 'next/head';
import Layout from '../components/Layout';

const defaultGetLayout = (page: ReactElement) => (
  <Layout title="😼 Stream">{page}</Layout>
);

function MyApp({
  Component,
  pageProps,
  getLayout = defaultGetLayout,
  getTitle = () => 'Meo Stream',
}: AppProps & {
  getLayout: (page: ReactElement) => ReactNode;
  getTitle: () => string;
}) {
  return (
    <>
      <Head>
        <title>{getTitle()}</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
