const drawShip = (ctx,shipX, shipY, shipDirection)=>{
    //SHIP
    ctx.beginPath();
    ctx.moveTo(shipX,shipY);
    ctx.lineTo(shipX-15*Math.cos(shipDirection*-1),shipY-15*Math.sin(shipDirection*-1));
    ctx.lineTo(shipX+40*Math.sin(shipDirection),shipY+40*Math.cos(shipDirection));
    ctx.lineTo(shipX+15*Math.cos(shipDirection*-1),shipY+15*Math.sin(shipDirection*-1));
    ctx.lineTo(shipX,shipY);
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2;
    ctx.stroke();
}
export {drawShip}