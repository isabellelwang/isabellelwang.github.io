<html> 
    <head> 
    <?php 
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
        </style>
        
    </head>         
    <body> 
        <div class="homeBar"> 
            <h1> Smith Friends </h1> 
            <h3> Welcome, <?php echo $_SESSION["username"] ?>!</h3> 
<?php 
            $path = "../Users/" . $_SESSION["username"] . "/profile/";
            $profile_pic = glob($path . "*.{jpg,jpeg,png,gif,webp}", GLOB_BRACE); 
?>
            <a href="userProfile.html.php">
                <img src="<?php echo $profile_pic[0];?>">
            </a>
        </div>
        
        <!-- Content container with 30/70 split -->
        <div class="content-container">
            <!-- Left column - 30% -->
            <div class="left"> 
                <h2>Your Upcoming Events</h2>
                <!-- Add your left side content here -->
            </div>
            
            <!-- Right column - 70% -->
            <div class="listing">
                <h3>Upcoming Events</h3> 
                <div class="listings-grid" id="listingsContainer"></div>
            </div>
        </div>
    </body> 
    <script> 
        function getListings() {
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
            
            // Create cards for each event
            events.forEach(event => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.setAttribute('data-id', event.id);
                
                card.innerHTML = `
                    <img src="${event.image}" alt="${event.event}" class="event-image">
                    <div class="event-content">
                        <h2 class="event-title">${event.event}</h2>
                        <div class="event-info">
                            <div class="info-row">
                                <span class="info-icon">Date: </span>
                                <span>${event.date}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-icon">Location: </span>
                                <span>${event.location}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-icon">Time: </span>
                                <span class="event-time">${event['start-time']} - ${event['end-time']}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-icon">Host: </span>
                                <span>${event.host}</span>
                            </div>

                        </div>
                        <div class="event-description">
                            ${event.description}
                        </div>
                    </div>
                `;
                
                container.appendChild(card);
            });
        }
        
        window.addEventListener('DOMContentLoaded', getListings);
    </script> 
</html>