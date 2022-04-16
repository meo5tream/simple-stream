import Auth, { Greeting } from '../components/Auth';
import StartStreamBtn from '../components/StartStreamBtn';

const IndexPage = () => (
  <>
    <Greeting />

    <Auth>
      <div>
        <div className="flex flex-row justify-center w-full m-2 text-center align-middle">
          <StartStreamBtn />
        </div>
      </div>
    </Auth>
  </>
);

export default IndexPage;
