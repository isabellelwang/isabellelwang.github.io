<?php
// Get the JSON data sent from JavaScript
$jsonData = file_get_contents('php://input');
$changes = json_decode($jsonData, true);

$oldUsername = $changes[0];
$newUsername = $changes[1];
$newPassword = $changes[2];

if (empty($oldUsername)) {
    echo "No username provided";
    exit;
}

$usersFile = '../users.json';

$jsonContent = file_get_contents($usersFile);
$users = json_decode($jsonContent, true);

// Find the user
$userIndex = -1;
for ($i = 0; $i < count($users); $i++) {
    if ($users[$i]['username'] === $oldUsername) {
        $userIndex = $i;
        break;
    }
}

if ($userIndex === -1) {
    echo "user not found";
    exit;
}

// Update username if provided and different
if (!empty($newUsername) && $newUsername != $oldUsername) {
    foreach ($users as $user) {
        if ($user['username'] == $newUsername) {
            echo "username exists";
            exit;
        }
    }
    
    // Update username
    $users[$userIndex]['username'] = $newUsername;
    
    // Rename the user's folder
    $oldFolder = "../Users/" . $oldUsername;
    $newFolder = "../Users/" . $newUsername;
    
    if (file_exists($oldFolder)) {
        rename($oldFolder, $newFolder);
    }
}

if (!empty($newPassword)) {
    $users[$userIndex]['password'] = $newPassword;
}

file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

echo json_encode($users);
?>