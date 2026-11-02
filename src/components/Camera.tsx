import { useEffect, useRef, useState } from 'react';
import type { HandLandmarker } from '@mediapipe/tasks-vision';
import { createHandLandmarker } from '../services/handDetector';

export function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [handsDetected, setHandsDetected] = useState<number>(0);

    useEffect(() => {
        let stream: MediaStream | null = null;
        let handLandmarker: HandLandmarker | null = null;
        let animationId = 0;

        async function startCamera() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                handLandmarker = await createHandLandmarker();
                detectHands();
            } catch {
                setError('We need access to your camera to practise signs.');
            } finally {
                setLoading(false);
            }
        }
        // Analyses each frame of the video, again and again
        function detectHands() {
            const video = videoRef.current;

            // Only if the video already has an image to analyse
            if (video && handLandmarker && video.readyState >= 2) {
                const result = handLandmarker.detectForVideo(video, performance.now());
                setHandsDetected(result.landmarks.length);
            }

            // Ask the browser to call detectHands again on the next frame
            animationId = requestAnimationFrame(detectHands);
        }

        startCamera();

        // Cleanup when the component unmounts:
        // stop the webcam so the light turns off
        return () => {
            cancelAnimationFrame(animationId); //stop the loop
            handLandmarker?.close();  //free the model
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
            {!loading && <p><b>Hands detected:</b> {handsDetected}</p>}
        </>
    );
}