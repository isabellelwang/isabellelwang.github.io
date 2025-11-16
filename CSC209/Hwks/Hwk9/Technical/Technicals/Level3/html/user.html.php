<?php
session_start();

// Check if user is logged in
if (!isset($_SESSION['username'])) {
    header('Location: ../login.html.php');
    exit();
}

// Redirect admin to admin page
if ($_SESSION['username'] === 'cathy') {
    header('Location: admin.html.php');
    exit();
}

include "../php/func.php";

// Get user information from session
$username = $_SESSION['username'];
$userNum = $_SESSION['user_number'];

// Handle file upload
$uploadMessage = '';
$uploadError = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['imageUpload'])) {
    $targetDir = "../Users/User" . $userNum . "/";
    
    // Create directory if it doesn't exist
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    
    $originalFileName = basename($_FILES["imageUpload"]["name"]);
    $targetFile = $targetDir . $originalFileName;
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    
    // Check if image file is actual image
    $check = getimagesize($_FILES["imageUpload"]["tmp_name"]);
    if($check !== false) {
        $uploadOk = 1;
    } else {
        $uploadError = "File is not an image.";
        $uploadOk = 0;
    }
    
    // Check if file already exists
    if (file_exists($targetFile)) {
        $uploadError = "Sorry, file already exists.";
        $uploadOk = 0;
    }
    
    // Check file size (limit to 5MB)
    if ($_FILES["imageUpload"]["size"] > 5000000) {
        $uploadError = "Sorry, your file is too large. Maximum size is 5MB.";
        $uploadOk = 0;
    }
    
    // Allow certain file formats
    $allowedTypes = array("jpg", "jpeg", "png", "gif", "bmp");
    if(!in_array($imageFileType, $allowedTypes)) {
        $uploadError = "Sorry, only JPG, JPEG, PNG, GIF & BMP files are allowed.";
        $uploadOk = 0;
    }
    
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        // Error message already set
    } else {
        // Try to upload file
        if (move_uploaded_file($_FILES["imageUpload"]["tmp_name"], $targetFile)) {
            $uploadMessage = "The file " . htmlspecialchars($originalFileName) . " has been uploaded successfully!";
            // Reload page to show new image
            header("Location: user.html.php?slide=1&uploaded=1");
            exit();
        } else {
            $uploadError = "Sorry, there was an error uploading your file.";
        }
    }
}

// Use glob to get images from user folder
$userFolder = "../Users/User" . $userNum;
$imgs = glob($userFolder . "/*.{jpg,jpeg,png,gif,bmp,JPG,JPEG,PNG,GIF,BMP}", GLOB_BRACE);
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
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        
        /* Header/Menu Styles */
        .menu {
            background-color: #104931ff;
            width: 100%;
            padding: 20px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .menu h3 {
            margin: 0;
            font-size: 24px;
        }
        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .welcome-text {
            font-size: 18px;
        }
        .logout-btn {
            padding: 10px 20px;
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            text-decoration: none;
            display: inline-block;
        }
        .logout-btn:hover {
            background-color: #da190b;
        }
        
        /* Upload Form Styles */
        .upload-container {
            max-width: 1000px;
            margin: 20px auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .upload-container h3 {
            margin-top: 0;
            color: #333;
        }
        .upload-form {
            display: flex;
            gap: 10px;
            align-items: center;
            flex-wrap: wrap;
        }
        input[type="file"] {
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 4px;
            flex: 1;
            min-width: 200px;
        }
        .upload-btn {
            padding: 10px 30px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        .upload-btn:hover {
            background-color: #45a049;
        }
        .message {
            margin-top: 15px;
            padding: 10px;
            border-radius: 4px;
        }
        .success-message {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error-message {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        /* Slideshow Container */
        .slideshow-container {
            max-width: 1000px;
            position: relative;
            margin: 40px auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        /* Slides */
        .mySlides {
            width: 100%;
            height: 600px;
            object-fit: contain;
            background-color: #000;
            border-radius: 4px;
        }
        
        /* Next & previous buttons */
        .prev, .next {
            cursor: pointer;
            position: absolute;
            top: 50%;
            width: auto;
            margin-top: -22px;
            padding: 16px;
            color: white;
            font-weight: bold;
            font-size: 18px;
            transition: 0.6s ease;
            border-radius: 0 3px 3px 0;
            background-color: rgba(0,0,0,0.5);
            text-decoration: none;
            user-select: none;
        }
        
        .next {
            right: 20px;
            border-radius: 3px 0 0 3px;
        }
        
        .prev {
            left: 20px;
        }
        
        .prev:hover, .next:hover {
            background-color: rgba(0,0,0,0.8);
        }
        
        /* Slide info text */
        p {
            text-align: center;
            font-size: 18px;
            color: #333;
            margin-top: 20px;
        }
        
        .no-images {
            text-align: center;
            padding: 100px 20px;
            color: #999;
            font-size: 20px;
        }
    </style>
</head>
<body>
    <div class="menu">
        <h3>User Dashboard</h3>
        <div class="user-info">
            <span class="welcome-text">Welcome, <?php echo htmlspecialchars($username); ?>! (User #<?php echo $userNum; ?>)</span>
            <a href="../logout.php" class="logout-btn">Logout</a>
        </div>
    </div>

    <!-- Upload Form -->
    <div class="upload-container">
        <h3>Upload New Image</h3>
        <form class="upload-form" action="user.html.php" method="post" enctype="multipart/form-data">
            <input type="file" name="imageUpload" accept="image/*" required>
            <input type="submit" value="Upload Image" class="upload-btn">
        </form>
        
        <?php if (isset($_GET['uploaded']) && $_GET['uploaded'] == 1): ?>
            <div class="message success-message">
                Image uploaded successfully! Your slideshow has been updated.
            </div>
        <?php endif; ?>
        
        <?php if ($uploadError): ?>
            <div class="message error-message">
                <?php echo htmlspecialchars($uploadError); ?>
            </div>
        <?php endif; ?>
    </div>

    <!-- Slideshow -->
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
        <p>Slide <?php echo $slideIndex; ?> / <?php echo $NUM_IMAGES; ?> - Name: <?php echo htmlspecialchars($imgname); ?></p>
    <?php else: ?>
        <div class="upload-container">
            <div class="no-images">
                No images found in your folder. Upload your first image above!
            </div>
        </div>
    <?php endif; ?>
</body>
</html>