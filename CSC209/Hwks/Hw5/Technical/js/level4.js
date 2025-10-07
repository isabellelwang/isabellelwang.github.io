function createCircles() {
    for (let i = 0; i < NRPTS; i++) {
        random_x = Math.floor(Math.random() * (430-70)) + 70; 
        random_y = Math.floor(Math.random() * (430-70)) + 70;
        speed = Math.floor(Math.random() * (100-10)) + 10; 
        const random_color = colors[Math.floor(Math.random() * colors.length - 1)];
        pts[i] = ({x: random_x, y: random_y, r: 40, speed: speed, color: random_color});
        drawCircles(random_x, random_y, 40, speed, random_color);
    }
}

function drawCircles(x, y, r, speed, color) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.stroke();
    ctx.moveTo(x,y);
    ctx.lineTo(x+speed,y+speed); 
    ctx.strokeStyle = color;
    ctx.stroke(); 
}

function changePos() {
    var c = document.getElementById("myCanvas"); 
    var ctx = c.getContext("2d"); 
    ctx.clearRect(0, 0, 500, 500);

    for (let i = 0; i < NRPTS; i++) {
        random_x = Math.floor(Math.random() * 400) + 70;
        random_y = Math.floor(Math.random() * 400) + 70;
        drawCircles(random_x, random_y, 40, pts[i].speed, pts[i].color);
    } 
}

