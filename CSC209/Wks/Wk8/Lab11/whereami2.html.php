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
            include 'myLib.php'; 
        
            echo "this is my work for lab " . extractFolderNumber($PATH); 
        ?> 
    </body>

</html> 