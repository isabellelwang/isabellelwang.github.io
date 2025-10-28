<html> 
    <?php ?>
    <head> 

    </head> 

<body> 
    <h1> level 1 <h1>
    
    <?php 
    $imgs = glob("./img/*.*");  
    echo count($imgs); 
    for ($x = 0; $x < count($imgs);  $x++) {
        echo "<img src="; 
        echo $imgs[$x]; 
        echo ">"; 
    } 
    ?>
    

</body> 


</html> 
