<!DOCTYPE HTML>
<html>  
    <head>
        <title>Login</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: green; 
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }

            form {
                background: white;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                width: 100%;
                max-width: 400px;
            }

            form::before {
                display: block;
                text-align: center;
                font-size: 48px;
                margin-bottom: 20px;
            }

            h2 {
                text-align: center;
                color: #333;
                margin-bottom: 30px;
                font-size: 28px;
            }

            input[type="text"],
            input[type="password"] {
                width: 90%;
                padding: 12px 15px;
                margin-bottom: 20px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 16px;
                background: #f8f9fa;
            }

            input[type="submit"] {
                width: 100%;
                padding: 14px;
                background-color: rgba(141, 214, 169, 0.93); 
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;

            }

            input[type="submit"]:hover {
                color: blue; 
                box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
            }


        </style> 
    </head>     
    <body>
        <form action="./html/lib.html.php" method="post">
            <h2>Login</h2>
            
            <div>
                <label for="user">Username</label>
                <input id="user" type="text" name="username" required>
            </div>
            
            <div>
                <label for="pw">Password</label>
                <input id="pw" type="password" name="password" required>
            </div>
            
            <input type="submit" value="Login">
        </form>
    </body>
</html>