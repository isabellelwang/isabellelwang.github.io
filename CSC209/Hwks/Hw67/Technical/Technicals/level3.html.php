<html>
    <head> 
        <?php ?>
    </head> 
    <body>
        <h1> Level 3 <h1> 
        <?php $img = glob("./img/*.*"); ?>

        <script> 
        var images = <?php echo json_encode($img) ?> 
        var pic = document.createElement("img"); 
        pic.setAttribute("src", images[0]); 
        pic.style.display = "none"; 
        document.getElementsByTagName("body")[0].appendChild(pic); 


        var dropbox = document.createElement("select"); 
        dropbox.setAttribute("id", "imgs");
        var opt1 = document.createElement("option"); 
        var opt2 = document.createElement("option"); 
        opt2.setAttribute("value", "SelectPic"); 
        opt2.textContent = "Select"
        opt1.setAttribute("value", "bird");
        opt1.textContent = "Bird";
        dropbox.onchange = function() {displayImage(pic)}; 
        dropbox.appendChild(opt2);
        dropbox.appendChild(opt1); 
        document.getElementsByTagName("body")[0].appendChild(dropbox); 


        function displayImage(p) {
            if (p.style.display == "none") {
                p.style.display = "block"; 
            }
            else {
                p.style.display = "none"; 
            }
        }


        </script> 
    </body> 
</html>
