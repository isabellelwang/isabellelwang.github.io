function addRow() {
    for (let i = 0; i < NRROWS; i++) {
        var newRow = "";
    
        newRow = ROW.replace("CHECKCROSS1", "\"fa " + PART1[i] + "\"");
        newRow = newRow.replace("CHECKCROSS2", "\"fa " + PART2[i] + "\"");
        newRow = newRow.replace("Sample text", NAMES[i]); 
        
        let table = document.getElementById("tt");
        table.innerHTML += newRow;
    }
}