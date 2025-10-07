function createCircles() {
    drawCircles(50, 50, 40, "red");
    drawCircles(150, 50, 40, "blue");
    drawCircles(250, 50, 40, "green");


}

function drawCircles(x, y, r, color) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.stroke();
    ctx.moveTo(x,y);
    ctx.lineTo(x+ 70,y + 70); 
    ctx.strokeStyle = color;
    ctx.stroke(); 
}

