<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <style>
        table, th, td {
            border: 1px solid black;
            padding: 10px;
            border-collapse: collapse;
        }
    </style>
    
    <?php 
    // Read users.json at the TOP before any HTML/JS
    if (file_exists("../users.json")) {
        $x = file_get_contents("../users.json"); 
        $items = json_decode($x, true);
    } else {
        $items = array();
    }
    
    // Filter out admin user (cathy)
    $usersList = array();
    foreach ($items as $userData) {
        $usersList[] = $userData;
    }
    ?> 
    <script> 
     var arr  = <?php echo json_encode($usersList); ?>;
    </script>
</head>
<body id="body">
    <h1>Admin Dashboard</h1>
    
    <div>
        <input type="button" value="Username" onclick="sortedTable('user', arr)">
        <input type="button" value="Password" onclick="sortedTable('password', arr)">
        <input type="button" value="Logged Times" onclick="sortedTable('loggedtimes', arr)">
        <input type="button" value="Refresh" onclick="refresh()">
    </div>
    
    <script src="../js/script.js"></script>
    
    <script>
        // Initialize list from PHP - this must come AFTER PHP code runs
        var list = <?php echo json_encode($usersList); ?>;
        
        // AJAX refresh function
        function refresh() {
            var xmlhttp = new XMLHttpRequest();
            
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                
                    // Parse as objects 
                    var users = JSON.parse(this.responseText);
                        
                    // clear the table 
                    var table = document.getElementsByTagName("table")[0]; 
                    if (table != null) {
                        table.remove(); 
                    }
            
                    // update
                    arr = users; 
                    makeTable(arr);
                        
                }
            };
            // Open and send the request to the PHP script
            xmlhttp.open("GET", "../php/admin.php", true);
            xmlhttp.send();
        }
        
        // Initial table creation
        sortedTable('user', arr);
    </script>
</body>
</html>