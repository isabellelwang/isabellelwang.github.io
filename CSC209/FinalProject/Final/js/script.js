function returnLogin() {
    window.location.href= "../login.html.php"; 

}

function openEditPage() {
    window.location.href="../html/editUser.html.php"; 
}

function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function openEditModal(modalId, eventId) {
    document.getElementById(modalId).style.display = 'block'; 
    document.getElementById("hiddenID").value = eventId; 
}

function closeModal(id, form) {
    document.getElementById(id).style.display = 'none';
    document.getElementById(form).reset();
}

function populateTimeFilter(startId, endId) {
    var startTime = document.getElementById(startId); 
    var endTime = document.getElementById(endId); 

    for (let i=1; i<=24; i++) {
        var endOpt = document.createElement('option'); 
        if (i == 24) {
            endOpt.textContent = String(i - 12) + " AM";
        }
        else if (i >= 13) {
            endOpt.textContent = String(i - 12) + " PM"; 
        }
        else if (i == 12) {
            endOpt.textContent = String(i) + " PM"; 
        }
        else {
            endOpt.textContent = String(i) + " AM"; 
        }
        endTime.appendChild(endOpt); 
    }

    for (let i=1; i<=24; i++) {
        var startOpt = document.createElement('option'); 

        if (i == 24) {
            startOpt.textContent = String(i - 12) + "AM";
        }
        else if (i >= 13) {
            startOpt.textContent = String(i - 12) + " PM"; 
        }
        else if (i == 12) {
            startOpt.textContent = String(i) + " PM"; 
        }
        else {
            startOpt.textContent = String(i) + " AM"; 
        }
        startTime.appendChild(startOpt); 
    }
}

function getSelectedValue(id) {
    var dropdown = document.getElementById(id); 
    return dropdown.value;
}

function updateListings(events, container, bookmarkedPosts = []) {
    container.innerHTML = '';
    
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.setAttribute('data-id', event.id);
        
        // Check if this event is bookmarked
        const isBookmarked = bookmarkedPosts.includes(event.id) || 
                            bookmarkedPosts.includes(event.id.toString());
        const buttonText = isBookmarked ? "Unbookmark" : "Bookmark";
        const buttonClass = isBookmarked ? "unbookmark-btn" : "bookmark-btn";
        
        card.innerHTML = `
            <img src="${event.image}" alt="${event.event}" class="event-image">
            <div class="event-content">
                <h2 class="event-title">${event.event}</h2>
                <div class="event-info">
                    <div class="info-row">
                        <span class="info-icon">Date: </span>
                        <span>${event.date}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-icon">Location: </span>
                        <span>${event.location}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-icon">Time: </span>
                        <span class="event-time">${event['start-time']} - ${event['end-time']}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-icon">Host: </span>
                        <span>${event.host}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-icon">Bookmark event: </span>
                        <button class="${buttonClass}" onclick="toggleBookmark(${event.id}, this)" data-event-id="${event.id}">
                            ${buttonText}
                        </button>
                    </div>
                </div>
                <div class="event-description">
                    ${event.description}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function convertTo24Hour(time) {
    const time_arr = time.split(" "); 
    var time_int = parseInt(time_arr[0]); 
    var period = time_arr[1]; 

    if (time_int == 12 && period == "AM") {
        time_int -= 12; 
        return time_int; 
    }
    else if (time_int == 12 && period == "PM") {
        return time_int; 
    }
    else if (period == "AM") {
        return time_int; 
    }
    else {
        time_int += 12; 
        return time_int; 
    }
}

 // Show message in the modal
function showMessage(message, type) {
    var messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.className = 'messageBox ' + type;
    
    // Auto-hide after 5 seconds
    if (type === 'success') {
        setTimeout(function() {
            messageBox.className = 'messageBox';
        }, 5000);
    }
}

function makeAdminListingTable(list) {
    var page_div = document.getElementById("listingTable"); 

    var table = document.createElement("table"); 
    page_div.appendChild(table); 
    var headerrow = document.createElement("tr"); 

    table.appendChild(headerrow); 
     // ID
    var idHeader = document.createElement("th");
    idHeader.textContent = "Event ID";
    headerrow.appendChild(idHeader);

    //img header
    var imageheader = document.createElement("th");
    imageheader.textContent = "Image";
    headerrow.appendChild(imageheader);

    // Event Name 
    var eventNameheader = document.createElement("th");
    eventNameheader.textContent = "Event Name";
    headerrow.appendChild(eventNameheader);

    // Event Date
    var eventDateheader = document.createElement("th");
    eventDateheader.textContent = "Event Date";
    headerrow.appendChild(eventDateheader);

    // Event Location 
    var eventLocationheader = document.createElement("th");
    eventLocationheader.textContent = "Event Locaton";
    headerrow.appendChild(eventLocationheader);

    // Start time 
    var eventStartTimeHeader = document.createElement("th");
    eventStartTimeHeader.textContent = "Event Start Time";
    headerrow.appendChild(eventStartTimeHeader);

    // End Time
    var eventEndTimeHeader = document.createElement("th");
    eventEndTimeHeader.textContent = "Event End Time";
    headerrow.appendChild(eventEndTimeHeader);

    // Description 
    var eventDescriptionHeader = document.createElement("th");
    eventDescriptionHeader.textContent = "Event Description";
    headerrow.appendChild(eventDescriptionHeader);

    // Host 
    var hostHeader = document.createElement("th"); 
    hostHeader.textContent = "Event Host"; 
    headerrow.appendChild(hostHeader);   
    
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

        // id
        var idData = document.createElement("td");
        idData.textContent = list[i].id;
        tab_row.appendChild(idData);
        
        var imageData = document.createElement("td");
        imagePic = document.createElement("img");
        imagePic.src = list[i].image;
        imagePic.style.width = "100px"; 
        imageData.appendChild(imagePic);
        tab_row.appendChild(imageData);

        var eventNameData = document.createElement("td"); 
        eventNameData.textContent = list[i].event;
        tab_row.appendChild(eventNameData); 
        
        var eventDateData = document.createElement("td");
        eventDateData.textContent = list[i].date;
        tab_row.appendChild(eventDateData);

        var eventLocationData = document.createElement("td");
        eventLocationData.textContent = list[i].location;
        tab_row.appendChild(eventLocationData);

        var eventStartTimeData = document.createElement("td");
        eventStartTimeData.textContent = list[i]['start-time'];
        tab_row.appendChild(eventStartTimeData);

        var eventEndTimeData = document.createElement("td");
        eventEndTimeData.textContent = list[i]['end-time'];
        tab_row.appendChild(eventEndTimeData);

        var eventDescriptionData = document.createElement("td");
        eventDescriptionData.textContent = list[i].description;
        tab_row.appendChild(eventDescriptionData);

        var hostData = document.createElement("td"); 
        hostData.textContent = list[i].host; 
        tab_row.appendChild(hostData);

        var del = document.createElement("td"); 
        var btn = document.createElement("input"); 
        btn.type = "button"; 
        btn.value = "Delete Event"; 
        btn.onclick = function() { deleteEvent(list[i].id); };
        del.appendChild(btn); 
        tab_row.appendChild(del); 

        var ed = document.createElement("td");
        var btn1 = document.createElement("input"); 
        btn1.type = "button"; 
        btn1.value = "Edit Event";
        btn1.onclick = function() { openEditModal('edit-modal', list[i].id)};
        ed.appendChild(btn1); 
        tab_row.appendChild(ed); 
    }
}

function makeUserListingTable(list, user) {
    var page_div = document.getElementById("listingTable"); 

    var table = document.createElement("table"); 
    page_div.appendChild(table); 
    var headerrow = document.createElement("tr"); 

    table.appendChild(headerrow); 
     // ID
    var idHeader = document.createElement("th");
    idHeader.textContent = "Event ID";
    headerrow.appendChild(idHeader);

    //img header
    var imageheader = document.createElement("th");
    imageheader.textContent = "Image";
    headerrow.appendChild(imageheader);

    // Event Name 
    var eventNameheader = document.createElement("th");
    eventNameheader.textContent = "Event Name";
    headerrow.appendChild(eventNameheader);

    // Event Date
    var eventDateheader = document.createElement("th");
    eventDateheader.textContent = "Event Date";
    headerrow.appendChild(eventDateheader);

    // Event Location 
    var eventLocationheader = document.createElement("th");
    eventLocationheader.textContent = "Event Locaton";
    headerrow.appendChild(eventLocationheader);

    // Start time 
    var eventStartTimeHeader = document.createElement("th");
    eventStartTimeHeader.textContent = "Event Start Time";
    headerrow.appendChild(eventStartTimeHeader);

    // End Time
    var eventEndTimeHeader = document.createElement("th");
    eventEndTimeHeader.textContent = "Event End Time";
    headerrow.appendChild(eventEndTimeHeader);

    // Description 
    var eventDescriptionHeader = document.createElement("th");
    eventDescriptionHeader.textContent = "Event Description";
    headerrow.appendChild(eventDescriptionHeader);

    // Host 
    var hostHeader = document.createElement("th"); 
    hostHeader.textContent = "Event Host"; 
    headerrow.appendChild(hostHeader);   
    
    //delete row
    var delHeader = document.createElement("th"); 
    delHeader.textContent = "Delete"; 
    headerrow.appendChild(delHeader);  

    //edit button 
    var editHeader = document.createElement("th"); 
    editHeader.textContent = "Edit"; 
    headerrow.appendChild(editHeader); 

    for (let i = 0; i < list.length; i++) {
        if (list[i].host == user) {
            var tab_row = document.createElement("tr"); 
            table.appendChild(tab_row); 

            // id
            var idData = document.createElement("td");
            idData.textContent = list[i].id;
            tab_row.appendChild(idData);
            
            var imageData = document.createElement("td");
            imagePic = document.createElement("img");
            imagePic.src = list[i].image;
            imagePic.style.width = "100px"; 
            imageData.appendChild(imagePic);
            tab_row.appendChild(imageData);

            var eventNameData = document.createElement("td"); 
            eventNameData.textContent = list[i].event;
            tab_row.appendChild(eventNameData); 
            
            var eventDateData = document.createElement("td");
            eventDateData.textContent = list[i].date;
            tab_row.appendChild(eventDateData);

            var eventLocationData = document.createElement("td");
            eventLocationData.textContent = list[i].location;
            tab_row.appendChild(eventLocationData);

            var eventStartTimeData = document.createElement("td");
            eventStartTimeData.textContent = list[i]['start-time'];
            tab_row.appendChild(eventStartTimeData);

            var eventEndTimeData = document.createElement("td");
            eventEndTimeData.textContent = list[i]['end-time'];
            tab_row.appendChild(eventEndTimeData);

            var eventDescriptionData = document.createElement("td");
            eventDescriptionData.textContent = list[i].description;
            tab_row.appendChild(eventDescriptionData);

            var hostData = document.createElement("td"); 
            hostData.textContent = list[i].host; 
            tab_row.appendChild(hostData);

            var del = document.createElement("td"); 
            var btn = document.createElement("input"); 
            btn.type = "button"; 
            btn.value = "Delete Event"; 
            btn.onclick = function() { deleteEvent(list[i].id); };
            del.appendChild(btn); 
            tab_row.appendChild(del); 

            var ed = document.createElement("td");
            var btn1 = document.createElement("input"); 
            btn1.type = "button"; 
            btn1.value = "Edit Event";
            btn1.onclick = function() { openEditModal('edit-modal', list[i].id)};
            ed.appendChild(btn1); 
            tab_row.appendChild(ed); 
        }


    }
        
}

function makeUserTable(list) {
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

    // location
    var locationHeader = document.createElement("th"); 
    locationHeader.textContent = "Location"; 
    headerrow.appendChild(locationHeader);   


    //bookmarked posts
    var bookmarkedHeader = document.createElement("th"); 
    bookmarkedHeader.textContent = "Bookmarked Posts"; 
    headerrow.appendChild(bookmarkedHeader);  
    
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

        var lcdata = document.createElement("td"); 
        lcdata.textContent = list[i].location; 
        tab_row.appendChild(lcdata); 

        var bmdata = document.createElement("td"); 
        bmdata.textContent = list[i].bookmarkedPosts; 
        tab_row.appendChild(bmdata); 

        var del = document.createElement("td"); 
        var btn = document.createElement("input"); 
        btn.type = "button"; 
        btn.value = "Delete User"; 
        // btn.onclick = function() { deleteUser(list[i].username); };
        del.appendChild(btn); 
        tab_row.appendChild(del); 

        var ed = document.createElement("td");
        var btn1 = document.createElement("input"); 
        btn1.type = "button"; 
        btn1.value = "Edit User"; 
        // btn1.onclick = function() {editUser(list[i].username); }; 
        ed.appendChild(btn1); 
        tab_row.appendChild(ed); 
    }
}

function deleteEvent(listingID) {
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Response:", JSON.parse(this.responseText));
            
            // Parse the updated user list
            var new_listings = JSON.parse(this.responseText);
            
            // Clear the current table
            var table = document.getElementsByTagName("table")[0];
            if (table != null) {
                table.remove();
            }
            
            // Rebuild the table with updated data
            makeAdminListingTable(new_listings);
        }
    };
    
    xmlhttp.open("POST", "../php/deleteEvents.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("id=" + listingID);
}

function editEvent() {
    var xmlhttp = new XMLHttpRequest(); 
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Response: ", this.responseText); 
            
            try {
                var response = JSON.parse(this.responseText);
                
                arr = response;
                
                // Clear the existing table
                var table = document.getElementsByTagName("table")[0];
                if (table != null) {
                    table.remove();
                }
                
                // Recreate the table with updated data
                makeAdminListingTable(arr);
                
            } catch (e) {
                alert("Error parsing response: " + e.message);
                console.error("Parse error:", e);
            }
        }
    };
    
    xmlhttp.open("POST", "../php/editEvent.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}

 //Calendar Reference: https://dev.to/wizdomtek/creating-a-dynamic-calendar-using-html-css-and-javascript-29m
function renderCalendar(month, year) {
    calendarDates.innerHTML = '';
    monthYear.textContent = `${months[month]} ${year}`;

    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();

    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create blanks for days of the week before the first day
    for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement('div');
        calendarDates.appendChild(blank);
    }

    const today = new Date();

    // Populate the days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;

        // highlights the current date
        if (
        i === today.getDate() &&
        year === today.getFullYear() &&
        month === today.getMonth()
        ) {
        day.classList.add('current-date');
        }
        calendarDates.appendChild(day);
    }
}

function convertMonthtoNumber(month) {
    for (let i = 0; i <= 12; i++) {
        if (month == months[i]) {
            return i + 1; 
        }
    }
    return 0; 

}

function toggleBookmark(eventId, button) {
    button.disabled = true;
    const originalText = button.textContent;

    
    var formData = new FormData();
    formData.append("id", eventId);
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var response = JSON.parse(this.responseText);
                
                if (response.success) {
                    // Button changes appearance based on action
                    if (response.action == "added") {
                        button.textContent = "Unbookmark";
                        button.className = "unbookmark-btn";
                    } else {
                        button.textContent = "Bookmark";
                        button.className = "bookmark-btn";
                    }
                } else {
                    button.textContent = originalText;
                    alert("Error: " + (response.message || "Could not update bookmark"));
                }
            } catch (e) {
                console.error("Error:", e);
                button.textContent = originalText;
                alert("Error updating bookmark");
            }
            
            // allow button to be clickable again
            button.disabled = false;
        } else if (this.readyState == 4) {
            // Error
            console.error("HTTP Error:", this.status);
            button.textContent = originalText;
            button.disabled = false;
        }
    }
    
    xmlhttp.open("POST", "../php/bookmarkEvent.php", true);
    xmlhttp.send(formData);
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
    
    xmlhttp.open("POST", "../php/deleteUser.php", true);
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