<?php
require_once __DIR__ . '/../includes/auth_check.php';
require_once __DIR__ . '/../includes/db_connect.php';

// Submit a contact message
function submitContactMessage($name, $email, $subject, $message) {
    global $conn;
    $sql = "INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4)";
    $params = array($name, $email, $subject, $message);
    $result = pg_query_params($conn, $sql, $params);
    return $result;
}

// List all contact messages
function listContactMessages() {
    global $conn;
    $sql = "SELECT * FROM contact_messages ORDER BY created_at DESC";
    $result = pg_query($conn, $sql);
    $messages = [];
    if ($result) {
        while ($row = pg_fetch_assoc($result)) {
            $messages[] = $row;
        }
    }
    return $messages;
}
?>