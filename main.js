const main = document.getElementById("main");


//CANVAS
let canvasHeight = 850*.7;
let canvasWidth = 800*.7;
main.innerHTML = "<canvas id='canvas'></canvas>";
const canvas = document.querySelector("#canvas");
canvas.setAttribute("height", canvasHeight);
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("style", "border:3px solid #000000; background:#333;")
const ctx = canvas.getContext("2d");
ctx.scale(.7,.7);

//COUNTERS
let hitCounter = 0;
let bulletCounter = 0;

//SHIP
let shipX = 250;
let shipY = 250;
let ang = 0;
let rad = ang*Math.PI/180;
ctx.moveTo(shipX,shipY);
ctx.lineTo(shipX-15,shipY);
ctx.lineTo(shipX,shipY+40);
ctx.lineTo(shipX+15,shipY);
ctx.lineTo(shipX,shipY);
ctx.strokeStyle = "#FFF";
ctx.lineWidth = 2;
ctx.stroke();

let LOST = false;
//BULLETS
let bulletX =10000;
let bulletY=10000;
let end = 1;
let inShot = false;
let radShot;
let xShot;
let	yShot;
const shotOne = function(){
			if(inShot!==true){
				radShot = rad;
				xShot = shipX;
				yShot = shipY;
				bulletCounter++;
				 }
			inShot = true;
			
}

//ASTERIODS
	const startingP = [
			{X:-100,Y:160},
			{X:-100,Y:320},
			{X:-100,Y:380},
			{X:-100,Y:540},
			{X: 900,Y:160},
			{X: 900,Y:320},
			{X: 900,Y:380},
			{X: 900,Y:540},

	]
	let angles;
	let startRandom;
	let A1X;
	let A1Y;
    const restartAsteroid = function(){
    	angles = Math.floor(Math.random()*(135-45)+45)*Math.PI/180;
		startRandom = Math.floor(Math.random()*7);
		A1X = startingP[startRandom].X;
		A1Y = startingP[startRandom].Y;
		if(startingP[startRandom].X==900){angles = angles + Math.PI};

    }
    restartAsteroid();
	

//ASTEROID SHAPE 1
	const S1 = [{X:0,Y:0},{X:20,Y:-20},{X:30,Y:-20},{X:40,Y:-30},{X:40,Y:-10},{X:50,Y:-20},{X:60,Y:0},{X:40,Y:30},{X:40,Y:20},{X:30,Y:20},{X:20,Y:10},{X:10,Y:20},{X:0,Y:0}];


//HIT
	let testX = 100000;
	let testY = 100000;



//DRAW SCREEN
let draw = function(){
			//NEW FRAME
			ctx.beginPath();
			ctx.rect(0, 0,800, 800);
			ctx.fillStyle = "#333";
			ctx.fill();
			ctx.beginPath();
			ctx.rect(0, 800,800, 50);
			ctx.fillStyle = "#FFF";
			ctx.fill();
			//COUNTERS
			ctx.font = "30px Arial";
			ctx.fillStyle = "#333";
			ctx.fillText("HITS: "+hitCounter, 600, 835);
			ctx.font = "30px Arial";
			ctx.fillStyle = "#333";
			ctx.fillText("BULLETS: "+bulletCounter, 50, 835);

			ctx.beginPath();
			ctx.rect(300, 815, 150, 20);
			ctx.strokeStyle = "#333";
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.beginPath();
			ctx.rect(300, 815, 150-end*1.5, 20);
			ctx.fillStyle = "#333";
			ctx.fill();

			//SHIP
			ctx.beginPath();
			ctx.moveTo(shipX,shipY);
			ctx.lineTo(shipX-15*Math.cos(rad*-1),shipY-15*Math.sin(rad*-1));
			ctx.lineTo(shipX+40*Math.sin(rad),shipY+40*Math.cos(rad));
			ctx.lineTo(shipX+15*Math.cos(rad*-1),shipY+15*Math.sin(rad*-1));
			ctx.lineTo(shipX,shipY);
			ctx.strokeStyle = "#FFF";
			ctx.lineWidth = 2;
			ctx.stroke();
			//SHOT
			ctx.beginPath();
			ctx.arc(bulletX, bulletY, 1, 0, 2 * Math.PI);
			ctx.strokeStyle = "#FFF";
			ctx.lineWidth = 2;
			ctx.stroke();
				if(inShot){
					bulletX = xShot+(40+end*10)*Math.sin(radShot);
					bulletY = yShot+(40+end*10)*Math.cos(radShot);
					end++;
			
			        if (end==100) {bulletX =800; bulletY=800;inShot=false;end=0;}
		
				}

	//ASTEROIDS
		//Drawing
			ctx.beginPath();
			ctx.moveTo(A1X,A1Y);
			for(let key in S1){
				ctx.lineTo(A1X+S1[key].X,A1Y+S1[key].Y);
			}
			ctx.strokeStyle = "#FFF";
			ctx.lineWidth = 2;
			ctx.stroke();
		//Movement
			A1X = A1X + 5*Math.sin(angles);
			A1Y = A1Y + 5*Math.cos(angles);
				//Reset
			if (A1X>1000||A1Y>1000||A1X<-200||A1Y<-200) {
				restartAsteroid();
			}
		//Hit
			let divide = function(a,b){ //discards infinite results
				if (isFinite(a/b)) {
					return a/b;
				}else{return 0;}
			}
			for (var i = 1; i <= S1.length-1; i++) {
					//setup
					delX = S1[i].X-S1[i-1].X;
					delY = S1[i].Y-S1[i-1].Y;
					delYA = Math.abs(S1[i].Y-S1[i-1].Y);
					delXA = Math.abs(S1[i].X-S1[i-1].X);
					difY = divide(delYA,delY);
					difX = divide(delXA,delX);
					difYX = divide(delY,delX);
					
					//x==0 case
					if (delX==0) {
						infX = 0;
						infY = 1;
					}
					if (delX !== 0){
						infX = 1;
						infY = 0;
					}
					
					//test		
					for (var key = 0; key <= delXA * infX  + delYA * infY; key++) {
					
						testX = A1X + S1[i-1].X + key * difX * infX;
						testY = A1Y + S1[i-1].Y + key * difYX * difX * infX + difY *  infY * key;
						
						if (.99<testX/bulletX && testX/bulletX <1.01 && .99<testY/bulletY && testY/bulletY<1.01) {restartAsteroid();hitCounter++}

						if (.99<testX/(shipX+40*Math.sin(rad)) && testX/(shipX+40*Math.sin(rad)) <1.01 && .99<testY/(shipY+(40*Math.cos(rad))) && testY/(shipY+(40*Math.cos(rad)))<1.01) {LOST = true;}
						if (.99<testX/shipX && testX/shipX <1.01 && .99<testY/shipY && testY/shipY<1.01) {LOST = true;}
						if (.99<testX/(shipX-15*Math.cos(rad*-1)) && testX/(shipX-15*Math.cos(rad*-1)) <1.01 && .99<testY/(shipY-15*Math.sin(rad*-1)) && testY/(shipY-15*Math.sin(rad*-1))<1.01) {LOST = true;}
						if (.99<testX/(shipX+15*Math.cos(rad*-1)) && testX/(shipX+15*Math.cos(rad*-1)) <1.01 && .99<testY/(shipY+15*Math.sin(rad*-1)) && testY/(shipY+15*Math.sin(rad*-1))<1.01) {LOST = true;}
						
						
					
					}
				}

	
//CHECK IF GAME OVER		
if (LOST) {
	clearInterval(myInterval);
	ctx.font = "72px Arial";
	ctx.fillStyle = "#FFF";
	ctx.fillText("YOU LOST", 200, 400);
}
			

		}
let myInterval = setInterval(draw,25);






//CONTROLS
window.onkeydown = function(e){
	switch(e.code){
		case "ArrowUp":
		shipY+=(10*Math.cos(rad));
		shipX+=(10*Math.sin(rad));
		break;
		case "ArrowLeft":
		ang+= 10;
		rad = ang*Math.PI/180;
		break;
		case "ArrowRight":
		ang-= 10;
		rad = ang*Math.PI/180;
		break;
		case "Space":
		shotOne();
		break;
	}

	

}
