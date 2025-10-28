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

function showCredits() {
    var change = document.getElementById("credit"); 

    if (change.innerHTML == "") {
        change.innerHTML = "Credits to W3 School: https://www.w3schools.com/howto/default.asp";
        change.style.display = "block"; 
        document.getElementById("creditButton").textContent = "Hide";
    } else {
        change.innerHTML = "";
        change.style.display = "none";
        document.getElementById("creditButton").textContent = "Credit";
    }
}
        
function changeStyle() {
    var currentStyle = document.getElementById('layouts').getAttribute('href'); 

    if (currentStyle == '../css/style.css') {
        document.getElementById('layouts').setAttribute('href', '../css/alternateStyle.css'); 
        document.getElementById('image').setAttribute('src', '../img/smithBackground.jpeg');
    } else {
        document.getElementById('layouts').setAttribute('href', '../css/style.css'); 
        document.getElementById('image').setAttribute('src', '../img/Smith.png');
    }
}

//Looping through tables:https://www.geeksforgeeks.org/javascript/javascript-loop-through-table-cells-using-js/
function hideSchedule() {
    var table = document.getElementById("table-schedule"); 

     for (let i = 0; i < table.rows.length; i++) {
            if(document.getElementById("scheduleButton").textContent == "Show Schedule") {
                table.rows[i].style.display = "table-row"; 
                if (i == table.rows.length - 1) {
                    table.style.display = "block"; 
                    document.getElementById("scheduleButton").textContent = "Hide Schedule";
                }
            }
            else {
                table.rows[i].style.display = "none"; 
                if (i == table.rows.length - 1) {
                    table.style.display = "none"; 
                    document.getElementById("scheduleButton").textContent = "Show Schedule";
                } 
            }
        }
}

function hideRow(rowName) {
    var row = document.getElementById(rowName); 
    row.style.display = "none"; 
    document.getElementById("scheduleButton").textContent = "Show Schedule";
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}