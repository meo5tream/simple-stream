import { useContext, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { Button, Form, Input, Checkbox } from 'antd';

import { firestore } from '../firebase';

import { AuthContext } from './Auth';

const StartStreamForm = () => {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const videoRef = useRef<HTMLVideoElement>();

  const onTitleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }, []);

  const onIsPrivateChange = useCallback(() => {
    setIsPrivate(!isPrivate);
  }, []);

  const onStartStreamClicked = useCallback(async () => {
    const roomCollection = collection(firestore, 'rooms');
    const roomDoc = await addDoc(roomCollection, {
      title,
      private: isPrivate,
      creator: user.email,
      createdAt: Timestamp.fromDate(new Date()),
    });
    router.push(`/stream/${roomDoc.id}/broadcast`);
  }, []);

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

  useEffect(() => {
    previewVideo();
  }, []);

  return (
    <Form>
      <Form.Item>
        <video className="w-full" ref={videoRef} autoPlay muted />
      </Form.Item>
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please input room Title!' }]}
      >
        <Input
          id="title"
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
          required
        />
      </Form.Item>
      <Form.Item>
        <Checkbox value={isPrivate} onChange={onIsPrivateChange}>
          Is Private
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button onClick={onStartStreamClicked}>Start</Button>
      </Form.Item>
    </Form>
  );
};

export default StartStreamForm;
