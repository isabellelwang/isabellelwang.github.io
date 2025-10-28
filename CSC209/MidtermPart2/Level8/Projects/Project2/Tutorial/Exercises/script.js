function hideImage(imgName) {
    var img = document.getElementById(imgName); 
    img.style.display = "none";
}

function showDate() {
    var change = document.getElementById("date"); 
    var today = new Date(); 

    if (change.innerHTML == "") {
        change.innerHTML = today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear(); 
        change.style.display = "block"; 
        document.getElementById("dateButton").textContent = "Hide Date"; 
    } else {
        change.innerHTML=""; 
        change.style.display = "none"; 
        document.getElementById("dateButton").textContent = "Today's Date is:"
    }
}

function changeBackground() {
    document.body.style.backgroundColor = "lightblue"; 
}

function changeText() {
    var text = document.getElementById("Title"); 
    text.innerHTML = "Hello Everyone!"; 
}




