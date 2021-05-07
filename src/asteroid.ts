import { divide,Point } from "./calc";
const startingPoint = [
    [-100, 160],
    [-100, 320],
    [-100, 380],
    [-100, 540],
    [900, 160],
    [900, 320],
    [900, 380],
    [900, 540],
];
export const shape1 = [
    [0, 0],
    [20, -20],
    [30, -20],
    [40, -30],
    [40, -10],
    [50, -20],
    [60, 0],
    [40, 30],
    [40, 20],
    [30, 20],
    [20, 10],
    [10, 20],
    [0, 0],
];
export const newAsteroid: () => [number, Point] = function () {
    let asteroidAngle =
        (Math.floor(Math.random() * (135 - 45) + 45) * Math.PI) / 180;
    let randomStart = Math.floor(Math.random() * 7);
    let P: Point = [
        startingPoint[randomStart][0],
        startingPoint[randomStart][1],
    ];
    if (startingPoint[randomStart][0] == 900) {
        asteroidAngle = asteroidAngle + Math.PI;
    }
    return [asteroidAngle, P];
};

export const moveAsteroid: (a: number, p: Point) => [number, Point] = (
    asteroidAngle,
    asteroid
) => {
    let newPos: Point = [
        asteroid[0] + 5 * Math.sin(asteroidAngle),
        asteroid[1] + 5 * Math.cos(asteroidAngle),
    ];
    if (
        newPos[0] > 1000 ||
        newPos[1] > 1000 ||
        newPos[0] < -200 ||
        newPos[1] < -200
    ) {
        return newAsteroid();
    }
    return [asteroidAngle, newPos];
};
export const getFuncForSegment: (
    s: number[][],
    a: number[],
    i: number
) => [any, any, number] = (S1, A1, i) => {
    let deltaX = S1[i][0] - S1[i - 1][0];
    let deltaY = S1[i][1] - S1[i - 1][1];
    let slopeYX = divide(deltaY, deltaX);
    let directionY = deltaY < 0 ? -1 : 1;
    let directionX = deltaX < 0 ? -1 : 1;
    let constantX;
    let constantY;
    if (deltaX == 0) {
        constantX = 0;
        constantY = 1;
    }
    if (deltaX !== 0) {
        constantX = 1;
        constantY = 0;
    }
    const Q = [S1[i - 1][0] + A1[0], S1[i - 1][1] + A1[1]];
    const coorX = (currEvalPoint) => {
        return Q[0] + currEvalPoint * directionX * constantX;
    };
    const coorY = (currEvalPoint) => {
        return (
            Q[1] +
            currEvalPoint *
                (slopeYX * directionX * constantX + directionY * constantY)
        );
    };
    const domain: number =
        Math.abs(deltaY) * constantX + Math.abs(deltaX) * constantY;
    return [coorX, coorY, domain];
};
