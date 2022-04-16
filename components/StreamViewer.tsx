import { useCallback, useContext, useEffect, useRef } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { firestore } from '../firebase';
import { AuthContext } from './Auth';

type Props = {
  id: string;
};

const StreamViewer = ({ id }: Props) => {
  const { user } = useContext(AuthContext);

  const videoRef = useRef<HTMLVideoElement>();
  const viewerRef = useRef<DocumentReference<DocumentData>>();

  const [viewers, _viewersLoading, _viewersError, _viewersSnapshot] =
    useCollectionData(collection(firestore, 'rooms', id, 'viewers'));

  const connect = useCallback(async () => {
    if (!user) return;

    const peerConnection = new RTCPeerConnection({
      sdpSemantics: 'unified-plan', //newer implementation of WebRTC
    } as any);

    peerConnection.ontrack = (event) => {
      if (videoRef.current.srcObject !== event.streams[0]) {
        console.log(event.streams);
        videoRef.current.srcObject = event.streams[0];
      }
    };

    const onIceCandidate = async ({ candidate }) => {
      if (!candidate || !viewerRef.current) return;

      await setDoc(
        viewerRef.current,
        {
          localIcecandidate: candidate.toJSON(),
        },
        {
          merge: true,
        }
      );
      peerConnection.removeEventListener('icecandidate', onIceCandidate);
    };
    peerConnection.addEventListener('icecandidate', onIceCandidate);

    peerConnection.addEventListener('iceconnectionstatechange', (e) => {
      console.log(`ICE state: ${peerConnection.iceConnectionState}`);
      console.log('ICE state change event: ', e);
    });

    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await peerConnection.setLocalDescription(offer);

    const viewersCollection = collection(firestore, 'rooms', id, 'viewers');
    viewerRef.current = await addDoc(viewersCollection, {
      name: user.displayName,
      email: user.email,
      localDescription: peerConnection.localDescription.toJSON(),
    });

    onSnapshot(viewerRef.current, async (viewer) => {
      if (viewer.data()?.remoteDescription) {
        await peerConnection.setRemoteDescription(
          viewer.data().remoteDescription
        );
        await setDoc(viewerRef.current, {
          localDescription: null,
          remoteDescription: null,
        });
      }
      if (viewer.data()?.remoteIcecandidate) {
        await peerConnection.addIceCandidate(viewer.data()?.remoteIcecandidate);
        await setDoc(viewerRef.current, {
          remoteIcecandidate: null,
        });
      }
    });
  }, [id, user]);

  const disconnect = useCallback(async () => {
    if (viewerRef.current) deleteDoc(viewerRef.current);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  useEffect(() => {
    window.addEventListener('beforeunload', disconnect);
    return () => {
      window.removeEventListener('beforeunload', disconnect);
    };
  }, [disconnect]);

  return (
    <div>
      <video className="w-full" ref={videoRef} autoPlay muted />
      <div>{viewers?.length || 0} viewer(s)</div>
    </div>
  );
};

export default StreamViewer;
