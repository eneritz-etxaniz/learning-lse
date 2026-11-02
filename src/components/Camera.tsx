import { useEffect, useRef, useState } from 'react';

export function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let stream: MediaStream | null = null;

        async function startCamera() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch {
                setError('We need access to your camera to practise signs.');
            } finally {
                setLoading(false);
            }
        }

        startCamera();

        // Cleanup when the component unmounts:
        // stop the webcam so the light turns off
        return () => {
            stream?.getTracks().forEach((track) => track.stop());
        };
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
  <>
    {loading && <p>Starting camera…</p>}
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{ display: loading ? 'none' : 'block' }}
    />
  </>
);
}