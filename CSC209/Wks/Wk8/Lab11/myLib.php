<?php 
function extractFolderNumber($realpath) {
    $base = basename(dirname($realpath, 1)); 
    $labNrString = substr($base,strlen($base) - 2, strlen($base)); 
    if (is_numeric($labNrString)){
        $labNr = (int)$labNrString; 
        return $labNr; 
    }
}
?>