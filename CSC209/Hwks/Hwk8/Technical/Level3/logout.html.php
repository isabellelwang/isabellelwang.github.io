<html>
<body>

<?php include "./php/func.php";  ?>

Goodbye User <?php echo $_POST['userNum']; ?>... Logging out and updating database. 


<script src="./js/script.js"></script> 

<?php 
$user = getUser("users.json", $_POST['userNum']); 
update_user_log("users.json", $user, $_POST['timelogged']); 
?>


</body>
</html>