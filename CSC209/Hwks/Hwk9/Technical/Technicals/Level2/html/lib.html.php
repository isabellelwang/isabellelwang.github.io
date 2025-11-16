<html>
<body>

<?php
session_start();
include "../php/func.php";

$seen = validate_login("../users.json", $_POST['username'], $_POST['password']);
$curr_user = $_POST['username'];

if ($seen) {
    $_SESSION['username'] = $curr_user;
    $_SESSION['login_time'] = time(); // Store login timestamp
    
    $page = ""; 
    if ($curr_user == "cathy") {
        update_admin_log("../users.json", $curr_user);
        $page = "admin.html.php";
    } else {
        $userNum = getUserNumber("../users.json", $curr_user);
        $_SESSION['user_number'] = $userNum;
        
        $page = "../html/user.html.php";
    }
} else {
    $page = "../login.html.php"; 
}
?>
<script> 

var page = <?php echo json_encode($page); ?>;
window.alert(page); 
window.location.href = page;

</script> 

</body>
</html>


