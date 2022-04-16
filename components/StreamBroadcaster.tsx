import { useCallback, useEffect, useRef } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import {
  useDocumentData,
  useCollectionData,
} from 'react-firebase-hooks/firestore';

import { firestore } from '../firebase';

type Props = {
  id: string;
};

const StreamBroadcaster = ({ id }: Props) => {
  const videoRef = useRef<HTMLVideoElement>();

  const [_room, roomLoading, _roomError, _roomSnapshot] = useDocumentData(
    doc(firestore, 'rooms', id)
  );

  const [viewers, _viewersLoading, _viewersError, viewersSnapshot] =
    useCollectionData(collection(firestore, 'rooms', id, 'viewers'));

  const previewVideo = useCallback(async () => {
    if (!!navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
  }, []);

  const answer = useCallback(async (viewer) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    const peerConnection = new RTCPeerConnection({
      sdpSemantics: 'unified-plan',
    } as any);

    peerConnection.addEventListener('iceconnectionstatechange', (e) => {
      console.log(`ICE state: ${peerConnection.iceConnectionState}`);
      console.log('ICE state change event: ', e);
    });

    try {
      await peerConnection.setRemoteDescription(viewer.data().localDescription);

      // beforeAnswer
      stream
        .getTracks()
        .forEach((track: any) => peerConnection.addTrack(track, stream));

      const originalAnswer = await peerConnection.createAnswer();
      const updatedAnswer = new RTCSessionDescription({
        type: 'answer',
        sdp: originalAnswer.sdp,
      });
      await peerConnection.setLocalDescription(updatedAnswer);

      await setDoc(
        viewer.ref,
        {
          remoteDescription: JSON.parse(JSON.stringify(peerConnection.localDescription)),
        },
        {
          merge: true,
        }
      );
    } catch (error) {
      peerConnection.close();
      throw error;
    }
  }, []);

  useEffect(() => {
    previewVideo();
  }, []);

  useEffect(() => {
    viewersSnapshot?.docChanges().forEach((change) => {
      switch (change.type) {
        case 'added':
          if (change.doc.data().localDescription) {
            answer(change.doc);
          }
          break;
        case 'modified':
          break;
        case 'removed':
          break;
      }
    });
  }, [viewersSnapshot]);

  if (roomLoading) return <div>Loading...</div>;
  return (
    <div>
      <video className="w-full" ref={videoRef} autoPlay muted />
      <div>{viewers?.length || 0} viewer(s)</div>
    </div>
  );
};

export default StreamBroadcaster;