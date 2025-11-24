
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
    
    //delete row
    var delHeader = document.createElement("th"); 
    delHeader.textContent = "Delete"; 
    headerrow.appendChild(delHeader);  

    //edit button 
    var editHeader = document.createElement("th"); 
    editHeader.textContent = "Edit"; 
    headerrow.appendChild(editHeader); 

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

        var del = document.createElement("td"); 
        var btn = document.createElement("input"); 
        btn.type = "button"; 
        btn.value = "Delete User"; 
        btn.onclick = function() { deleteUser(list[i].username); };
        del.appendChild(btn); 
        tab_row.appendChild(del); 

        var ed = document.createElement("td");
        var btn1 = document.createElement("input"); 
        btn1.type = "button"; 
        btn1.value = "Edit User"; 
        btn1.onclick = function() {editUser(list[i].username); }; 
        ed.appendChild(btn1); 
        tab_row.appendChild(ed); 
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
    slides.forEach(slide => slide.classList.remove('active'));
                    
    if (n >= totalSlides) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = n;
    }        

    slides[currentSlide].classList.add('active');
                    
    document.getElementById('slideCounter').textContent = (currentSlide + 1) + ' / ' + totalSlides;
}

function changeSlide(offset) {
    showSlide(currentSlide + offset);
}

function toggleSlideshow() {
    const btn = document.getElementById('playPauseBtn');
    if (isPlaying) {
        isPlaying = false;
            btn.textContent = 'Play';
    } else {
        isPlaying = true;
        btn.textContent = 'Pause';
        }
}

function deleteUser(username) {
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Response:", this.responseText);
            
            // Parse the updated user list
            var users = JSON.parse(this.responseText);
            
            // Update the global array
            arr = users;
            
            // Clear the current table
            var table = document.getElementsByTagName("table")[0];
            if (table != null) {
                table.remove();
            }
            
            // Rebuild the table with updated data
            makeTable(arr);
        }
    };
    
    xmlhttp.open("POST", "../php/delete.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("username=" + username);
}

function editUser(username) {
    var newUsername = prompt("Enter new username (leave empty to keep current):", username);
    var newPassword = prompt("Enter new password (leave empty to keep current):");

    if ((newUsername === null || newUsername.trim() === '') && 
        (newPassword === null || newPassword.trim() === '')) {
        return;
    }

    var changes = new Array(3);
    changes[0] = username;  // old username
    changes[1] = newUsername; 
    changes[2] = newPassword;
    
    var xmlhttp = new XMLHttpRequest(); 
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Response: ", this.responseText); 
            
            try {
                var response = JSON.parse(this.responseText);
                
                // Check for errors
                if (response.error) {
                    alert("Error: " + response.error);
                    return;
                }
                
                // FIXED: Update the global arr variable with new data
                arr = response;
                
                // Clear the existing table
                var table = document.getElementsByTagName("table")[0];
                if (table != null) {
                    table.remove();
                }
                
                // Recreate the table with updated data
                makeTable(arr);
                
                alert("User updated successfully!");
                
            } catch (e) {
                alert("Error parsing response: " + e.message);
                console.error("Parse error:", e);
            }
        }
    };
    
    xmlhttp.open("POST", "../php/edit.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(changes));
}