<?php 
function validate_login($file, $user, $pw) {
    if (file_exists($file)) {
        $x = file_get_contents($file); 
        $items = json_decode($x, true);
    }
    
    $seen = false; 
    for ($i = 0; $i < count($items); $i++) {
        if (strcmp($user, $items[$i]["username"]) == 0) {
            if (strcmp($pw, $items[$i]["password"]) == 0) {
                $seen = true; 
            }
        }
    }
    return $seen; 
}

function check_admin($file, $user) {
    if (file_exists($file)) {
        $x = file_get_contents($file); 
        $items = json_decode($x, true); 
    }

    $is_admin = false; 
    for ($i = 0; $i < count($items); $i++) {
        if (strcmp($user, $items[$i]["username"]) == 0) {
            $is_admin = $items[$i]["is_admin"]; 
        }
    }
    return $is_admin; 
}

function findAllLocations($file) {
    $arr = []; 
    if (file_exists($file)) {
        $x = file_get_contents($file); 
        $items = json_decode($x, true); 

        for ($i=0; $i<count($items); $i++) {
        array_push($arr, $items[$i]["location"]); 
        }
        
        $locations = array_values(array_unique($arr));
        return $locations;
    } 
    return arr; 
}

//returns a list of events that are in a specifc location
function filterEvents($file, $location) {
    $events = []; 
    if (file_exists($file)) {
        $x = file_get_contents($file); 
        $items = json_decode($x, true); 

        for ($i=0; $i<count($items); $i++) {
            if ($items[i]["location"] == location) {
                array_push($events, $items[$i]); 
            }
        }
    }
    return $events; 
}

//returns all events
function getEvents($file) {
    if (file_exists($file)) {
        $json_content = file_get_contents($file); 
        $items = json_decode($json_content, true);
    } else {
        $items = array();
    }   

    return $items; 
}
?>



