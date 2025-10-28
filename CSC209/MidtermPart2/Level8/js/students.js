function addRow(i) {
    let table = document.getElementById("table_1");
    var new_row = document.createElement("tr"); 
    new_row.setAttribute("class", "added-tr"); 
    var name_data = document.createElement("td"); 
    name_data.innerHTML = NAMES[i]; 
    new_row.appendChild(name_data); 

    var part1_data = document.createElement("td"); 
    var data1 = document.createElement("i");
    data1.setAttribute("class", "fa " + PART1[i]); 
    part1_data.appendChild(data1); 
    new_row.appendChild(part1_data);

    var part2_data = document.createElement("td"); 
    var data2 = document.createElement("i"); 
    data2.setAttribute("class", "fa " + PART2[i]); 
    part2_data.appendChild(data2); 
    new_row.appendChild(part2_data); 
    
    table.appendChild(new_row); 
}

function addAllRows() {
    for (let i = 0; i < NRROWS; i++) {
        addRow(i); 
    }
}