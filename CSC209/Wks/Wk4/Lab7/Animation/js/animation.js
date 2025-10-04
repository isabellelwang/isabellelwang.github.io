   
function moveRed()
{   
    var redSquare = document.getElementById("redSq");   
    var redPos = 0;
    var stepRedId = setInterval(stepRed, 10); //calls stepRed every 10 milliseconds. 

    function stepRed() {
        var speed = document.getElementById("redSpeed").value 
            if (redPos >= 350) {
                redPos = 350; 
                clearInterval(stepRedId); 
            }
            else if (speed == "30") {
                redPos += 10; 
                redSquare.style.top = redPos + 'px'; 
                redSquare.style.left = redPos + 'px';
            }
            else if (speed == "20") {
                redPos += 4; 
                redSquare.style.top = redPos + 'px'; 
                redSquare.style.left = redPos + 'px';
            }
            else {
                redPos++; 
                redSquare.style.top = redPos + 'px'; 
                redSquare.style.left = redPos + 'px'; 
            }
    }
}

function moveBlue() {
    var blueSquare = document.getElementById("blueSq"); 
    var bluePos = 350; 
    var stepBlueId = setInterval(stepBlue, 10); 

    function stepBlue() {
        var speed = document.getElementById("blueSpeed").value 
        if (bluePos <= 0) {
            clearInterval(stepBlueId); 
        }
        else if (speed == "30") {
            bluePos-=10; 
            blueSquare.style.top = bluePos + 'px'; 
            blueSquare.style.left = bluePos + 'px'; 
        }
        else if (speed == "20") {
            bluePos-=4; 
            blueSquare.style.top = bluePos + 'px'; 
            blueSquare.style.left = bluePos + 'px'; 
        }
        else {
            bluePos--; 
            blueSquare.style.top = bluePos + 'px'; 
            blueSquare.style.left = bluePos + 'px';
        }
    }
}


