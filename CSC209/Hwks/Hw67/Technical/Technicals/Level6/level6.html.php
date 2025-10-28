<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/stylesheet.cs"> 
</head>
<body>

<?php
// Get images from folder 
//Source: https://www.w3schools.com/php/php_superglobals_get.asp
$img = glob("../img/*.*");
$NUM_IMAGES = count($img);

// Get current slide using URL
if (isset($_GET['slide'])) {
    $slideIndex = (int)$_GET['slide'];
} else {
    $slideIndex = 1;
}

// adjust slide index
if ($slideIndex > $NUM_IMAGES) {
  $slideIndex = 1;
}
else if ($slideIndex < 1)  {
  $slideIndex = $NUM_IMAGES;
}


// Calculate previous and next slide numbers
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
?>


<div class="slideshow-container">
  
  <a class="prev" href="?slide=<?php echo $prevSlide; ?>">&#10094;</a>
  <img class="mySlides" src="<?php echo $img[$slideIndex - 1]; ?>">
  <a class="next" href="?slide=<?php echo $nextSlide; ?>">&#10095;</a>
</div>

<br>
<?php 
$img = basename($img[$slideIndex-1]); 
$periodIndex = strpos($img, "."); 
$imgname = substr($img, 0, $periodIndex); ?>
<p style="text-align:center"> Slide <?php echo (string)($slideIndex) ?> Name: <?php echo $imgname ?></p>
</body>
</html>