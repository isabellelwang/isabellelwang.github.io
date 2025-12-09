function returnLogin() {
    window.location.href= "../login.html.php"; 

}

function openEditPage() {
    window.location.href="../html/editUser.html.php"; 
}

function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function closeModal(id, form) {
    document.getElementById(id).style.display = 'none';
    document.getElementById(form).reset();
}

function populateTimeFilter() {
    var startTime = document.getElementById("starttime"); 
    var endTime = document.getElementById("endtime"); 

    for (let i=1; i<=24; i++) {
        var endOpt = document.createElement('option'); 
        if (i >= 13) {
            endOpt.textContent = String(i - 12) + " PM"; 
        }
        else if (i == 12) {
            endOpt.textContent = String(i) + " PM"; 
        }
        else if (i == 24) {
            endOpt.textContent = String(i - 12) + "AM";
        }
        else {
            endOpt.textContent = String(i) + " AM"; 
        }
        endTime.appendChild(endOpt); 
    }

    for (let i=1; i<=24; i++) {
        var startOpt = document.createElement('option'); 
        if (i >= 13) {
            startOpt.textContent = String(i - 12) + " PM"; 
        }
        else if (i == 12) {
            startOpt.textContent = String(i) + " PM"; 
        }
         else if (i == 24) {
            endOpt.textContent = String(i - 12) + "AM";
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

function updateListings(events, container) {
    container.innerHTML = '';
    
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.setAttribute('data-id', event.id);
        
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
                        <input type="button" value="Bookmark"></input>
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