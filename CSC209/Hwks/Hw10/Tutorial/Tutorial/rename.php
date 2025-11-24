<?php
$path = "images";
if(!rmdir($path)) {
  echo ("Could not remove $path");
}
?>