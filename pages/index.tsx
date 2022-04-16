import { useContext } from 'react';
import { useCollection } from 'swr-firestore-v9';
import Auth, { AuthContext, Greeting } from '../components/Auth';
import Layout from '../components/Layout';
import StartStreamBtn from '../components/StartStreamBtn';
import StreamingCard from '../components/StreamingCard';
import { StreamingRoom } from '../types';

const IndexPage = () => (
  <>
    <Greeting />

    <Auth>
      <div>
        <div className="flex flex-row justify-center w-full m-2 text-center align-middle">
          <StartStreamBtn />
        </div>
        <StreamingSection />
      </div>
    </Auth>
  </>
);

const StreamingSection = () => {
  const { data = [] } = useCollection<StreamingRoom>('rooms');
  const { user } = useContext(AuthContext);

  console.log(user, data);

  return (
    <div className="mt-2">
      <h2 className="my-4 text-2xl italic font-thin text-violet-700">
        Or join our latest streams!
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {data.map((room) => (
          <StreamingCard key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
