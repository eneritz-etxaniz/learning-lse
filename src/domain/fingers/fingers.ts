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