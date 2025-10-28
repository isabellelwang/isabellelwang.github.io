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

