<?php
require_once __DIR__ . '/../includes/auth_check.php';
require_once __DIR__ . '/../includes/db_connect.php';
session_start();

$register_error = '';
$register_success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullname = trim($_POST['fullname'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm-password'] ?? '';

    // Basic validation
    if (!$fullname || !$email || !$phone || !$password || !$confirm_password) {
        $register_error = "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $register_error = "Invalid email address.";
    } elseif ($password !== $confirm_password) {
        $register_error = "Passwords do not match.";
    } elseif (strlen($password) < 8) {
        $register_error = "Password must be at least 8 characters.";
    } else {
        // Check if user already exists
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            $register_error = "Email already registered.";
        } else {
            // Hash password and insert user
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO users (fullname, email, phone, password) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $fullname, $email, $phone, $hashed_password);
            if ($stmt->execute()) {
                $register_success = "Registration successful! You can now <a href='login.php'>login</a>.";
            } else {
                $register_error = "Registration failed. Please try again.";
            }
        }
        $stmt->close();
    }
}
?>
<?php include __DIR__ . '/../includes/header.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up | Kibet's Portfolio</title>
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
            <h2>Create Account</h2>
            <?php if ($register_error): ?>
                <div class="form-error" style="color: #ef4444; margin-bottom: 1rem;"><?php echo $register_error; ?></div>
            <?php elseif ($register_success): ?>
                <div class="form-success" style="color: #22c55e; margin-bottom: 1rem;"><?php echo $register_success; ?></div>
            <?php endif; ?>
            <form id="register-form" class="auth-form" autocomplete="off" method="post" action="">
                <div class="form-group">
                    <label for="fullname">Full Name</label>
                    <input type="text" id="fullname" name="fullname" required minlength="2" placeholder="Your full name">
                    <div class="error-message" id="fullname-error"></div>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required placeholder="you@example.com">
                    <div class="error-message" id="email-error"></div>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required pattern="[0-9]{10,15}" placeholder="e.g. 0712345678">
                    <div class="error-message" id="phone-error"></div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <div style="position:relative;">
                        <input type="password" id="password" name="password" required minlength="8" placeholder="Create a password" autocomplete="new-password">
                        <button type="button" id="toggle-password" tabindex="-1" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:#888;">
                            <i class="fa fa-eye" id="toggle-password-icon"></i>
                        </button>
                    </div>
                    <div class="error-message" id="password-error"></div>
                    <div class="password-requirements" id="password-reqs">
                        <p>Password must contain:</p>
                        <ul>
                            <li>At least 8 characters</li>
                            <li>One uppercase letter</li>
                            <li>One lowercase letter</li>
                            <li>One number</li>
                            <li>One special character (!@#$%^&amp;*)</li>
                        </ul>
                        <div style="margin-top:0.5rem;">
                            <div style="background:#e5e7eb; border-radius:4px; height:8px; width:100%;">
                                <div id="strength-bar" style="height:8px; width:0; background:#ef4444; border-radius:4px; transition:width 0.3s;"></div>
                            </div>
                            <span id="strength-text" style="font-size:0.95rem; font-weight:600;"></span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirm Password</label>
                    <div style="position:relative;">
                        <input type="password" id="confirm-password" name="confirm-password" required minlength="8" placeholder="Re-enter your password" autocomplete="new-password">
                    </div>
                    <div class="error-message" id="confirm-password-error"></div>
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>
            <div class="auth-switch">
                Already have an account? <a href="login.php">Sign In</a>
            </div>
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