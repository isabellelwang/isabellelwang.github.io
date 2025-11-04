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
        if (file_exists("users.json")) {
            $x = file_get_contents("users.json"); 
            $items = json_decode($x, true); # change string into PHP array of Objects
        }
        ?> 
        <script>
        var list = <?php echo json_encode($items) ?>; 
        </script>

    <head> 

    <body>
        <input type="button" value="username" onclick="sortedTable('user')">
        <input type="button" value="Password" onclick="sortedTable('password')">
        <input type="button" value="loggedTimes" onclick="sortedTable('loggedtimes')"> 
        <script src="./js/script.js"></script> 

        <script>
        sortedTable(list, "user"); 
        </script> 

        <!-- 

        // $sorted = json_decode($items, true); 


        // $NUM_ITEMS = count($items);  
        // echo $NUM_ITEMS; 

        // echo "<table>"; 
        // echo "<tr>"; 
        // echo "<th> username </th>"; 
        // echo "<th> password </th>"; 
        // echo "<th> logged times </th>"; 
        // echo "</tr>"; 

        // for ($i = 0; $i < $NUM_ITEMS; $i++) {
        //     echo "<tr>";
        //     echo "<td>";
        //     echo $items[$i]['username'];
        //     echo "</td>";
        //     echo "<td>";
        //     echo $items[$i]['password'];
        //     echo "</td>";
        //     echo "<td>";
        //     echo $items[$i]['loggedtimes'];
        //     echo "</td>";
        //     echo "</tr>";            
        // }
        
        // echo "</table>";
        // 

    <body> 


<html>