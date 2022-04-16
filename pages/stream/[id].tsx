import { ReactElement } from 'react';
import { StreamLayout } from '../../components/StreamLayout';
import Layout from '../../components/Layout';

type Props = {};

export default function StreamIdPage({}: Props) {
  return <div className="h-12">Stream / WebCam go here!</div>;
}

StreamIdPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="😼 Stream">
      <StreamLayout>{page}</StreamLayout>
    </Layout>
  );
};
