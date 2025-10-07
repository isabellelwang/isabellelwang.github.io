
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

function createSlides() {
  var slideshowContainer = document.getElementsByClassName("slideshow-container")[0];
  for (var i = 0; i < NUM_IMAGES; i++) {
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "mySlides");
    var numberDiv = document.createElement("div");
    numberDiv.setAttribute("class", "numbertext");
    var numberText = document.createTextNode((i + 1) + " / "+ NUM_IMAGES);
    numberDiv.appendChild(numberText);
    mainDiv.appendChild(numberDiv);
    var image = document.createElement("img");
    image.setAttribute("src", "images/" + imgNames[i] + ".jpg");
    image.setAttribute("style", "width:100%");
    mainDiv.appendChild(image);
    var captionDiv = document.createElement("div"); 
    var captionText = document.createTextNode(imgCaptions[i]); 
    captionDiv.setAttribute("class", "text");
    captionDiv.appendChild(captionText);
    mainDiv.appendChild(captionDiv);
    slideshowContainer.appendChild(mainDiv);
  }
}
function createDots() {
  var dots = document.getElementById("dots");
  for (var i = 0; i < NUM_IMAGES; i++){
    var dot = document.createElement("span");
    dot.setAttribute("class", "dot");
    dot.setAttribute("onclick", "currentSlide(" + (i + 1) + ")");
    dots.appendChild(dot);
  }
}

