<?php
require_once __DIR__ . '/../includes/auth_check.php';
require_once __DIR__ . '/../includes/db_connect.php';

// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '269696'); // <-- updated
define('DB_NAME', 'food_supply_system');

// Create connection using constants
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

try {
    $conn = new PDO("pgsql:host=localhost;dbname=portfolio_db", "postgres", "0000");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Connection successful
} catch (PDOException $e) {
    // If you want to handle the error globally, you can echo or log it here
    echo "❌ Connection failed: " . $e->getMessage();

    exit; // Stop further execution if connection fails
}

