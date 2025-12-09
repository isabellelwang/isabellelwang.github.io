<html> 
    <head> 
        <?php
        $filteredLocation = $_GET["filter-location"]; 
        ?>
    </head>

<script src="../js/script.js"></script> 
<script>

    filterEvents(); 

    function filterEvents() {
            const events = <?php echo json_encode(filterEvents('../data/listing.json', $filteredLocation)); ?>; 
            const container = document.getElementById('listingsContainer');
            
            container.innerHTML = '';

            updateListings(events, container); 
        }

</script> 
</htm> 


