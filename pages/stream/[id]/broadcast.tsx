import { useRouter } from 'next/router';

import StreamBroadcaster from '../../../components/StreamBroadcaster';

const BroadcastPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return id ? <StreamBroadcaster id={id} /> : <></>;
};

export default BroadcastPage;
