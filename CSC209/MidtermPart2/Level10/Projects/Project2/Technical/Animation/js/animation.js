var box = [
    {id: "red", color: "red", top: 0, left: 0, direction: "horizontal"}, 
    {id: "blue", color: "blue", top: 350, left: 350, direction: "diagonal"}, 
    {id: "green", color: "green", top: 0, left: 350, direction: "vertical"},
    {id: "purple", color: "purple", top: 350, left: 0, direction: "diagonal"}, 
    {id: "orange", color: "orange", top: 175, left: 0, direction: "vertical"}
]; 

const max_x = 350; 
const max_y = 350; 

function createSquares() {
    var container = document.getElementById('myContainer'); 
    for (let i = 0; i < box.length; i++) {
        var sq = document.createElement('div');
        sq.id = box[i].id; 
        sq.style.backgroundColor = box[i].color; 
        sq.className = "square";
        sq.style.top = box[i].top + "px";
        sq.style.left = box[i].left + "px";
        sq.style.position = "absolute";
        container.appendChild(sq);
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
                if (y >= max_y/2) {
                    moveUp(s, stepId); 
                }
                else if (y<=max_y/2) {
                    moveDown(s, stepId); 
                }
            } else if (dir == "horizontal") {
                if (x >= max_x/2) {
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