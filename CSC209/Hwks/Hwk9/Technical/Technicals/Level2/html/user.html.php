<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>User Dashboard</title>
    <?php
session_start();
include "../php/func.php";

$username = $_SESSION['username'];
$userNum = $_SESSION['user_number'];

?>

</head>
<body>
    <div class="header">
        <div>
            <div class="welcome">Welcome, <?php echo $username; ?>!</div>
            <div class="user-info">User #<?php echo $userNum; ?></div>
        </div>
        <a href="../logout.html.php" class="logout-btn">Logout</a>
    </div>
</body>
</html>