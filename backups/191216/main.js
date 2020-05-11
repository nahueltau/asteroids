const main = document.getElementById("main");


//CANVAS
let canvasHeight = 800;
let canvasWidth = 800;
main.innerHTML = "<canvas id='canvas'></canvas>";
const canvas = document.querySelector("#canvas");
canvas.setAttribute("height", canvasHeight);
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("style", "border:3px solid #000000; background:#333;")
const ctx = canvas.getContext("2d");


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
//BULLETS
let bulletX =800;
let bulletY=800;
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
				 }
			inShot = true;
			
}

//ASTERIODS

	let A1X = 100;
	let A1Y = 100;
	
//DRAW SCREEN
let draw = function(){
			//NEW FRAME
			ctx.beginPath();
			ctx.rect(0, 0,800, 800);
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
					bulletX = xShot+(40+end*5)*Math.sin(radShot);
					bulletY = yShot+(40+end*5)*Math.cos(radShot);
					end++;
			
			        if (end==100) {bulletX =800; bulletY=800;inShot=false;end=0;}
		
				}

			//ASTEROIDS
			ctx.beginPath();
			ctx.moveTo(A1X,A1Y);
			ctx.lineTo(A1X+20,A1Y-20);
			ctx.lineTo(A1X+30,A1Y-20);
			ctx.lineTo(A1X+40,A1Y-30);
			ctx.lineTo(A1X+40,A1Y-10);
			ctx.lineTo(A1X+50,A1Y-20);
			ctx.lineTo(A1X+60,A1Y+0);
			ctx.lineTo(A1X+40,A1Y+30);
			ctx.lineTo(A1X+40,A1Y+20);
			ctx.lineTo(A1X+30,A1Y+20);
			ctx.lineTo(A1X+20,A1Y+10);
			ctx.lineTo(A1X+10,A1Y+20);
			ctx.lineTo(A1X,A1Y);
			ctx.strokeStyle = "#FFF";
			ctx.lineWidth = 2;
			ctx.stroke();
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
