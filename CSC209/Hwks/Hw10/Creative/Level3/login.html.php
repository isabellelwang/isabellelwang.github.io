<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="./css/style.css">
    <style>   
        /* Modal styles */
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
        
        .message {
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
        }
        
        .success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Login</h2>
        <form action="./html/lib.html.php" method="post">
            <label>Username:</label>
            <input type="text" name="username" required><br>
            <label>Password:</label>
            <input type="password" name="password" required><br>
            <input type="submit" value="Login">
        </form>
        
        <!-- Register Button -->
        <button class="register-btn" onclick="openModal()">Register New Account</button>
    </div>

    <!-- Registration Modal -->
    <div id="registerModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>Register</h2>
            
            <div id="messageBox"></div>
            
            <form id="registerForm" onsubmit="return registerUser(event)">
                <label>Username:</label>
                <input type="text" id="regUsername" name="username" required>
                
                <label>Password:</label>
                <input type="password" id="regPassword" name="password" required>
                        
                <input type="submit" value="Register">
            </form>
        </div>
    </div>

    <script>
        function openModal() {
            document.getElementById('registerModal').style.display = 'block';
        }
        
        function closeModal() {
            document.getElementById('registerModal').style.display = 'none';
            document.getElementById('registerForm').reset();
            document.getElementById('messageBox').innerHTML = '';
        }
        
        window.onclick = function(event) {
            var modal = document.getElementById('registerModal');
            if (event.target == modal) {
                closeModal();
            }
        }
        
        // Register user function
        function registerUser(event) {
            event.preventDefault();
            
            var username = document.getElementById('regUsername').value.trim();
            var password = document.getElementById('regPassword').value;
            
            document.getElementById('messageBox').innerHTML = '';
            
            
            // Validate username and password not empty
            if (username == '' || password == '') {
                showMessage('Username and password cannot be empty!', 'error');
                return false;
            }
            
            // Send AJAX request to register
            var xmlhttp = new XMLHttpRequest();
            
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("Response:", this.responseText);
                    
                    try {
                        var response = JSON.parse(this.responseText);
                        
                        if (response.success) {
                            showMessage(response.message, 'success');
                            
                            // Close modal after 2 seconds and reload
                            setTimeout(function() {
                                closeModal();
                                alert('Registration successful! You can now login.');
                            }, 1500);
                        } else {
                            showMessage(response.message, 'error');
                        }
                    } catch (e) {
                        showMessage('Error: ' + e.message, 'error');
                    }
                }
            };
            
            xmlhttp.open("POST", "./php/registerUser.php", true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xmlhttp.send("username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
            
            return false;
        }
        
        // Show message in the modal
        function showMessage(message, type) {
            var messageBox = document.getElementById('messageBox');
            messageBox.innerHTML = '<div class="message ' + type + '">' + message + '</div>';
        }
    </script>
</body>
</html>