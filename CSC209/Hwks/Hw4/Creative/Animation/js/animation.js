var box = [
    {id: "planet1", src: "./img/planet1.png", top: 0, left: 0, direction: "horizontal"},
    {id: "planet2", src: "./img/earth.jpg", top: 230, left: 120, direction: "diagonal"}, 
    {id: "planet3", src: "./img/nebula.jpg", top: 40, left: 130, direction: "vertical"},
    {id: "meteor", src: "./img/meteor.jpg", top: 200, left:10, direction: "vertical"}, 
    {id: "astronaut", src: "./img/astronaut.jpg", top: 175, left: 0, direction: "horizontal"}
]; 

 var container = document.getElementById('myContainer'); 
 const max_x = 350; 
 const max_y = 350; 
 var square = [box.length]; 

function randomizePos() {
    for (let i = 0; i < box.length; i++) {
        box[i].top = Math.floor(Math.random() * max_y); 
        box[i].left = Math.floor(Math.random() * max_x); 
        square[i].style.top = box[i].top + "px"; 
        square[i].style.left = box[i].left + "px"; 
    }
}

function createSquares() {
    for (let i = 0; i < box.length; i++) {
        var sq = document.createElement('div');
        sq.style.backgroundImage = "url(" + box[i].src + ")"; 
        sq.style.backgroundRepeat= "no-repeat"; 
        sq.style.backgroundSize = "cover"; 
        sq.id = box[i].id;
        sq.className = "square"; 
        sq.style.top = box[i].top + "px";
        sq.style.left = box[i].left + "px";
        sq.style.position = "absolute";
        container.appendChild(sq);
        square[i] = sq; 
    }
}

function moveSquares() {
    for (let i = 0; i < box.length; i++) {
        let s = box[i]; 
        let dir = s.direction; 
        let stepId = setInterval(step, 10); 
        let y = s.top; 
        let x = s.left; 

        function step() {
            if (dir == "diagonal") {
                //Q1
                if (x > max_x/2 && y < max_y/2) {
                    moveDiagDownRL(s, stepId);
                }
                // Q2
                else if (x <= max_x/2 && y <= max_y/2) {
                    moveDiagDownLR(s, stepId);
                }
                // Q3
                else if (x > max_x/2 && y >= max_y/2) {
                    moveDiagUpRL(s, stepId);
                }
                // Q4
                else {
                    moveDiagUpLR(s, stepId);
                }
            } else if (dir=="vertical") {
                if (y >= (Math.floor(max_y/2))) {
                    moveUp(s, stepId); 
                }
                else {
                    moveDown(s, stepId); 
                }
            } else if (dir == "horizontal") {
                if (x >= Math.floor(max_x/2)) {
                    moveLeft(s, stepId); 
                }
                else {
                    moveRight(s, stepId); 
                }
            }
        }
    }
}

function moveLeft(s, stepInt) {
    var square = document.getElementById(s.id); 
    var pos = s.left; 

    if (pos <= 0) {
        clearInterval(stepInt); 
        s.left = pos; 
    }
    else {
        pos -= 2; 
        square.style.left = pos + "px"; 
        s.left = pos; 
    }
}

function moveRight(s, stepInt) {
    var square = document.getElementById(s.id); 
    var pos = s.left; 

    if (pos >= max_x) {
        clearInterval(stepInt); 
        s.left = pos; 
    } else {
        pos += 2;
        square.style.left = pos + "px"; 
        s.left = pos;
    }
}

function moveUp(s, stepInt) {
    var square = document.getElementById(s.id); 
    var pos = s.top; 

    if (pos <= 0) {
        clearInterval(stepInt); 
        s.top = pos; 
    }
    else {
        pos -= 2; 
        square.style.top = pos + "px"; 
        s.top = pos; 
    }
}

function moveDown(s, stepInt) {
    var square = document.getElementById(s.id); 
    var pos = s.top; 

    if (pos >= max_y) {
        clearInterval(stepInt); 
        s.top = pos;
    } else {
        pos += 2; 
        square.style.top = pos + "px"; 
        s.top = pos; 
    }
}

// move from top left to bottom right (0,0) -> (350, 350)
function moveDiagDownLR(s, stepInt) {   
    var square = document.getElementById(s.id); 
    var x_pos = s.left;
    var y_pos = s.top; 
    
    if (x_pos >= max_x || y_pos >= max_y) {
            clearInterval(stepInt); 
            s.left = x_pos; 
            s.top= y_pos; 
        }
        else {
            x_pos+=2; 
            y_pos+=2; 
            square.style.top = y_pos + 'px'; 
            square.style.left = x_pos + 'px'; 
            s.left = x_pos; 
            s.top= y_pos; 
        }
}

// move from bottom left to top right 
function moveDiagUpLR(s, stepInt) {   
    var square = document.getElementById(s.id); 
    var x_pos = s.left;
    var y_pos = s.top; 
    
    if (x_pos >= max_x || y_pos <= 0) {
            clearInterval(stepInt); 
            s.left = x_pos; 
            s.top= y_pos; 
        }
        else {
            x_pos+=2; 
            y_pos-=2; 
            square.style.top = y_pos + 'px'; 
            square.style.left = x_pos + 'px'; 
            s.left = x_pos; 
            s.top= y_pos; 
        }
}

// move from top right to bottom left 
function moveDiagDownRL(s, stepInt) {   
    var square = document.getElementById(s.id); 
    var x_pos = s.left;
    var y_pos = s.top; 
    
    if (x_pos <= 0 || y_pos >= max_y) {
            clearInterval(stepInt); 
            s.left = x_pos; 
            s.top= y_pos; 
        }
        else {
            x_pos-=2; 
            y_pos+=2; 
            square.style.top = y_pos + 'px'; 
            square.style.left = x_pos + 'px'; 
            s.left = x_pos; 
            s.top= y_pos; 
        }
}

// (350, 350) -> (0,0)
function moveDiagUpRL(s, stepInt) {
    var square = document.getElementById(s.id); 
    var x_pos = s.left;
    var y_pos = s.top;  

        if (x_pos <= 0 || y_pos <= 0) {
            clearInterval(stepInt); 
            s.left = x_pos; 
            s.top= y_pos; 
        }
        else {
            x_pos-=2; 
            y_pos-=2; 
            square.style.top = y_pos + 'px'; 
            square.style.left = x_pos + 'px';
            s.left = x_pos; 
            s.top= y_pos; 
        }
}