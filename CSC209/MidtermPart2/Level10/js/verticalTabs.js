function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function addNewTabs() {
    for (let i = 0; i < NRTABS; i++) {
        var newButton = BUTTON_TEMPLATE.replace("CAP", "\'" + CAPITAL[i] + "\'").replace("CAP", CAPITAL[i]);
        document.getElementsByClassName("tab")[0].innerHTML += newButton; 
        var tabContent = TAB_TEMPLATE.replace("CAP", "\"" + CAPITAL[i] + "\"").replace("CAP", CAPITAL[i]).replace("CAP", CAPITAL[i]).replace("CTRY", COUNTRY[i]); 
        document.getElementsByTagName("body")[0].innerHTML += tabContent; 
    }
}

function changeColor() {
    var c = document.getElementById("checkColor"); 
    if (c.checked) {
        document.getElementsByTagName("body")[0].style.backgroundColor = "green"; 
    }
    else {
        document.getElementsByTagName("body")[0].style.backgroundColor = "white";
    }
}