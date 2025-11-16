<html>
<body>

<?php include "./php/func.php";  
session_start(); ?>

Goodbye <?php echo $_SESSION['username']; ?>... Logging out and updating database. 


<script src="./js/script.js"></script> 

<?php 
$logout_time = time(); 
$timelogged = $logout_time - $_SESSION['login_time'];
$user = getUser("users.json", $_SESSION['user_number']); 
update_user_log("users.json", $user, $timelogged);
session_destroy(); 
?>


</body>
</html>