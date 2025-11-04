function makeTable() {
    var body = document.getElementsByTagName("body")[0]; 

    var table = document.createElement("table"); 
    body.appendChild(table); 
    var headerrow = document.createElement("tr"); 

    table.appendChild(headerrow); 
    // username
    var userheader = document.createElement("th"); 
    userheader.textContent = "User"; 
    // var userButton = document.createElement("input"); 
    // userButton.value = "username"; 
    // userButton.style.backgroundColor = "white"; 
    // userButton.type = "button"; 
    // userheader.appendChild(userButton); 
    headerrow.appendChild(userheader); 

    //password
    var pwheader = document.createElement("th"); 
    pwheader.textContent = "Password"; 
    // var pwButton = document.createElement("input"); 
    // pwButton.value = "password"; 
    // pwButton.style.backgroundColor = "white"; 
    // pwButton.type = "button"; 
    // pwheader.appendChild(pwButton); 
    headerrow.appendChild(pwheader); 

    // loggedtimes 
    var loggedTimesHeader = document.createElement("th"); 
    loggedTimesHeader.textContent = "Logged times"; 
    // var ltButton = document.createElement("input"); 
    // ltButton.value = "password"; 
    // ltButton.style.backgroundColor = "white"; 
    // ltButton.type = "button"; 
    // loggedTimesHeader.appendChild(ltButton); 
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

function sortedTable(sortBy) {
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