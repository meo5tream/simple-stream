import { useRouter } from 'next/router';

import StreamViewer from '../../components/StreamViewer';

const StreamPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return id ? <StreamViewer id={id} /> : <></>;
};

export default StreamPage;
