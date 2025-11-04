<html>
<body>
<?php
function validate_login($file, $user, $pw) {
    if (file_exists($file)) {
        $x = file_get_contents($file); 
        $items = json_decode($x, true); # change string into PHP array of Objects
    }
    
    $seen = false; 
    for ($i = 0; $i < count($items); $i++) {
        if (strcmp($user, $items[$i]["username"]) == 0) {
            if (strcmp($pw, $items[$i]["password"]) == 0) {
                $seen = true; 
            }
        }
    }
    
    return $seen; 
} 

function update_log($file, $user) {
     if (file_exists($file)) {
        $x = file_get_contents($file); 
        $items = json_decode($x, true); # change string into PHP array of Objects

        for ($i = 0; $i < count($items); $i++) {
            if (strcmp($items[$i]["username"],$_POST["username"]) == 0) {
            // Add/update login count
                $items[$i]["loggedtimes"]++;
                file_put_contents($file, json_encode($items, JSON_PRETTY_PRINT));
                break;
            }   
        }
        return True; 
    }
}
?> 

<script>
    seen = <?php echo json_encode(validate_login("users-2.json", $_POST["username"], $_POST["password"])) ?>; 
    
    if (!seen) {
        window.alert(seen); 
        window.location.href = "lab14.html.php";
    }
    else {
        body = document.getElementsByTagName("body")[0]; 
        body.innerHTML += "Welcome " + <?php echo json_encode($_POST['username']); ?>; 
        var b = document.createElement("br"); 
        body.appendChild(b); 
        body.innerHTML += "Your password is :" + <?php echo json_encode($_POST['password']);  ?>; 
        
        var update = <?php echo json_encode(update_log("users-2.json", $_POST['username'])); ?>;   
        window.alert(update.toString()); 
    }
</script> 
</body>
</html>