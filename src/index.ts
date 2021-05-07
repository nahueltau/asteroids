import { draw, drawEndMessage } from "./draw";
import { getPoint } from "./calc";
import { newAsteroid, shape1, moveAsteroid } from "./asteroid";
import { shot, moveBullet } from "./ship";
import { connectDOM } from "./connectDOM";
import { checkCollision } from "./checkCollision";
const main = () => {
    draw(ctx, bullet, ship, counter, asteroid, shape1);

    [asteroidAngle, asteroid] = moveAsteroid(asteroidAngle, asteroid);

    if (bullet.active && bullet.distance < 100) {
        bullet.position = moveBullet(
            bullet.origin,
            bullet.angle,
            bullet.distance
        );
        bullet.distance++;
    } else if (bullet.distance >= 100) {
        bullet.position = [800, 800];
        bullet.active = false;
        bullet.distance = 0;
    }
    const [gameover, hit] = checkCollision(ship, shape1, asteroid, bullet);

    if (hit) {
        [asteroidAngle, asteroid] = newAsteroid();
        counter.hits++;
    }
    if (!gameover) {
        setTimeout(() => main(), frameRate);
    } else {
        clearTimeout(frameId);
        drawEndMessage(ctx);
    }
};

//GLOBALS
const ctx = connectDOM();
const frameRate = 25;
let frameId: number;
const counter = {
    hits: 0,
    bullets: 0,
};
const ship = {
    position: getPoint(700),
    direction: 0,
};
const bullet = {
    position: [800, 800],
    distance: 0,
    origin: null,
    active: false,
    angle: null,
};
let [asteroidAngle, asteroid] = newAsteroid();

//FUNCTIONS

//CONTROLS
window.onkeydown = function (e: KeyboardEvent) {
    switch (e.code) {
        case "ArrowUp":
            ship.position[0] += 10 * Math.sin(ship.direction);
            ship.position[1] += 10 * Math.cos(ship.direction);
            break;
        case "ArrowLeft":
            ship.direction += 0.17;
            break;
        case "ArrowRight":
            ship.direction -= 0.17;
            break;
        case "Space":
            if (!bullet.active) {
                [bullet.active, bullet.origin, bullet.angle] = shot(
                    ship.position,
                    ship.direction
                );
                counter.bullets++;
            }
            break;
    }
};

main();
