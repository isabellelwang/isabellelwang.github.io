function openNav() {
    toggleMenu();
}

function closeNav() {
    toggleMenu();
}

function toggleMenu() {
    var navBar = document.getElementById("myNav");
    if (navBar.style.width == "100%") {
        navBar.style.width = "0%";
    } else if (navBar.style.width == "" || navBar.style.width == "0%") {
        navBar.style.width = "100%";
    }
}

function createLinks() {
    var d = document.getElementsByClassName("overlay-content"); 
    for (let i = 0; i < NRPROJECTS; i++) {
        var item = document.createElement("a"); 
        item.setAttribute("href", PROJECTLINKS[i]); 
        var link_name = document.createTextNode(PROJECTNAMES[i]); 
        item.appendChild(link_name); 
        d[0].appendChild(item); 
    }
}

createLinks(); 