export type Point = {
    x: number;
    y: number;
    z: number;
}

export function isFingerExtended(wrist: Point, middleJoint: Point, tip: Point): boolean {
    return distance(wrist, tip) > distance(wrist, middleJoint);
}

function distance(a: Point, b: Point): number {
    return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}

const WRIST = 0;

// Position in the hand array of each finger's middle joint and tip
const FINGERS = [
    { middleJoint: 6, tip: 8 },   // index
    { middleJoint: 10, tip: 12 }, // middle
    { middleJoint: 14, tip: 16 }, // ring
    { middleJoint: 18, tip: 20 }, // pinky
];

export function countExtendedFingers(hand: Point[]): number {
    return FINGERS.filter((finger) =>
        isFingerExtended(hand[WRIST], hand[finger.middleJoint], hand[finger.tip])
    ).length;
}