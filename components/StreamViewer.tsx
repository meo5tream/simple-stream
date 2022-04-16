import { useCallback, useEffect, useRef } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  onSnapshot,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { firestore } from '../firebase';

type Props = {
  id: string;
};

const StreamViewer = ({ id }: Props) => {
  const videoRef = useRef<HTMLVideoElement>();
  const viewerRef = useRef<DocumentReference<DocumentData>>();

  const [viewers, _viewersLoading, _viewersError, _viewersSnapshot] =
    useCollectionData(collection(firestore, 'rooms', id, 'viewers'));

  const connect = useCallback(async () => {
    const peerConnection = new RTCPeerConnection({
      sdpSemantics: 'unified-plan',
    } as any);

    peerConnection.ontrack = (event) => {
      if (videoRef.current.srcObject !== event.streams[0]) {
        console.log(event.streams);
        videoRef.current.srcObject = event.streams[0];
      }
    };

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
      name: 'Test',
      localDescription: JSON.parse(
        JSON.stringify(peerConnection.localDescription)
      ),
    });

    onSnapshot(
      doc(firestore, 'rooms', id, 'viewers', viewerRef.current.id),
      async (viewer) => {
        if (viewer.data()?.remoteDescription) {
          await peerConnection.setRemoteDescription(
            viewer.data().remoteDescription
          );
        }
      }
    );
  }, []);

  const disconnect = useCallback(async () => {
    deleteDoc(viewerRef.current);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', disconnect);
    return () => {
      window.removeEventListener('beforeunload', disconnect);
    };
  }, []);

  return (
    <div>
      <video className="w-full" ref={videoRef} autoPlay muted />
      <div>{viewers?.length || 0} viewer(s)</div>
    </div>
  );
};

export default StreamViewer;
