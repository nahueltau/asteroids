import { Point } from "./calc";
export const shot: (
    ship: Point,
    direction: number
) => [boolean, Point, number] = function (ship, shipDirection) {
    let shotAngle: number = shipDirection;
    let shotOrigin: Point = [ship[0], ship[1]];
    let inShot: boolean = true;
    return [inShot, shotOrigin, shotAngle];
};
export const shipBounds = (ship: Point, direction: number) => {
    const front: Point = [
        ship[0] + 40 * Math.sin(direction),
        ship[1] + 40 * Math.cos(direction),
    ];
    const left: Point = [
        ship[0] - 15 * Math.cos(direction * -1),
        ship[1] - 15 * Math.sin(direction * -1),
    ];
    const right: Point = [
        ship[0] + 15 * Math.cos(direction * -1),
        ship[1] + 15 * Math.sin(direction * -1),
    ];
    return [front, left, right];
};
export const moveBullet = (
    origin: Point,
    direction: number,
    distance: number
) => {
    let bullet: [number, number] = [
        origin[0] + (40 + distance * 10) * Math.sin(direction),
        origin[1] + (40 + distance * 10) * Math.cos(direction),
    ];
    return bullet;
};
