function addRow(i) {
    var newRow = "";
    
    newRow = ROW.replace("CHECKCROSS1", "\"fa " + PART1[i] + "\"");
    newRow = newRow.replace("CHECKCROSS2", "\"fa " + PART2[i] + "\"");
    newRow = newRow.replace("Sample text", NAMES[i]); 
        
    let table = document.getElementById("table_1");
    table.innerHTML += newRow;
}

function addAllRows() {
    for (let i = 0; i < NRROWS; i++) {
        addRow(i); 
    }
}
