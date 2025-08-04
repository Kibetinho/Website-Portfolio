<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: auth/login.php");
    exit;
}

require_once __DIR__ . '/../includes/auth_check.php';
require_once __DIR__ . '/../includes/db_connect.php';
include __DIR__ . '/../includes/header.php';
?>

<link rel="stylesheet" href="assets/styles.css">
<script src="assets/script.js" type="module"></script>

<!-- ...existing code... -->
