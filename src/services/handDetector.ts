import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

//Loads the MediaPipe model that detects hands
export async function createHandLandmarker(): Promise<HandLandmarker> {
    //Files MediaPipe needs to run in the browser
    const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.2.0/wasm'
    );

    return HandLandmarker.createFromOptions(vision, {
        baseOptions: {
            // Pre-trained model by Google
            modelAssetPath:
                'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
        },
        runningMode: 'VIDEO', 
        numHands: 2,          // LSE numbers from 6 to 10 use two hands
    });
}