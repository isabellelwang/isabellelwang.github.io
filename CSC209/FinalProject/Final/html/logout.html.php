<html>
<body>

<?php include "../php/func.php";  
session_start(); ?>

Thank you for visiting, <?php echo $_SESSION['username']; ?>

<input type="button" value="Return to Login" onclick="returnLogin()">

<script src="../js/script.js"></script> 



</body>
</html>