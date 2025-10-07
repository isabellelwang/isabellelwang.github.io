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

function changePos() {
    var c = document.getElementById("myCanvas"); 
    var ctx = c.getContext("2d"); 
    ctx.clearRect(0, 0, 500, 500);
    random_x = Math.floor(Math.random() * 400) + 70;
    random_y = Math.floor(Math.random() * 400) + 70;
    drawCircles(random_x, random_y, 40, "red");
    random_x = Math.floor(Math.random() * 400) + 70;
    random_y = Math.floor(Math.random() * 400) + 70;
    drawCircles(random_x, random_y, 40, "blue");
    random_x = Math.floor(Math.random() * 400) + 70;
    random_y = Math.floor(Math.random() * 400) + 70;
    drawCircles(random_x, random_y, 40, "green");
}

