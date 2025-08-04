<?php
session_start();
require_once __DIR__ . '/includes/db_connect.php';
// Remove or fix the line below if 'includes/header.php' does not exist
// include __DIR__ . '/includes/header.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Kibet's Portfolio - Full Stack Developer | UI/UX Enthusiast | Problem Solver">
    <meta name="theme-color" content="#2563eb">
    <title>Kibet's Portfolio</title>
    <link rel="stylesheet" href="assets/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="logo">Kibet</div>
        <ul class="nav-links">
            <li><a href="index.php#home" class="nav-link">Home</a></li>
            <li><a href="index.php#about" class="nav-link">About</a></li>
            <li><a href="index.php#qualification" class="nav-link">Qualification</a></li>
            <li><a href="index.php#skills" class="nav-link">Skills</a></li>
            <li><a href="index.php#projects" class="nav-link">Projects</a></li>
            <li class="nav-auth contact-link-li" style="display:none;"><a href="index.php#contact" class="nav-link contact-link">Contact</a></li>
            <li><span class="welcome-msg"></span></li>
            <li class="nav-auth"><a href="auth/Register.php" class="nav-link btn btn-primary signup-btn">Sign Up</a></li>
            <li class="nav-auth"><a href="auth/login.php" class="nav-link btn btn-secondary signin-btn">Sign In</a></li>
            <li class="nav-auth"><a href="#" class="nav-link btn btn-outline signout-btn" id="signout-btn" style="display:none;">Sign Out</a></li>
        </ul>
        <div class="burger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
    </nav>
    <div class="nav-overlay"></div>

    <!-- Hero Section -->
    <section id="home" class="hero" aria-label="Homepage Hero">
        <div class="hero-content">
            <h1>Andrew Adrian Kibet</h1>
            <p class="hero-subtitle">Full Stack Developer & Software Engineer</p>
            <a href="auth/Register.php" class="cta-button signup btn btn-primary" style="margin-top: 1.5rem; display: inline-block;">Get Started</a>
        </div>
        <div class="hero-scroll-indicator" aria-hidden="true">
            <div class="mouse">
                <div class="wheel"></div>
            </div>
            <div class="arrow">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </section>

    <div id="main-content">
        <!-- About Section -->
        <section id="about" class="about" aria-label="About Me">
            <h2>About Me</h2>
            <div class="about-content">
                <div class="about-text">
                    <p><strong>Name:</strong> Andrew Adrian Kibet<br>
                    <strong>Location:</strong> Nairobi, Kenya<br>
                    <strong>Phone:</strong> +254 793 778 415, +254 769 269 696<br>
                    <strong>Email:</strong> <a href="mailto:andrew.kibet@strathmore.edu">andrew.kibet@strathmore.edu</a>, <a href="mailto:kibetinho@gmail.com">kibetinho@gmail.com</a></p>
                    <p>I am a passionate Full Stack Developer with a strong background in both front-end and back-end development. I strive to build applications that are functional, user-friendly, and visually appealing. Currently, I am pursuing a Diploma in Business Information Technology (transitioning to a Bachelor's degree) at Strathmore University. My interests include e-commerce platforms, automation, and optimizing business processes through technology.</p>
                </div>
            </div>
        </section>

        <!-- Qualification Section -->
        <section id="qualification" class="qualification section-transition">
            <h2>Qualification</h2>
            <div class="qualification-content">
                <div class="qualification-item card">
                    <h3>Strathmore University <span class="location">| Nairobi, Kenya</span></h3>
                    <p class="degree">Diploma in Business Information Technology <span class="transition">(Transitioning to Bachelor's)</span></p>
                    <p class="date"><i class="fa-regular fa-calendar"></i> May 2024 – Expected 2028</p>
                    <ul class="coursework">
                        <li>Relevant coursework: Software Development, Web Development, Database Management, E-Commerce Systems</li>
                    </ul>
                </div>
                <div class="qualification-item card">
                    <h3>Sacho High School <span class="location">| Nakuru, Kenya</span></h3>
                    <p class="degree">Kenya Certificate of Secondary Education (KCSE)</p>
                    <p class="date"><i class="fa-regular fa-calendar"></i> 2020 – 2023</p>
                </div>
                <div class="qualification-item card">
                    <h3>Testimony Primary School <span class="location">| Nairobi, Kenya</span></h3>
                    <p class="degree">Kenya Certificate of Primary Education (KCPE)</p>
                    <p class="date"><i class="fa-regular fa-calendar"></i> 2010 – 2019</p>
                </div>
                <div class="qualification-item card">
                    <h3>Certifications</span></h3>
                    <p class="certification">Kenya Certificate of Secondary Education (KCSE) | Sacho High School</p>
                    <p class="certification">Kenya Certificate of Primary Education (KCPE) | Testimony Primary School</p>
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <section id="skills" class="skills">
            <h2>My Skills</h2>
            <p>I have a strong foundation in web development and am always looking to expand my skill set.</p> 
            <div class="skills-grid">
                <div class="skill-card card" data-skill="HTML5">
                    <i class="fab fa-html5"></i>
                    <h3>HTML5</h3>
                    <p>Semantic markup and modern web standards</p>
                    <div class="skill-level">
                        <div class="skill-progress" data-progress="95"></div>
                    </div>
                </div>
                <div class="skill-card card" data-skill="CSS3">
                    <i class="fab fa-css3-alt"></i>
                    <h3>CSS3</h3>
                    <p>Responsive design and animations</p>
                    <div class="skill-level">
                        <div class="skill-progress" data-progress="90"></div>
                    </div>
                </div>
                <div class="skill-card card" data-skill="JavaScript">
                    <i class="fab fa-js"></i>
                    <h3>JavaScript</h3>
                    <p>ES6+, DOM manipulation, and async programming</p>
                    <div class="skill-level">
                        <div class="skill-progress" data-progress="85"></div>
                    </div>
                </div>
                <div class="skill-card card" data-skill="PHP">
                    <i class="fab fa-php"></i>
                    <h3>PHP</h3>
                    <p> Developing dynamic web pages and connecting to databases.</p>
                    <div class="skill-level">
                        <div class="skill-progress" data-progress="85"></div>
                    </div>
                </div>
                <div class="skill-card card" data-skill="MySQL">
                    <i class="fas fa-database"></i>
                    <h3>MySQL</h3>
                    <p>Database design, management, and SQL queries for dynamic applications.</p>
                    <div class="skill-level">
                        <div class="skill-progress" data-progress="80"></div>
                    </div>
                </div>
                <div class="skill-card card" data-skill="C++">
                    <i class="fas fa-code"></i>
                    <h3>C++</h3>
                    <p>Object-oriented programming, algorithms, and performance-critical applications.</p>
                    <div class="skill-level">
                        <div class="skill-progress" data-progress="80"></div>
                    </div>
                </div>
                <div class="skill-card card" data-skill="Java">
                    <i class="fab fa-java"></i>
                    <h3>Java</h3>
                    <p>Cross-platform development, OOP, and building scalable applications.</p>
                    <div class="skill-level">
                        <div class="skill-progress" data-progress="75"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="projects" aria-label="Projects">
            <h2>Projects</h2>
            <div class="projects-list">
                <div class="project-card card">
                    <strong>Local Food E-Commerce Platform <span class="project-role">| Full-Stack Developer</span></strong>
                    <ul>
                        <li>Developed a responsive web application to streamline transactions between local food producers, wholesalers, and retailers.</li>
                        <li>Technologies: HTML, CSS, JavaScript, [Backend Language/Framework]</li>
                    </ul>
                </div>
                <div class="project-card card">
                    <strong>Loan Management System <span class="project-role">| Software Developer (In Progress)</span></strong>
                    <ul>
                        <li>Building an automated solution for loan processing, repayment tracking, and reporting for microfinance institutions.</li>
                        <li>Features: User authentication, database integration, analytics dashboard.</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Blog Section -->
        <section id="blog" class="blog">
            <h2>Latest Projects</h2>
            <div class="blog-grid">
                <article class="blog-card">
                    <div class="blog-image">
                        <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" alt="E-Commerce Platform">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date">2024</span>
                            <span class="blog-category">Web Application</span>
                        </div>
                        <h3>Local Food E-Commerce Platform</h3>
                        <p>A responsive web app connecting local food producers, wholesalers, and retailers. Features real-time inventory, secure payments, and order tracking.</p>
                        <a href="#" class="read-more">View Project <i class="fas fa-arrow-right"></i></a>
                    </div>
                </article>
                <article class="blog-card">
                    <div class="blog-image">
                        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" alt="Loan Management System">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date">2025 (In Progress)</span>
                            <span class="blog-category">FinTech</span>
                        </div>
                        <h3>Loan Management System</h3>
                        <p>Automated solution for microfinance institutions: loan processing, repayment tracking, analytics dashboard, and user authentication.</p>
                        <a href="#" class="read-more">View Project <i class="fas fa-arrow-right"></i></a>
                    </div>
                </article>
                <article class="blog-card">
                    <div class="blog-image">
                        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Portfolio Website">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date">2025 (In Progress)</span>
                            <span class="blog-category">Personal Project</span>
                        </div>
                        <h3>Personal Portfolio Website</h3>
                        <p>Modern, responsive portfolio to showcase skills, projects, and experience. Built with HTML, CSS, and JavaScript for fast performance.</p>
                        <a href="#" class="read-more">View Project <i class="fas fa-arrow-right"></i></a>
                    </div>
                </article>
            </div>
        </section>

        <!-- Resume Section -->
        <section id="resume" class="resume">
            <h2>Download CV document</h2>
            <div class="resume-content">
                <p>Want to know more about my experience and skills? Download my detailed resume to learn about my professional journey and expertise.</p>
                <a href="CV Kibet.pdf" class="resume-btn" download>
                    <i class="fas fa-download"></i>
                    Download CV document
                </a>
            </div>
        </section>

        <!-- Contact Section (only for authenticated users) -->
        <section id="contact" class="contact" style="display:none;">
            <h2>Contact Me</h2>
            <form id="contact-form" autocomplete="off">
                <div class="form-group">
                    <label for="contact-fullname">Full Name</label>
                    <input type="text" id="contact-fullname" name="fullname" required placeholder="Enter your full name">
                </div>
                <div class="form-group">
                    <label for="contact-phone">Phone Number</label>
                    <input type="tel" id="contact-phone" name="phone" required placeholder="Enter your phone number">
                </div>
                <div class="form-group">
                    <label for="contact-email">Email Address</label>
                    <input type="email" id="contact-email" name="email" required placeholder="Enter your email address">
                </div>
                <div class="form-group">
                    <label for="contact-message">Message</label>
                    <textarea id="contact-message" name="message" rows="5" required placeholder="Type your message here..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
                <div id="contact-success" class="form-success" style="display:none;"></div>
                <div id="contact-error" class="form-error" style="display:none;"></div>
            </form>
        </section>

        <!-- Scroll to Top Button -->
    <button id="scroll-top" class="scroll-top-btn" aria-label="Scroll to top">
        <i class="fas fa-arrow-up"></i>
    </button>

    <!-- Search Overlay -->
    <div id="search-overlay" class="search-overlay">
        <div class="search-content">
            <input type="text" id="search-input" placeholder="Search...">
            <button id="search-close" aria-label="Close search">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div id="search-results" class="search-results"></div>
    </div>

    <!-- Footer -->
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

    <!-- Hidden project details -->
    <div id="project-details" style="display:none;">
        <h2>Project Title</h2>
        <p>Project description goes here...</p>
        <button id="close-details">Close</button>
    </div>

    <script src="assets/script.js" type="module"></script>
</body>
</html>
