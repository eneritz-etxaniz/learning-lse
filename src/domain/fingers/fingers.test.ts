
import { describe, it, expect } from 'vitest';
import { isFingerExtended } from './fingers';

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