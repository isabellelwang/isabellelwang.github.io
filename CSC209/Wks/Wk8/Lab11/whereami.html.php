<html> 
    <head> 
        <?php 
        $PATH = realpath("whereami.html.php"); 
        $BASE = basename(dirname($PATH, 1));
        $labNrString = substr($BASE,strlen($BASE) - 2, strlen($BASE)); 

        ?>
    </head> 
    <body> 
        <?php 
        // echo ("This page figures its whereabouts"); 
        // echo($PATH); 
        // echo ($labNrString); 
        
        if (is_numeric($labNrString)){
            $labNr = (int)$labNrString; 
            echo("My lab number is $labNr"); 
        }
        ?> 
    </body>

</html> 