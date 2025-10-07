function createCircles() {
    for (let i = 0; i < NRPTS; i++) {
        let random_x = Math.floor(Math.random() * (430-70)) + 70; 
        let random_y = Math.floor(Math.random() * (430-70)) + 70;
        let speed = (Math.random() * 9 + 1) * 0.1; //speed factor 0.1 - 1.0; 
        let random_vx = 1 + Math.floor(Math.random() * 22 - 11) * speed;  //multiple by speed factor not including 0
        let random_vy = 1 + Math.floor(Math.random() * 22 - 11) * speed;  //multiply by speed factor not including 0
        const random_color = colors[Math.floor(Math.random() * (colors.length))];
        pts[i] = ({x: random_x, y: random_y, r: 40, vx: random_vx, vy: random_vy, speed: speed, color: random_color, start_x: random_x, start_y: random_y});
        drawCircles(random_x, random_y, 40, speed, random_color);
    }
}

function drawCircles(x, y, r, speed, color) {
    var c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.moveTo(x,y);
    ctx.lineTo(x+(speed * 10),y+(speed*10)); 
    ctx.stroke(); 
}

function changePos() {
    ctx.clearRect(0, 0, 500, 500);
    count = 0; 

    for (let i = 0; i < NRPTS; i++) {
        pts[i].x = Math.floor(Math.random() * (430-70)) + 70;
        pts[i].y = Math.floor(Math.random() * (430-70)) + 70;
        drawCircles(pts[i].x, pts[i].y, 40, pts[i].speed, pts[i].color, pts[i].vx, pts[i].vy);
    } 
    showNumSteps(); 
}

function moveCircles() {
    var c = document.getElementById("myCanvas"); 
    ctx = c.getContext("2d");
    interval = setInterval(step, 100);
}

function step() {
    if (count >= NRSTEPS) {
        clearInterval(interval);
        return 
    } 
    else {
        ctx.clearRect(0, 0, 500, 500);
        for (let i = 0; i < NRPTS; i++) {

            pts[i].x += pts[i].vx; // randomMove(pts[i].x, pts[i].speed);
            pts[i].y += pts[i].vy;// randomMove(pts[i].y, pts[i].speed);

            //touching the wall 
            if ((pts[i].x + pts[i].r) >=  500 || (pts[i].x - pts[i].r) <= 0) {
                pts[i].vx *= -1; 
            }
            else if ((pts[i].y + pts[i].r) >= 500 || (pts[i].y - pts[i].r) <= 0) {
               pts[i].vy *= -1;
            }

            drawCircles(pts[i].x, pts[i].y, 40, pts[i].speed, pts[i].color);
        }
        count += 1; 
    }
}

function showNumPts() {
    var show = document.getElementById("showNumPts");
    show.innerHTML = "Number of Points: " + NRPTS; 
}

function removeCircles(num) {
        ctx.clearRect(0, 0, 500, 500);

        for (let i = 0; i < NRPTS - num; i++) {
            drawCircles(pts[i].x, pts[i].y, 40, pts[i].speed, pts[i].color);
            if (i  < num) {
                let remove = pts.pop();
            }
        }
}

function addCircles(num) {
    for (let i = 0; i < num; i++) {
        random_x = Math.floor(Math.random() * (430-70)) + 70; 
        random_y = Math.floor(Math.random() * (430-70)) + 70;
        speed = (Math.random() * 9 + 1) * 0.1; //speed factor 0.1 - 1.0; 
        random_vx = 1 + Math.floor(Math.random() * 22 - 11) * speed;  //multiple by speed factor not including 0
        random_vy = 1 + Math.floor(Math.random() * 22 - 11) * speed;  //multiply by speed factor not including 0
        const random_color = colors[Math.floor(Math.random() * (colors.length))];
        pts.push({x: random_x, y: random_y, r: 40, vx: random_vx, vy: random_vy, speed: speed, color: random_color});
        drawCircles(random_x, random_y, 40, speed, random_color);
    }
}

function changeNumPts() {
    var box = document.getElementById("numPts"); 
    var val = Number(box.value);// change from String to number 

    if (val > NRPTS) {
        addCircles(Math.abs(box.value - NRPTS)); 
        NRPTS = box.value; // set back to the updated number of squares. 
    }
    else if (val < NRPTS) {
        removeCircles(Math.abs(box.value - NRPTS));
        NRPTS = box.value;
    }
    showNumPts();
}

function reset() {
    ctx.clearRect(0, 0, 500, 500);
    for (let i = 0; i < NRPTS; i++) {
        pts[i].x = pts[i].start_x; 
        pts[i].y = pts[i].start_y; 
        drawCircles(pts[i].x, pts[i].y, 40, pts[i].speed, pts[i].color);
    }
    count = 0; 
    clearInterval(interval);
}


