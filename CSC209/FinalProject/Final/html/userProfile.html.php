<html>
<head>
<?php 
session_start();
$username = $_SESSION["username"];
$user_dir = "../Users/" . $username . "/";
$profile_dir = $user_dir . "profile/";

$profile_pic = glob($profile_dir . "*.{jpg,jpeg,png,gif,webp}", GLOB_BRACE);
if (count($profile_pic) != 0) {
    $profile_image = $profile_pic[0]; 
} else {
    $profile_image = "../Users/defaultPFP.png"; 
}

$user_data_file = "../data/users.json";
if (file_exists($user_data_file)) {
    $user_data = json_decode(file_get_contents($user_data_file), true);
    for ($i = 0; $i < count($user_data); $i++) {
        if ($user_data[$i]["username"] == $username) {
            $user_info = ["location" => $user_data[$i]["location"]]; 
        }
    }
} 
?>
    <meta charset="UTF-8">
    <title><?php echo htmlspecialchars($username); ?>'s Profile</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body class="profileBody">
    <div class="homeBar">
        <h1>Smith Friends</h1>
        <div class="nav-links">
            <a href="userHome.html.php" class="nav-link">Home</a>
            <a href="../login.html.php" class="nav-link">Logout</a> 
        </div>
        <h3>Welcome, user <?php echo $username; ?>!</h3>
    </div>

    <div class="modal" id="change-photo-modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal('change-photo-model', 'changePhotoForm')">&times;</span>
            <h2>Filter Location</h2>
            <form id="changePhotoForm" onsubmit="return filterEvents()">
                Select image to upload:
                <input type="file" name="fileToUpload" id="fileToUpload">
                <input type="submit" value="Upload Picture">
            </form>
        </div>
    </div>

    <div class="profile-container">
        <div class="profile-header">
            <div class="profile-picture-container">
                <img src="<?php echo $profile_image; ?>" class="profile-picture">
                <button class="edit-picture-btn" onclick="openImageModal()">Change Photo</button>
            </div>
            
            <div class="profile-info">
                <h1><?php echo htmlspecialchars($username); ?></h1>
                <p class="location"> Location: <?php echo $user_info["location"]; ?></p>
            </div>
    </div> 
        <div class="profile-content">
            <div class="profile-section">
                <h2>All Events</h2>
                <div id="listingsContainer" class="events-grid">
                </div>
            </div>
        </div>
    </div>
    <script src="../js/script.js"></script> 
    <script> 
    function getAllListings() {
<?php 
            if (file_exists("../data/listing.json")) {
                $json_content = file_get_contents("../data/listing.json"); 
                $items = json_decode($json_content, true);
            } else {
                $items = array();
            }   
?>
            const events = <?php echo json_encode($items); ?>; 
            
            const container = document.getElementById('listingsContainer');

            if (events.length == 0) {
                container.innerHTML = "<h5> No Events Happening :( </h5>"; 
            }
            else {
                updateListings(events, container); 
            }
        }

        getAllListings(); 
    </script> 
</body>
</html> 