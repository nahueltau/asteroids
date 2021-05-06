import { drawShip } from "./draw";
const app = <HTMLCanvasElement>document.getElementById("app");

//CANVAS
let canvasHeight: number = 850 * 0.8;
let canvasWidth: number = 800 * 0.8;
app.setAttribute("height", String(canvasHeight));
app.setAttribute("width", String(canvasWidth));
const ctx = app.getContext("2d");
ctx.scale(0.8, 0.8);

//COUNTERS
let hitCounter = 0;
let bulletCounter = 0;
let LOST = false;

//SHIP SETUP
let shipX = 250;
let shipY = 250;
let shipDirection = 0;
//Ship shape
drawShip(ctx, shipX, shipY, shipDirection);

//BULLETS SETUP
let bulletPosX = 10000;
let bulletPosY = 10000;
let bulletDistance = 1;
let inShot = false;
let shotAngle;
let xAtShot;
let yAtShot;
const shotOne = function () {
  if (inShot !== true) {
    shotAngle = shipDirection;
    xAtShot = shipX;
    yAtShot = shipY;
    bulletCounter++;
  }
  inShot = true;
};

//ASTERIODS SETUP
/* 	const startingPoint = [
			{X:-100,Y:160},
			{X:-100,Y:320},
			{X:-100,Y:380},
			{X:-100,Y:540},
			{X: 900,Y:160},
			{X: 900,Y:320},
			{X: 900,Y:380},
			{X: 900,Y:540},

	] */
const startingPoint = [
  [-100, 160],
  [-100, 320],
  [-100, 380],
  [-100, 540],
  [900, 160],
  [900, 320],
  [900, 380],
  [900, 540]
];
let asteroidAngle;
let randomStart;
let A1X;
let A1Y;
const restartAsteroid = function () {
  asteroidAngle = (Math.floor(Math.random() * (135 - 45) + 45) * Math.PI) / 180;
  randomStart = Math.floor(Math.random() * 7);
  A1X = startingPoint[randomStart][0];
  A1Y = startingPoint[randomStart][1];
  if (startingPoint[randomStart][0] == 900) {
    asteroidAngle = asteroidAngle + Math.PI;
  }
};
restartAsteroid();

//ASTEROID SHAPE 1
const S1 = [
  { X: 0, Y: 0 },
  { X: 20, Y: -20 },
  { X: 30, Y: -20 },
  { X: 40, Y: -30 },
  { X: 40, Y: -10 },
  { X: 50, Y: -20 },
  { X: 60, Y: 0 },
  { X: 40, Y: 30 },
  { X: 40, Y: 20 },
  { X: 30, Y: 20 },
  { X: 20, Y: 10 },
  { X: 10, Y: 20 },
  { X: 0, Y: 0 },
];

//HIT
let testX = 100000;
let testY = 100000;

//DRAW SCREEN
const paintBackground = (ctx) => {
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
const updateCounters = (ctx, hitCounter, bulletCounter, bulletDistance) => {
  //COUNTERS
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

let draw = function (ctx) {
  paintBackground(ctx);
  updateCounters(ctx, hitCounter, bulletCounter, bulletDistance);
  drawShip(ctx, shipX, shipY, shipDirection);

  //SHOT
  ctx.beginPath();
  ctx.arc(bulletPosX, bulletPosY, 1, 0, 2 * Math.PI);
  ctx.strokeStyle = "#FFF";
  ctx.lineWidth = 2;
  ctx.stroke();
  if (inShot) {
    bulletPosX = xAtShot + (40 + bulletDistance * 10) * Math.sin(shotAngle);
    bulletPosY = yAtShot + (40 + bulletDistance * 10) * Math.cos(shotAngle);
    bulletDistance++;

    if (bulletDistance == 100) {
      bulletPosX = 800;
      bulletPosY = 800;
      inShot = false;
      bulletDistance = 0;
    }
  }

  //ASTEROIDS
  //Drawing
  ctx.beginPath();
  ctx.moveTo(A1X, A1Y);
  for (let key in S1) {
    ctx.lineTo(A1X + S1[key].X, A1Y + S1[key].Y);
  }
  ctx.strokeStyle = "#FFF";
  ctx.lineWidth = 2;
  ctx.stroke();
  //Movement
  A1X = A1X + 5 * Math.sin(asteroidAngle);
  A1Y = A1Y + 5 * Math.cos(asteroidAngle);
  //Reset
  if (A1X > 1000 || A1Y > 1000 || A1X < -200 || A1Y < -200) {
    restartAsteroid();
  }

  //COLLISION CHECK SETUP
  let divide = function (a, b) {
    //discards infinite results
    if (isFinite(a / b)) {
      return a / b;
    } else {
      return 0;
    }
  };
  for (let i = 1; i <= S1.length - 1; i++) {
    //variable setup
    /* 
					   The idea here is to get the slope for every one of the lines that draw the asteroid,
					   then check for every point in every line of the asteroid if the X and Y position of that point is close
					   enough to the X and Y position of the bullet. If it's close enough it can be called a collision.
					*/
    //get the difference between the x and y values of 2 consecutive points of the asteroid shape
    let deltaX = S1[i].X - S1[i - 1].X;
    let deltaY = S1[i].Y - S1[i - 1].Y;

    let deltaYabsolute = Math.abs(S1[i].Y - S1[i - 1].Y);
    let deltaXabsolute = Math.abs(S1[i].X - S1[i - 1].X);
    //to check the direction of the line
    let directionY = divide(deltaYabsolute, deltaY);
    let directionX = divide(deltaXabsolute, deltaX);
    //the slope of the line
    let slopeYX = divide(deltaY, deltaX);

    //x==0 case, checks if the line of the asteroid shape is a vertical line
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

    //TEST COLLISION
    for (
      let xAxisValue = 0;
      xAxisValue <= deltaXabsolute * constantX + deltaYabsolute * constantY;
      xAxisValue++
    ) {
      /* 
						from 0 to deltaXabsolute we have the domain of the function,
						deltaYabsolte is for the case of deltaX === 0	
						*/
      testX = A1X + S1[i - 1].X + xAxisValue * directionX * constantX;
      testY =
        A1Y +
        S1[i - 1].Y +
        xAxisValue * slopeYX * directionX * constantX +
        directionY * constantY * xAxisValue;
      //Test for bullets hitting asteroids
      if (
        0.99 < testX / bulletPosX &&
        testX / bulletPosX < 1.01 &&
        0.99 < testY / bulletPosY &&
        testY / bulletPosY < 1.01
      ) {
        restartAsteroid();
        hitCounter++;
      }
      //Test for asteroids hitting ship
      if (
        0.99 < testX / (shipX + 40 * Math.sin(shipDirection)) &&
        testX / (shipX + 40 * Math.sin(shipDirection)) < 1.01 &&
        0.99 < testY / (shipY + 40 * Math.cos(shipDirection)) &&
        testY / (shipY + 40 * Math.cos(shipDirection)) < 1.01
      ) {
        LOST = true;
      }
      if (
        0.99 < testX / shipX &&
        testX / shipX < 1.01 &&
        0.99 < testY / shipY &&
        testY / shipY < 1.01
      ) {
        LOST = true;
      }
      if (
        0.99 < testX / (shipX - 15 * Math.cos(shipDirection * -1)) &&
        testX / (shipX - 15 * Math.cos(shipDirection * -1)) < 1.01 &&
        0.99 < testY / (shipY - 15 * Math.sin(shipDirection * -1)) &&
        testY / (shipY - 15 * Math.sin(shipDirection * -1)) < 1.01
      ) {
        LOST = true;
      }
      if (
        0.99 < testX / (shipX + 15 * Math.cos(shipDirection * -1)) &&
        testX / (shipX + 15 * Math.cos(shipDirection * -1)) < 1.01 &&
        0.99 < testY / (shipY + 15 * Math.sin(shipDirection * -1)) &&
        testY / (shipY + 15 * Math.sin(shipDirection * -1)) < 1.01
      ) {
        LOST = true;
      }
    }
  }

  //CHECK IF GAME OVER
  if (LOST) {
    clearInterval(myInterval);
    ctx.font = "72px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("YOU LOST", 200, 400);
  }
};

//START ANIMATION
let myInterval = setInterval(() => draw(ctx), 25);

//CONTROLS
window.onkeydown = function (e) {
  switch (e.code) {
    case "ArrowUp":
      shipY += 10 * Math.cos(shipDirection);
      shipX += 10 * Math.sin(shipDirection);
      break;
    case "ArrowLeft":
      shipDirection += 0.17;
      break;
    case "ArrowRight":
      shipDirection -= 0.17;
      break;
    case "Space":
      shotOne();
      break;
  }
};
