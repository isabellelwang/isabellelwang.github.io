<html> 
    <head> 
<?php 
include '../php/func.php'; 
session_start();
?> 
        <link rel="stylesheet" href="../css/homePage.css">
        <style>
            body {
                margin: 0;
                padding: 0;
            }

            /* Layout container */
            .content-container {
                display: flex;
                width: 100%;
                margin-top: 20px;
            }

    
            .left {
                width: 40%;
                padding: 20px;
                box-sizing: border-box;
            }

            .left h2 {
                font-size: 24px;
                color: #333;
                margin-bottom: 20px;
            }

            .listing {
                width: 60%;
                padding: 20px;
                box-sizing: border-box;
            }

            .listing h3 {
                font-size: 20px;
                color: #333;
                margin-bottom: 16px;
            }

            .listings-grid {
                display: grid;
                grid-template-columns: repeat(3, 3fr);
                gap: 10px;
            }

            .event-card {
                width: 90%;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                transition: transform 0.2s, box-shadow 0.2s;
                cursor: pointer;
            }

            .event-image {
                width: 100%;
                height: 120px;
                object-fit: cover;
                background: #e0e0e0;
            }

            .event-content {
                padding: 12px;
            }

            .event-title {
                font-size: 16px;
                font-weight: 600;
                color: #333;
                margin-bottom: 8px;
            }

            .event-info {
                display: flex;
                flex-direction: column;
                gap: 4px;
                margin-bottom: 8px;
            }

            .info-row {
                display: flex;
                align-items: center;
                font-size: 12px;
                color: #666;
            }

            .info-icon {
                margin-right: 6px;
                font-size: 14px;
            }

            .event-description {
                font-size: 12px;
                color: #555;
                line-height: 1.4;
                margin-top: 8px;
                border-top: 1px solid #eee;
                padding-top: 8px;
                overflow: hidden;
            }

            .event-time {
                font-weight: 500;
                color: #2563eb;
            }

            .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 300px;
    border-radius: 5px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: black;
}

.modal-content h2 {
    margin-top: 0;
}

.modal-content label {
    display: block;
    margin-top: 10px;
}

.modal-content input[type="text"],
.modal-content input[type="password"] {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
}

.modal-content input[type="submit"] {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

.modal-content input[type="submit"]:hover {
    background-color: #45a049;
}
        </style>
    </head> 
    <body> 
        <div class="homeBar"> 
            <h1> Smith Friends </h1> 
            <h3> Welcome, admin <?php echo $_SESSION["username"] ?>!</h3> 
<?php 
            $path = "../Users/" . $_SESSION["username"] . "/profile/";
            $profile_pic = glob($path . "*.{jpg,jpeg,png,gif,webp}", GLOB_BRACE); 
?>          
            <a href="adminEditPost.html.php">Add/Edit Event Posts</a>
            <a href="adminProfile.html.php">
                <img src="<?php echo $profile_pic[0];?>">
            </a>
        </div>
        
        <!-- Content container with 30/70 split -->
        <div class="content-container">
            <div class="left"> 
                <h2>Your Upcoming Events</h2>
            </div>
            
            <div class="listing">
                <h3>Find Events</h3> 
                <button class="filter-btn" onclick="openModal('modal-location')">Filter Events</button>
                <button class="filter-btn" onclick="openModal('modal-time')">Filter Times</button>
                <div class="listings-grid" id="listingsContainer"></div>
            </div>
        </div>

        <div class="modal" id="modal-location">
            <div class="modal-content">
                <span class="close" onclick="closeModal('modal-location', 'filterForm')">&times;</span>
                <h2>Filter Location</h2>
               <form id="filterForm" onsubmit="filterLocations(event)">
                    <label for="location">Choose Location: </label>
                    <select id="loc" name="filter-location">
                        <option value="Any">Any</option>
                    </select>
                    <input type="submit" value="Apply">
                </form>
            </div>
        </div>

        <div class="modal" id="modal-time">
            <div class="modal-content">
                <span class="close" onclick="closeModal('modal-time', 'timeForm')">&times;</span>
                <h2>Filter Time</h2>
                <form id="timeForm" onsubmit="filterTimes(event)">
                    <label>Choose start time: </label>
                    <select id="starttime">
                        <option value="Any">Any</option>
                    </select>
                    <label>Choose end time: </label>
                    <select id="endtime">
                        <option value="Any">Any</option>
                    </select>
                    <input type="submit" value="Apply">
                </form>
            </div>
        </div>
    <script src="../js/script.js"></script>
    <script>     
    
        function filterTimes(e) {
            e.preventDefault(); 
            const events = <?php echo json_encode(getEvents("../data/listing.json")); ?>; 
            const container = document.getElementById('listingsContainer');

            var startTime_str = document.getElementById("starttime").value; 
            var endTime_str = document.getElementById("endtime").value; 


            filtered_events = []; 
            if (startTime_str == "Any") {
                if (endTime_str == "Any") {
                    getAllListings(); 
                }
                else {
                    var endTime_int = convertTo24Hour(endTime_str); 

                    for (const event of events) {
                        //look through each end time for each event and check if it occurs before the selected end Time
                        end_str = event['end-time']; 
                        end_arr = end_str.split(':'); 
                        end_int = parseInt(end_arr[0]); 
                        if (end_int <= endTime_int) {
                            filtered_events.push(event); 
                        }
                    }
                    updateListings(filtered_events, container); 
                }
            } else {
                if (endTime_str == "Any") {
                    var startTime_int = convertTo24Hour(startTime_str); 

                    for (const event of events) {
                        //look through each end time for each event and check if it occurs before the selected end Time
                        start_str = event['start-time']; 
                        start_arr = start_str.split(':'); 
                        start_int = parseInt(start_arr[0]); 
                        if (start_int >= startTime_int) {
                            filtered_events.push(event); 
                        }
                    }
                    updateListings(filtered_events, container);
                }
                else {
                    var startTime_int = convertTo24Hour(startTime_str); 
                    var endTime_int = convertTo24Hour(endTime_str); 

                    for (const event of events) {
                        //look through each end time for each event and check if it occurs before the selected end Time
                        start_str = event['start-time']; 
                        start_arr = start_str.split(':'); 
                        start_int = parseInt(start_arr[0]); 

                        end_str = event['end-time']; 
                        end_arr = end_str.split(':'); 
                        end_int = parseInt(end_arr[0]); 

                        if ((start_int >= startTime_int) && (end_int <= endTime_int)) {
                            filtered_events.push(event); 
                        }
                    }
                    updateListings(filtered_events, container);
                }
            }
        }

        function filterLocations(e) {
            e.preventDefault(); //prevents a reload so the function can process the code. 
            <?php 
            if (file_exists("../data/listing.json")) {
                $json_content = file_get_contents("../data/listing.json"); 
                $items = json_decode($json_content, true);
            } else {
                $items = array();
            }   
?>
            const events = <?php echo json_encode($items); ?>; 
            var dropdown = document.getElementById("loc"); 
            var filteredLocation = dropdown.value; 

            if (filteredLocation == "Any") {
                getAllListings(); 
            }
            else {
                var location_events = []; 
                for (const event of events) {
                    if (event.location == filteredLocation) {
                        location_events.push(event); 
                    }
                }

                const container = document.getElementById('listingsContainer');

                // Clear existing content
                container.innerHTML = '';
                updateListings(location_events, container); 
            }
        }

        function populateLocationFilter() {
            var locations = <?php echo json_encode(findAllLocations("../data/listing.json")); ?>;
            var selection = document.getElementById("loc"); 

            locations.forEach(location => {
                var opt = document.createElement('option'); 
                opt.value = location; 
                opt.textContent = location; 
                selection.appendChild(opt); 
            }); 
        }

        function getAllListings() {
<?php 
            if (file_exists("../data/listing.json")) {
                $json_content = file_get_contents("../data/listing.json"); 
                $items = json_decode($json_content, true);
            } else {
                $items = array();
            }   
?>
            const events = <?php echo json_encode($items); ?>; 
            
            const container = document.getElementById('listingsContainer');
            
            // Clear existing content
            container.innerHTML = '';

            updateListings(events, container); 
        }
        
        getAllListings();
        populateLocationFilter(); 
        populateTimeFilter(); 
    </script>
    </body> 
</html>