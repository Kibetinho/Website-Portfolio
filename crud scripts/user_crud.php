<?php
require_once __DIR__ . '/../includes/auth_check.php';
require_once __DIR__ . '/../includes/db_connect.php';

// Register a new user
function registerUser($username, $password, $email) {
    global $conn;
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)";
    $params = array($username, $hashed_password, $email);
    $result = pg_query_params($conn, $sql, $params);
    return $result;
}

// Login user
function loginUser($username, $password) {
    global $conn;
    $sql = "SELECT * FROM users WHERE username = $1";
    $params = array($username);
    $result = pg_query_params($conn, $sql, $params);
    $user = null;
    if ($result && pg_num_rows($result) > 0) {
        $user = pg_fetch_assoc($result);
    }
    if ($user && password_verify($password, $user['password'])) {
        return $user;
    }
    return false;
}

// List all users
function listUsers() {
    global $conn;
    $sql = "SELECT id, username, email, is_admin, created_at FROM users";
    $result = pg_query($conn, $sql);
    $users = [];
    if ($result) {
        while ($row = pg_fetch_assoc($result)) {
            $users[] = $row;
        }
    }
    return $users;
}
?>