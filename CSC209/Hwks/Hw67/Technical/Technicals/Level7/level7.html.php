<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <?php
$categories = glob('./img/*'); 

// Get category from URL 
//Source: https://www.w3schools.com/php/php_superglobals_get.asp
if (isset($_GET['category'])) {
    $currentCategory = $_GET['category']; 
} else {
    $currentCategory = basename($categories[0]); //setting to default folder 1
}

$categoryPath = "./img/" . $currentCategory;
$imgs = glob($categoryPath . "/*.*");
$NUM_IMAGES = count($imgs);

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

<div class="menu">
  <h3> Menu </h3> 
  <?php
  foreach ($categories as $categoryFolder) {
    $categoryName = basename($categoryFolder);
    echo "<a href='?category=$categoryName'>$categoryName</a> ";
  }
  ?>
</div>

<div class="slideshow-container">
  <a class="prev" href="?category=<?php echo $currentCategory; ?>&slide=<?php echo $prevSlide; ?>">&#10094;</a>
  <img class="mySlides" src="<?php echo $imgs[$slideIndex - 1]; ?>" alt="Slide <?php echo $slideIndex; ?>">
  <a class="next" href="?category=<?php echo $currentCategory; ?>&slide=<?php echo $nextSlide; ?>">&#10095;</a>
</div>

<br>
<?php 
$img = basename($imgs[$slideIndex-1]); 
$periodIndex = strpos($img, "."); 
$imgname = substr($img, 0, $periodIndex); ?>
<p style="text-align:center"> Slide <?php echo (string)($slideIndex) ?> Name: <?php echo $imgname ?></p>

</body>
</html>