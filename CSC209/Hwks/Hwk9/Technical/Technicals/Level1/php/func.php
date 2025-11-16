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

function update_user_log($file, $user, $minutes) {
     if (file_exists($file)) {
        $x = file_get_contents($file); 
        $items = json_decode($x, true);

        for ($i = 0; $i < count($items); $i++) {
            if (strcmp($items[$i]["username"], $user) == 0) {
                $items[$i]["loggedtimes"]++;
                $items[$i]['minuteslogged'][] = (int)$minutes;
                file_put_contents($file, json_encode($items, JSON_PRETTY_PRINT));
                break;
            }   
        }
        return True; 
    }
}

function update_admin_log($file, $user) {
     if (file_exists($file)) {
        $x = file_get_contents($file); 
        $items = json_decode($x, true);

        for ($i = 0; $i < count($items); $i++) {
            if (strcmp($items[$i]["username"],$_POST["username"]) == 0) {
                $items[$i]["loggedtimes"]++;
                file_put_contents($file, json_encode($items, JSON_PRETTY_PRINT));
                break;
            }   
        }
        return True; 
    }
}

function extractFolderNumber($realpath) {
    $base = basename(dirname($realpath, 1));
    $folderNrString = substr($base, strlen($base) - 1, strlen($base)); 
    if (is_numeric($folderNrString)){
        return $folderNrString; 
    }
    return "0"; 
}

function getUserNumber($file, $user) {
    if (file_exists($file)) {
        $x = file_get_contents($file); 
        $items = json_decode($x, true);

        for ($i = 0; $i < count($items); $i++) {
            if (strcmp($items[$i]["username"], $user) == 0) {
                $userNum = (string) ($i + 1); 
                return $userNum; 
            }
        }
    }
}

function getUser($file, $folderNum) {
    if (file_exists($file)) {
        $x = file_get_contents($file); 
        $items = json_decode($x, true);

        for ($i = 0; $i < count($items); $i++) {
            if ($i == ($folderNum - 1)) {
                return $items[$i]["username"]; 
            }
        }
    }
}

function read($file) {
    if (file_exists($file)) {
        $x = file_get_contents($file); 
        $items = json_decode($x, true);

        for ($i = 0; $i < count($items); $i++) {
            echo $items[$i]; 
        }
    }
}

// Function to read users.json - returns array format
function readUsersJson() {
    $filename = '../users.json';
    
    if (!file_exists($filename)) {
        return array();
    }
    
    $jsonString = file_get_contents($filename);
    $users = json_decode($jsonString, true);
    
    if ($users === null && json_last_error() !== JSON_ERROR_NONE) {
        return array();
    }
    
    return $users;
}

// Set header to return JSON
header('Content-Type: application/json');

// Call the function to read users.json
$userData = readUsersJson();

// Echo the result as JSON string (required for AJAX response)
echo json_encode($userData);
?>