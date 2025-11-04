<html> 
    <head>

    <head> 

    <body> 
        <?php 
        if (file_exists("users.json")) {
            $x = file_get_contents("users.json"); 
            echo $x; 
            $items = json_decode($x, true); # change string into PHP array of Objects

        }

        ?> 
        <script>
        var list = <?php echo json_encode($items) ?>; 
        list.sort(); 
        var sortedJson = JSON.stringify(list);
        </script> 

        <?php

        // $sorted = json_decode($items, true); 


        $NUM_ITEMS = count($items);  
        echo $NUM_ITEMS; 

        echo "<table>"; 
        echo "<tr>"; 
        echo "<th> username </th>"; 
        echo "<th> password </th>"; 
        echo "<th> logged times </th>"; 
        echo "</tr>"; 

        for ($i = 0; $i < $NUM_ITEMS; $i++) {
            echo "<tr>";
            echo "<td>";
            echo $items[$i]['username'];
            echo "</td>";
            echo "<td>";
            echo $items[$i]['password'];
            echo "</td>";
            echo "<td>";
            echo $items[$i]['loggedtimes'];
            echo "</td>";
            echo "</tr>";            
        }
        
        echo "</table>";
        ?>

    <body> 


<html>