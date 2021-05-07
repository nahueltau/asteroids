import { Point } from "./calc";
export const draw = function (ctx: CanvasRenderingContext2D, bullet, ship, counter, asteroid, shape1) {
    paintBackground(ctx);
    updateCounters(ctx, counter.hits, counter.bullets, bullet.distance);
    drawShip(ctx, ship.position, ship.direction);
    drawBullet(ctx, bullet.position);
    drawAsteroid(ctx, asteroid, shape1);
};
export const drawShip = (
    ctx: CanvasRenderingContext2D,
    ship: Point,
    shipDirection: number
) => {
    //SHIP
    ctx.beginPath();
    ctx.moveTo(ship[0], ship[1]);
    ctx.lineTo(
        ship[0] - 15 * Math.cos(shipDirection * -1),
        ship[1] - 15 * Math.sin(shipDirection * -1)
    );
    ctx.lineTo(
        ship[0] + 40 * Math.sin(shipDirection),
        ship[1] + 40 * Math.cos(shipDirection)
    );
    ctx.lineTo(
        ship[0] + 15 * Math.cos(shipDirection * -1),
        ship[1] + 15 * Math.sin(shipDirection * -1)
    );
    ctx.lineTo(ship[0], ship[1]);
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2;
    ctx.stroke();
};
export const drawBullet = (ctx: CanvasRenderingContext2D, bullet: Point) => {
    ctx.beginPath();
    ctx.arc(bullet[0], bullet[1], 1, 0, 2 * Math.PI);
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2;
    ctx.stroke();
};
export const paintBackground = (ctx: CanvasRenderingContext2D) => {
    //NEW FRAME
    ctx.beginPath();
    ctx.rect(0, 0, 800, 800);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(0, 800, 800, 50);
    ctx.fillStyle = "#FFF";
    ctx.fill();
};
export const updateCounters = (
    ctx: CanvasRenderingContext2D,
    hitCounter: number,
    bulletCounter: number,
    bulletDistance: number
) => {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText("HITS: " + hitCounter, 600, 835);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText("BULLETS: " + bulletCounter, 50, 835);

    ctx.beginPath();
    ctx.rect(300, 815, 150, 20);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(300, 815, 150 - bulletDistance * 1.5, 20);
    ctx.fillStyle = "#333";
    ctx.fill();
};
export const drawEndMessage = (ctx: CanvasRenderingContext2D) => {
    ctx.font = "72px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("GAME OVER", 200, 400);
};
export const drawAsteroid = (
    ctx: CanvasRenderingContext2D,
    asteroid: Point,
    shape1:number[][]
) => {
    ctx.beginPath();
    ctx.moveTo(asteroid[0], asteroid[1]);
    for (let key in shape1) {
        ctx.lineTo(asteroid[0] + shape1[key][0], asteroid[1] + shape1[key][1]);
    }
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2;
    ctx.stroke();
};