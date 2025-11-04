<html>
<head>
    <?php include "../php/func.php"?>
<script> var timeStart = Date.now(); </script>
<script src="../js/script.js"></script> 
</head>
<body>

Welcome User 2 <br>


<form action="../logout.html.php" method="post" onsubmit="return logTime()">
    <input type="hidden" id="timelogged" name="timelogged" value=""> 
    <input type="hidden" id="numFolder" name="userNum" value="<?php echo extractFolderNumber('CSC209/Hwks/Hwk8/Technical/Level3/User2/user2.html.php')?>">
<input type="submit" value="logout">

<script>
    function logTime() {
        var minutes = timeLoggedIn(timeStart); 
        document.getElementById("timelogged").value = minutes; 
        return true; 
    }   
</script> 

</form>
</body>
</html>