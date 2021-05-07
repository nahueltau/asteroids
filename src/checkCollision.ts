import { getFuncForSegment } from "./asteroid";
import { areSuperposed } from "./calc";
import { shipBounds } from "./ship";

export const checkCollision = (
    ship,
    shape1,
    asteroid,
    bullet
) => {
    const [shipFront, leftWing, rightWing] = shipBounds(ship.position, ship.direction);
    for (let vertex = 1; vertex <= shape1.length - 1; vertex++) {
        const [coorX, coorY, domain] = getFuncForSegment(
            shape1,
            asteroid,
            vertex
        );
        for (let currEvalPoint = 0; currEvalPoint <= domain; currEvalPoint++) {
            const pea: [number, number] = [
                coorX(currEvalPoint),
                coorY(currEvalPoint),
            ];
            //Test for bullets hitting asteroids
            if (bullet.active && areSuperposed(pea, bullet.position)) {
                return [false, true];
            }
            //Test for asteroids hitting ship
            if (
                areSuperposed(pea, shipFront) ||
                areSuperposed(pea, leftWing) ||
                areSuperposed(pea, rightWing)
            ) {
                return [true, false];
            }
        }
    }
    return [false, false];
};
