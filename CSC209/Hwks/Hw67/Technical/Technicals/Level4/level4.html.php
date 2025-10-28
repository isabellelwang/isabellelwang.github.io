<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="css/style.css">
<?php $img = glob("../img/*.*"); ?>
<script src="js/script.js"></script>


<script>
	image_paths = <?php echo json_encode($img);?>; 
	var imgNames = ["bird1", "bird2", "bird3"];
	var imgCaptions = ["bird1", "bird2", "bird3"];
	const NUM_IMAGES = imgNames.length;
	// initial slide to show
	var slideIndex = 1;
</script>

</head>
<body>


<div class="slideshow-container">

<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
<a class="next" onclick="plusSlides(1)">&#10095;</a>

</div>
<br>
<div id="dots" style="text-align:center">
	
	<script>
		createSlides();
		createDots();
		showSlides(slideIndex);
	</script>

</div>



</body>
</html> 
