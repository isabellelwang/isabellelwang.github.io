<?php
session_start();

include "../php/func.php";

$username = $_SESSION['username'];
$userNum = $_SESSION['user_number'];

// Handle file upload - W3Schools method
$uploadMessage = '';

if(isset($_POST["submit"])) {
    $target_dir = "../Users/" . $username . "/";
    
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION)); 
    
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadMessage = "File is not an image.";
        $uploadOk = 0;
    }
    
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        $upload = basename($_FILES["fileToUpload"]["name"]); 
    }
}

// adding pictures from the folder with new pics and old pics
$userFolder = "../Users/" . $username . "/";

$imgs = [];

// Get images from primary folder (User#)
if (is_dir($userFolder)) {
    $primaryImgs = glob($userFolder . "*.{jpg,jpeg,png,gif}", GLOB_BRACE);
    if ($primaryImgs !== false) {
        $imgs = array_merge($imgs, $primaryImgs);
    }
}

$imgs = array_unique($imgs);
sort($imgs);
$NUM_IMAGES = count($imgs);

// Get current slide using URL
if (isset($_GET['slide'])) {
    $slideIndex = (int)$_GET['slide'];
} else {
    $slideIndex = 1;
}

// Adjust slide index
if ($NUM_IMAGES > 0) {
    if ($slideIndex > $NUM_IMAGES) {
        $slideIndex = 1;
    }
    else if ($slideIndex < 1)  {
        $slideIndex = $NUM_IMAGES;
    }

    if ($slideIndex - 1 < 1) {
        $prevSlide = $NUM_IMAGES;
    } else {
        $prevSlide = $slideIndex - 1;
    }

    if ($slideIndex + 1 > $NUM_IMAGES) {
        $nextSlide = 1;
    } else {
        $nextSlide = $slideIndex + 1;
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>User Dashboard - Slideshow</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <div class="menu">
        <h3>User Dashboard</h3>
        <p>
            <span>Welcome, <?php echo htmlspecialchars($username); ?>! (User #<?php echo $userNum; ?>)</span>
            <a href="../logout.html.php" class="logout-btn">Logout</a>
        </p>
    </div>

    <div class="upload-section">
        <h3>Upload New Image</h3>
        <form class="upload-form" action="user.html.php" method="post" enctype="multipart/form-data">
            Select image to upload:
            <input type="file" name="fileToUpload" id="fileToUpload">
            <input type="submit" value="Upload Image" name="submit" class="upload-btn">
        </form>
        
        <?php if (isset($_GET['uploaded']) && $_GET['uploaded'] == 'success'): ?>
            <div class="upload-success">
                Image uploaded successfully! Your slideshow has been updated.
            </div>
        <?php endif; ?>
        
        <?php if ($uploadMessage && !isset($_GET['uploaded'])): ?>
            <div class="<?php echo (strpos($uploadMessage, 'uploaded') !== false || strpos($uploadMessage, 'image -') !== false) ? 'upload-success' : 'upload-error'; ?>">
                <?php echo $uploadMessage; ?>
            </div>
        <?php endif; ?>
    </div>

    <?php if ($NUM_IMAGES > 0): ?>
        <div class="slideshow-container">
            <a class="prev" href="?slide=<?php echo $prevSlide; ?>">&#10094;</a>
            <img class="mySlides" src="<?php echo $imgs[$slideIndex - 1]; ?>" alt="Slide <?php echo $slideIndex; ?>">
            <a class="next" href="?slide=<?php echo $nextSlide; ?>">&#10095;</a>
        </div>
        
        <?php 
        $img = basename($imgs[$slideIndex - 1]); 
        $periodIndex = strpos($img, "."); 
        $imgname = substr($img, 0, $periodIndex); 
        ?>
        <p class="slide-info">Slide <?php echo $slideIndex; ?> / <?php echo $NUM_IMAGES; ?> - Name: <?php echo htmlspecialchars($imgname); ?></p>
    <?php else: ?>
        <div class="upload-section">
            <div class="no-images">
                No images found in your folder. Upload your first image above!
            </div>
        </div>
    <?php endif; ?>
</body>
</html>