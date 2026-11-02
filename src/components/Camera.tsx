import { useEffect, useRef } from 'react';

export function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function startCamera() {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }

    startCamera();

    // Cleanup when the component unmounts:
    // stop the webcam so the light turns off
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return <video ref={videoRef} autoPlay playsInline muted />;
}