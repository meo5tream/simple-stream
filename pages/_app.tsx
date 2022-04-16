import React, { ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';
import { NextPage } from 'next';

import 'antd/dist/antd.css';
import '../styles/index.css';
import Head from 'next/head';
import Layout from '../components/Layout';

const defaultGetLayout = (page: ReactElement) => (
  <Layout title="😼 Stream">{page}</Layout>
);

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

function MyApp({
  Component,
  pageProps,
  getTitle = () => 'Meo Stream',
}: AppProps & {
  Component: NextPageWithLayout;
  getTitle: () => string;
}) {
  const getLayout = Component.getLayout || defaultGetLayout;

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
