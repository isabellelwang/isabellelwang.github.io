function addRow(param1, param2) {
    var newRow = "";
    if (param1 == "check") {
        newRow = ROW.replace("CHECKCROSS1", '"fa fa-check"');
    } else {
        newRow = ROW.replace("CHECKCROSS1", '"fa fa-remove"');
    }

    if (param2 == "check") {
        newRow = newRow.replace("CHECKCROSS2", '"fa fa-check"');
    } else {
        newRow = newRow.replace("CHECKCROSS2", '"fa fa-remove"');
    }

    let table = document.getElementById("tt");
    table.innerHTML += newRow;
}