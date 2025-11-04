<html> 
    <head>

    <head> 

    <body> 
        <?php 
        if (file_exists("users.json")) {
            $x = file_get_contents("users.json"); 
            $obj = var_dump(json_decode($x)); 
        }
        ?>
    <body> 


<html>