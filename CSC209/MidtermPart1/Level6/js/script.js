function addRow(param1, param2) {
    var ROW =
          "<tr><td>Sample text</td><td><i class=CHECKCROSS1></i></td><td><i class=CHECKCROSS2></i></td></tr>";

    for (let i = 0; i < NRROWS; i++) {
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
}