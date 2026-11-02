export type Point = {
    x: number;
    y: number;
    z: number;
}

// A finger is extended if its tip is farther from the 
// reference point than its middle joint
export function isFingerExtended(reference: Point, middleJoint: Point, tip: Point): boolean {
  return distance(reference, tip) > distance(reference, middleJoint);
}

function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}

const WRIST = 0;
const THUMB = { middleJoint: 3, tip: 4 };
const PINKY_BASE = 17;

// Position in the hand array of each finger's middle joint and tip
const FINGERS = [
  { middleJoint: 6, tip: 8 },   // index
  { middleJoint: 10, tip: 12 }, // middle
  { middleJoint: 14, tip: 16 }, // ring
  { middleJoint: 18, tip: 20 }, // pinky
];

// The thumb folds across the palm, so we measure from the pinky base instead of the wrist
export function isThumbExtended(hand: Point[]): boolean {
  return isFingerExtended(hand[PINKY_BASE], hand[THUMB.middleJoint], hand[THUMB.tip]);
}

export function countExtendedFingers(hand: Point[]): number {
  const extendedFingers = FINGERS.filter((finger) =>
    isFingerExtended(hand[WRIST], hand[finger.middleJoint], hand[finger.tip])
  ).length;

  return extendedFingers + (isThumbExtended(hand) ? 1 : 0);
}