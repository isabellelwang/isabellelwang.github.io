
function makeTable(list) {
    var body = document.getElementsByTagName("body")[0]; 

    var table = document.createElement("table"); 
    body.appendChild(table); 
    var headerrow = document.createElement("tr"); 

    table.appendChild(headerrow); 
    // username
    var userheader = document.createElement("th"); 
    userheader.textContent = "User"; 
    headerrow.appendChild(userheader); 

    //password
    var pwheader = document.createElement("th"); 
    pwheader.textContent = "Password"; 
    headerrow.appendChild(pwheader); 

    // loggedtimes 
    var loggedTimesHeader = document.createElement("th"); 
    loggedTimesHeader.textContent = "Logged times"; 
    headerrow.appendChild(loggedTimesHeader);   
    
    for (let i = 0; i < list.length; i++) {
        var tab_row = document.createElement("tr"); 
        table.appendChild(tab_row); 

        var userdata = document.createElement("td"); 
        userdata.textContent = list[i].username;
        tab_row.appendChild(userdata); 

        var pwdata = document.createElement("td"); 
        pwdata.textContent = list[i].password; 
        tab_row.appendChild(pwdata); 

        var ltdata = document.createElement("td"); 
        ltdata.textContent = list[i].loggedtimes; 
        tab_row.appendChild(ltdata); 
    }
}

function sortedTable(sortBy, list) {
    var table = document.getElementsByTagName("table")[0]; 
    if (table != null) {
        table.remove(); 
    }
    if (sortBy == "user") {
        list.sort(function(a, b) {return a.username.localeCompare(b.username)}); 
    }
    else if (sortBy == "password") {
        list.sort(function(a, b) {return  a.password.localeCompare(b.password)}); 
    }
    else if (sortBy == "loggedtimes") {
        list.sort(function(a, b) {return a.loggedtimes - b.loggedtimes}); 
    }

    makeTable(list); 
}

function timeLoggedIn(timeStart) {
    var timeStop = Date.now(); 
    var millisecondsPassed = timeStop - timeStart; 
    var minutesPassed = Math.floor(millisecondsPassed / 60000);
    return minutesPassed; 
}


function showSlide(n) {
                    // Remove active class from all slides
                    slides.forEach(slide => slide.classList.remove('active'));
                    
                    // Wrap around if needed
                    if (n >= totalSlides) {
                        currentSlide = 0;
                    } else if (n < 0) {
                        currentSlide = totalSlides - 1;
                    } else {
                        currentSlide = n;
                    }
                    
                    // Show current slide
                    slides[currentSlide].classList.add('active');
                    
                    // Update counter
                    document.getElementById('slideCounter').textContent = 
                        (currentSlide + 1) + ' / ' + totalSlides;
                }

                // Change slide by offset
                function changeSlide(offset) {
                    showSlide(currentSlide + offset);
                }

                // Auto-advance slideshow
                function autoAdvance() {
                    if (isPlaying) {
                        changeSlide(1);
                    }
                }

                // Toggle play/pause
                function toggleSlideshow() {
                    const btn = document.getElementById('playPauseBtn');
                    if (isPlaying) {
                        isPlaying = false;
                        btn.textContent = 'Play';
                        clearInterval(slideshowInterval);
                    } else {
                        isPlaying = true;
                        btn.textContent = 'Pause';
                        slideshowInterval = setInterval(autoAdvance, 3000);
                    }
                }


