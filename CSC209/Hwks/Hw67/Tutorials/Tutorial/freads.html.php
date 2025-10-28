<!DOCTYPE html>
<html>
<body>

<?php
$file = fopen("test.txt","r");
fread($file,"10");
fclose($file);
?>

</body>
</html>