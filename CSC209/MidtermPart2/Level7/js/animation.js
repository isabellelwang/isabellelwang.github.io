function createCircles() {
    for (let i = 0; i < NRPTS; i++) {
        let random_x = Math.floor(Math.random() * (430-70)) + 70; 
        let random_y = Math.floor(Math.random() * (430-70)) + 70;
        let speed = (Math.random() * 9 + 1) * 0.1; //speed factor 0.1 - 1.0; 
        let random_vx = 1 + Math.floor(Math.random() * 22 - 11) * speed;  //multiple by speed factor not including 0
        let random_vy = 1 + Math.floor(Math.random() * 22 - 11) * speed;  //multiply by speed factor not including 0
        const random_color = colors[Math.floor(Math.random() * (colors.length))];
        pts[i] = ({x: random_x, y: random_y, r: 40, vx: random_vx, vy: random_vy, speed: speed, color: random_color, start_x: random_x, start_y: random_y});
        drawCircles(random_x, random_y, 40, speed, random_color, random_vx, random_vy);
    }
}

function drawCircles(x, y, r, speed, color, vx, vy) {
    var c = document.getElementById("myCanvas");
    var tracer = document.getElementById("trace");
    ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
    if (tracer.checked) {
        ctx.fillStyle = color;
        //found this variable via stack overflow 
        ctx.globalAlpha = 0.001;  
        ctx.fill(); 
        ctx.globalAlpha = 0.3; 
    }
    ctx.moveTo(x,y);
    ctx.lineTo(x+(vx * 10),y+(vy*10)); 
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
    var tracer = document.getElementById("trace");
    if (count >= NRSTEPS) {
        clearInterval(interval);
        return 
    } 
    else {
        if (!tracer.checked) {
            ctx.clearRect(0, 0, 500, 500);
        }
        for (let i = 0; i < NRPTS; i++) {

            pts[i].x += pts[i].vx * changeTemp(); // randomMove(pts[i].x, pts[i].speed);
            pts[i].y += pts[i].vy * changeTemp();// randomMove(pts[i].y, pts[i].speed);

            //touching the wall 
            if ((pts[i].x + pts[i].r) >=  500 || (pts[i].x - pts[i].r) <= 0) {
                pts[i].vx *= -1; 
            }
            else if ((pts[i].y + pts[i].r) >= 500 || (pts[i].y - pts[i].r) <= 0) {
               pts[i].vy *= -1;
            }

            drawCircles(pts[i].x, pts[i].y, 40, pts[i].speed, pts[i].color, pts[i].vx, pts[i].vy);
        }
        count += 1;
        showNumSteps(); 
    }
}

function showNumPts() {
    var show = document.getElementById("showNumPts");
    show.innerHTML = "Number of Points: " + NRPTS; 
}

function removeCircles(num) {
        ctx.clearRect(0, 0, 500, 500);

        for (let i = 0; i < NRPTS - num; i++) {
            drawCircles(pts[i].x, pts[i].y, 40, pts[i].speed, pts[i].color, pts[i].vx, pts[i].vy);
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
        drawCircles(random_x, random_y, 40, speed, random_color, pts[i].vx, pts[i].vy);
    }
}

function changeNumPts() {
    var box = document.getElementById("numPts"); 
    var val = Number(box.value);// change from String to number 

    if (val > NRPTS) {
        addCircles(Math.abs(val - NRPTS)); 
        NRPTS = val; // set back to the updated number of squares. 
    }
    else if (val < NRPTS) {
        removeCircles(Math.abs(val - NRPTS));
        NRPTS = val;
    }
    showNumPts();
}

function changeSteps() {
    var s = document.getElementById("numSteps"); 
    count = 0; 
    NRSTEPS = Number(s.value);
    showNumSteps(); 
}

function reset() {
    ctx.clearRect(0, 0, 500, 500);
    for (let i = 0; i < NRPTS; i++) {
        pts[i].x = pts[i].start_x; 
        pts[i].y = pts[i].start_y; 
        drawCircles(pts[i].x, pts[i].y, 40, pts[i].speed, pts[i].color, pts[i].vx, pts[i].vy);
    }
    count = 0; 
    clearInterval(interval);
}

//increse velocity based on temperature by a certain factor 
function changeTemp() {
    var temp = document.getElementById("temps"); 
    var val = temp.value;
    if (val == "freeze") {
        factor = 0.1; 
    }
    else if (val == "room") {
        factor = 0.5; 
    }
    else if (val == "hot") {
        factor = 7.0; 
    }
    return factor; 
}

function showNumSteps() {
    var show = document.getElementById("showNumSteps"); 
    show.innerHTML = "Number of Steps: " + count + "/" + NRSTEPS;
}