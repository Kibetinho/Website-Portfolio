<?php
require_once __DIR__ . '/../includes/auth_check.php';
require_once __DIR__ . '/../includes/db_connect.php';

// Database credentials (move this file outside web root or add to .gitignore in production)
define('DB_SERVER', '127.0.0.1');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '0000'); 
define('DB_NAME', 'portfolio_db');
?>