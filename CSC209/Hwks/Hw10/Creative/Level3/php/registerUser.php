<?php
// Get username and password from POST
$username = $_POST['username']; 
$password = $_POST['password']; 

$usersFile = '../users.json';

// Read users.json
if (!file_exists($usersFile)) {
    // If file doesn't exist, create it with empty array
    $users = array();
} else {
    $jsonContent = file_get_contents($usersFile);
    $users = json_decode($jsonContent, true);
}

// Check if username already exists
foreach ($users as $user) {
    if ($user['username'] == $username) {
        echo json_encode([
            "success" => false,
            "message" => "Username already exists"
        ]);
        exit;
    }
}

// Create new user entry
$newUser = array(
    "username" => $username,
    "password" => $password,
    "loggedtimes" => 0,
    "minuteslogged" => array()
);

// Add new user to array
$users[] = $newUser;

// Create user folder
$userFolder = "../Users/" . $username;
mkdir($userFolder); 

// Save updated users.json
# JSON PRetty print is for formatting. 
file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT)); 