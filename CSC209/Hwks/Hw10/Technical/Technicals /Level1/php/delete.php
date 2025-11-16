<?php
// Get the username from POST
$username = $_POST['username'] ?? '';

if (empty($username)) {
    echo json_encode(["error" => "No username provided"]);
    exit;
}

$usersFile = '../users.json';

// Read users.json
if (!file_exists($usersFile)) {
    echo json_encode(["error" => "Users file not found"]);
    exit;
}

$jsonContent = file_get_contents($usersFile);
$users = json_decode($jsonContent, true);

// Find the user and their folder number
$userIndex = -1;
for ($i = 0; $i < count($users); $i++) {
    if ($users[$i]['username'] === $username) {
        $userIndex = $i;
        break;
    }
}

if ($userIndex === -1) {
    echo json_encode(["error" => "User not found"]);
    exit;
}

// Calculate the user folder number (index + 1)
$folderNumber = $userIndex + 1;
$userFolder = "../Users/" . $username;

// Delete the user's folder and its contents
if (file_exists($userFolder)) {
    // Delete all files in the folder first
    $files = scandir($userFolder);
    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            unlink($userFolder . '/' . $file);
        }
    }
    // Now delete the empty folder
    rmdir($userFolder);
}

// Remove the user from the array
array_splice($users, $userIndex, 1);

// Save the updated JSON
file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

// Return the updated user list
echo json_encode($users);
?>