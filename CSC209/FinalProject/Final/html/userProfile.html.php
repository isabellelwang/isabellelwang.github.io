<html>
<head>
<?php 
session_start();
if (!isset($_SESSION["username"])) {
    header("Location: ../index.php");
    exit();
}
$username = $_SESSION["username"];
$user_dir = "../Users/" . $username . "/";
$profile_dir = $user_dir . "profile/";

$profile_pic = glob($profile_dir . "*.{jpg,jpeg,png,gif,webp}", GLOB_BRACE);
$profile_image = !empty($profile_pic) ? $profile_pic[0] : "../images/default-avatar.png";

$user_data_file = $user_dir . "userdata.json";
if (file_exists($user_data_file)) {
    $user_data = json_decode(file_get_contents($user_data_file), true);
} else {
    $user_data = [
        'username' => $username,
        'location' => 'Not specified',
        'bio' => 'No bio yet',
        'joined' => date('Y-m-d')
    ];
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
            <a href="lib.html.php" class="nav-link">Home</a>
            <a href="adminProfile.html.php" class="nav-link active">Profile</a>
        </div>
        <h3>Welcome, <?php echo htmlspecialchars($username); ?>!</h3>
    </div>

    <div class="profile-container">
        <div class="profile-header">
            <div class="profile-picture-container">
                <img src="<?php echo htmlspecialchars($profile_image); ?>" alt="Profile Picture" class="profile-picture">
                <button class="edit-picture-btn" onclick="openImageModal()">Change Photo</button>
            </div>
            
            <div class="profile-info">
                <h1><?php echo htmlspecialchars($username); ?></h1>
                <p class="location"> Location: <?php echo htmlspecialchars($user_data['location']); ?></p>
            </div>

            <button class="edit-profile-btn" onclick="openEditModal()">Edit Profile</button>
        </div>

        <div class="profile-content">

            <!-- Events Section -->
            <div class="profile-section">
                <h2>All Events</h2>
                <div id="myEventsContainer" class="events-grid">
                </div>
            </div>
        </div>
    </div>