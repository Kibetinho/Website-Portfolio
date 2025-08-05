<?php
require_once __DIR__ . '/../includes/auth_check.php';
require_once __DIR__ . '/../includes/db_connect.php';
?>
<!-- filepath: includes/header.php -->
<link rel="stylesheet" href="assets/styles.css">
<script src="assets/script.js" type="module"></script>
<nav class="navbar">
    <div class="logo">Kibet</div>
    <ul class="nav-links">
        <li><a href="/portfolio/index.php" class="nav-link">Home</a></li>
        <li><a href="/portfolio/index.php#about" class="nav-link">About</a></li>
        <li><a href="/portfolio/index.php#qualification" class="nav-link">Qualification</a></li>
        <li><a href="/portfolio/index.php#skills" class="nav-link">Skills</a></li>
        <li><a href="/portfolio/index.php#projects" class="nav-link">Projects</a></li>
        <li class="nav-auth contact-link-li" style="display:none;"><a href="/portfolio/index.php#contact" class="nav-link contact-link">Contact</a></li>
        <li><span class="welcome-msg"></span></li>
        <li class="nav-auth"><a href="/portfolio/auth/Register.php" class="nav-link btn btn-primary signup-btn">Sign Up</a></li>
        <li class="nav-auth"><a href="/portfolio/auth/login.php" class="nav-link btn btn-secondary signin-btn">Sign In</a></li>
        <li class="nav-auth"><a href="/portfolio/auth/logout.php" class="nav-link btn btn-outline signout-btn" id="signout-btn" style="display:none;">Sign Out</a></li>
    </ul>
    <div class="burger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
    </div>
</nav>