
import { describe, it, expect } from 'vitest';
import { isFingerExtended, countExtendedFingers, type Point } from './fingers';

// Test helper: creates a fake hand with the given fingers extended
function createHand(extendedFingers: number[]): Point[] {
  const hand: Point[] = Array.from({ length: 21 }, () => ({ x: 0, y: 0, z: 0 }));
  const fingers = [
    { middleJoint: 6, tip: 8 },   // index
    { middleJoint: 10, tip: 12 }, // middle
    { middleJoint: 14, tip: 16 }, // ring
    { middleJoint: 18, tip: 20 }, // pinky
  ];

  fingers.forEach((finger, i) => {
    hand[finger.middleJoint] = { x: 0, y: 5, z: 0 };
    hand[finger.tip] = { x: 0, y: extendedFingers.includes(i) ? 10 : 2, z: 0 };
  });

  return hand;
}

describe('isFingerExtended', () => {
  it('returns true when the tip is farther from the '+ 
    'wrist than the middle joint', () => {
    const wrist = { x: 0, y: 0, z: 0 };
    const middleJoint = { x: 0, y: 5, z: 0 };
    const tip = { x: 0, y: 7, z: 0 };

    expect(isFingerExtended(wrist, middleJoint, tip)).toBe(true);
  });

  it('returns false when the tip is closer to the wrist than ' +
    'the middle joint', () => {
    const wrist = { x: 0, y: 0, z: 0 };
    const middleJoint = { x: 0, y: 5, z: 0 };
    const tip = { x: 0, y: 3, z: 0 };

    expect(isFingerExtended(wrist, middleJoint, tip)).toBe(false);
  });
}); 

describe('countExtendedFingers', () => {
  it('returns 0 for a closed fist', () => {
    expect(countExtendedFingers(createHand([]))).toBe(0);
  });

  it('returns 4 when all fingers are extended', () => {
    expect(countExtendedFingers(createHand([0, 1, 2, 3]))).toBe(4);
  });

  it('returns 2 when two fingers are extended', () => {
    expect(countExtendedFingers(createHand([0, 1]))).toBe(2);
  });
});