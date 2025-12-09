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
}

$user_data_file = "../data/users.json";
if (file_exists($user_data_file)) {
    $user_data = json_decode(file_get_contents($user_data_file), true);
    for ($i = 0; $i < count($user_data); $i++) {
        if ($user_data[$i]["username"] == $username) {
            $user_info = ["location" => $user_data[$i]["location"], "posts" => $user_data[$i]["posts"], "bookmarks" => $user_data[$i]["bookmarkedPosts"]]; 
        }
    }
} 
?>
    <meta charset="UTF-8">
    <title><?php echo htmlspecialchars($username); ?>'s Profile</title>
    <link rel="stylesheet" href="../css/profile.css">
</head>
<body>
    <div class="homeBar">
        <h1>Smith Friends</h1>
        <div class="nav-links">
            <button class="edit-profile-btn" onclick="openEditPage()">Edit Users</button>
            <a href="adminHome.html.php" class="nav-link">Home</a>
            <a href="logout.html.php" class="nav-link">Logout</a> 
        </div>
        <h3>Welcome, <?php echo $username; ?>!</h3>
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
                <div id="myEventsContainer" class="events-grid">
                </div>
            </div>
        </div>
    </div>
    <script src="../js/script.js"></script> 
</body>
</html> 