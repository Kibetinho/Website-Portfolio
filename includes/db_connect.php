<?php
try {
    $conn = new PDO("pgsql:host=localhost;dbname=portfolio_db", "postgres", "0000");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Connection successful
} catch (PDOException $e) {
    // If you want to handle the error globally, you can echo or log it here
    echo "❌ Connection failed: " . $e->getMessage();

    exit; // Stop further execution if connection fails
}

