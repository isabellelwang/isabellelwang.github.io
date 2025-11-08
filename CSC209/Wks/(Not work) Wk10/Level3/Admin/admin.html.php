<html> 
    <head>
        <style>
        table, th, td
         {
        border:1px solid black;
        padding: 10px; 
        }
        </style>
        <?php 
        if (file_exists("../users.json")) {
            $x = file_get_contents("../users.json"); 
            $items = json_decode($x, true); # change string into PHP array of Objects
        }
        ?> 
        <script>
        var list = <?php echo json_encode($items) ?>; 
        </script>
    <head> 

    <body id="body">
        <input type="button" value="username" onclick="sortedTable('user')">
        <input type="button" value="Password" onclick="sortedTable('password')">
        <input type="button" value="loggedTimes" onclick="sortedTable('loggedtimes')"> 
        <input type="button" value="refresh" onclick="refreshTable()"> 

        <script src="../js/script.js"></script> 

        <script>
        sortedTable(list, "user"); 

        function refreshTable() {
            const xhttp = new XMLHttpRequest();
            xttp.onload() = function() {
                document.getElementById("body").innerHTML = this.responseText;
            }
            xttp.open("GET", "../php/func.php");
            xttp.send();
        }
        </script> 
<html>