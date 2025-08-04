<?php
session_start();
require_once __DIR__ . '/../includes/auth_check.php';
require_once __DIR__ . '/../includes/db_connect.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In | Kibet's Portfolio</title>
    <link rel="stylesheet" href="../assets/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation (unified with index.html) -->
    <nav class="navbar">
        <div class="logo">Kibet</div>
        <ul class="nav-links">
            <li><a href="../index.php#home" class="nav-link">Home</a></li>
            <li><a href="../index.php#about" class="nav-link">About</a></li>
            <li><a href="../index.php#qualification" class="nav-link">Qualification</a></li>
            <li><a href="../index.php#skills" class="nav-link">Skills</a></li>
            <li><a href="../index.php#projects" class="nav-link">Projects</a></li>
            <li><span class="welcome-msg"><i class="fa fa-user"></i></span></li>
            <li><a href="#profile" class="nav-link profile-link" style="display:none;"><i class="fa fa-user-circle"></i> Profile</a></li>
            <li class="nav-auth"><a href="Register.php" class="nav-link signup-btn">Sign Up</a></li>
            <li class="nav-auth"><a href="login.php" class="nav-link signin-btn">Sign In</a></li>
            <li class="nav-auth"><a href="#" class="nav-link signout-btn" id="signout-btn" style="display:none;">Sign Out</a></li>
        </ul>
        <div class="burger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
    </nav>
    <div class="nav-overlay"></div>
    <div class="auth-section">
        <div class="auth-container">
            <h2>Welcome Back</h2>
            <form id="signin-form" class="auth-form">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label class="checkbox-container">
                        <input type="checkbox" name="remember">
                        <span class="checkmark"></span>
                        Remember me
                    </label>
                    <a href="#" class="forgot-password">Forgot Password?</a>
                </div>
                <button type="submit" class="auth-button">Sign In</button>
            </form>
            <p class="auth-switch">
                Don't have an account? <a href="Register.php">Sign Up</a>
            </p>
        </div>
    </div>
    <!-- Footer (unified with index.html) -->
    <footer>
        <div class="footer-content">
            <div class="social-links">
                <a href="https://twitter.com/" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="mailto:andrew.kibet@strathmore.edu" target="_blank" aria-label="Email"><i class="fas fa-envelope"></i></a>
                <a href="https://github.com/" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
            </div>
            <p class="copyright">&copy; 2025 Kibet's Portfolio. All rights reserved.</p>
        </div>
    </footer>
    <script src="../assets/script.js" type="module"></script>
</body>
</html>