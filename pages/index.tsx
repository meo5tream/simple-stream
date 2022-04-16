import Auth, { Greeting } from '../components/Auth';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout title="😼 Stream">
    <Greeting />
    <Auth>Tes</Auth>
  </Layout>
);

export default IndexPage;
