<html>
<body>
<?php include "../php/func.php"; ?> 

<script>
    var seen = <?php echo json_encode(validate_login("../users.json", $_POST['username'], $_POST['password'])) ?>; 
    var curr_user = <?php echo json_encode($_POST['username']);  ?>; 
    
    if (seen) {
        // admin
        if (curr_user == "cathy") {
            window.location.href = "../Admin/admin.html.php"; 
            var update = <?php echo json_encode(update_admin_log("../users.json", $_POST['username'])); ?>; 
        }
        else {
            var userNum = <?php echo json_encode(getUserNumber("../users.json", $_POST['username'])); ?>; 
            window.location.href = "../User" + userNum + "/user" + userNum + ".html.php";
        }
         
    }
    else {
        window.location.href = "../login.html.php"; 
    }
</script> 

</body>
</html>