// Prevent FOUC
document.documentElement.style.visibility = 'hidden';
document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.style.visibility = 'visible';

    // === DOM Queries ===
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const signoutBtn = document.getElementById('signout-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const signinBtn = document.querySelector('.signin-btn');
    const passwordInput = document.getElementById('password');
    const skillForm = document.getElementById('skill-form');
    const loginForm = document.getElementById('login-form') || document.getElementById('signin-form');
    const registerForm = document.getElementById('register-form');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const togglePasswordIcon = document.getElementById('toggle-password-icon');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const confirmPassword = document.getElementById('confirm-password');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    const scrollTopBtn = document.getElementById('scroll-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const skillCards = document.querySelectorAll('.skill-card');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close');
    const searchResults = document.getElementById('search-results');
    const navLinksAll = document.querySelectorAll('.nav-link');
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // === UI Update for Auth ===
    function updateAuthUI() {
        const welcomeMsg = document.querySelector('.welcome-msg');
        const profileLink = document.querySelector('.profile-link');
        if (localStorage.getItem('isSignedIn')) {
            if (signupBtn) signupBtn.style.display = 'none';
            if (signinBtn) signinBtn.style.display = 'none';
            if (signoutBtn) signoutBtn.style.display = '';
            if (welcomeMsg) welcomeMsg.innerHTML = `<i class="fa fa-user"></i> Welcome, ${localStorage.getItem('userFullName') || 'User'}!`;
            if (profileLink) {
                profileLink.style.display = '';
                profileLink.textContent = 'Profile';
                profileLink.href = '#profile';
            }
        } else {
            if (signupBtn) signupBtn.style.display = '';
            if (signinBtn) signinBtn.style.display = '';
            if (signoutBtn) signoutBtn.style.display = 'none';
            if (welcomeMsg) welcomeMsg.innerHTML = '<i class="fa fa-user"></i>';
            if (profileLink) profileLink.style.display = 'none';
        }
        updateContactSectionAndNav();
    }
    window.updateAuthUI = updateAuthUI;

    // === Page Transition and Loading ===
    window.addEventListener('load', () => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }
        if (hero) hero.classList.add('visible');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            setTimeout(() => {
                heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    });

    // === Mobile Navigation Toggle ===
    if (burger && nav && navLinks) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            burger.classList.toggle('toggle');
        });
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && !e.target.closest('.nav-links') && !e.target.closest('.burger')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    }

    // === Smooth Scrolling with Page Transition ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            pageTransition.classList.add('active');
            setTimeout(() => {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                setTimeout(() => {
                    pageTransition.classList.remove('active');
                }, 600);
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(link => { link.style.animation = ''; });
                }
            }, 300);
        });
    });

    // === Navbar scroll effect with parallax ===
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (navbar) {
            if (currentScroll > 100) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
        if (hero) hero.style.backgroundPositionY = `${currentScroll * 0.5}px`;
        lastScroll = currentScroll;
        if (scrollTopBtn) {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === Sign out logic ===
    if (signoutBtn) {
        signoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isSignedIn');
            localStorage.removeItem('userFullName');
            updateAuthUI();
        });
    }

    // === Password validation and toggle ===
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword(this.value);
        });
    }
    if (passwordInput && togglePasswordBtn && togglePasswordIcon) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePasswordIcon.className = type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash';
        });
    }
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const val = passwordInput.value;
            let score = 0;
            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[a-z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[!@#$%^&*]/.test(val)) score++;
            const percent = (score / 5) * 100;
            strengthBar.style.width = percent + '%';
            let color = '#ef4444', text = 'Weak';
            if (score >= 4) { color = '#10b981'; text = 'Strong'; }
            else if (score === 3) { color = '#f59e42'; text = 'Medium'; }
            strengthBar.style.background = color;
            strengthText.textContent = val.length === 0 ? '' : text;
            strengthText.style.color = color;
        });
    }
    if (passwordInput && confirmPassword && confirmPasswordError) {
        function checkPasswordsMatchRealtime() {
            if (confirmPassword.value.length > 0 && confirmPassword.value !== passwordInput.value) {
                confirmPasswordError.textContent = 'Passwords do not match';
                confirmPasswordError.style.opacity = '1';
                confirmPassword.classList.add('error');
            } else {
                confirmPasswordError.textContent = '';
                confirmPasswordError.style.opacity = '0';
                confirmPassword.classList.remove('error');
            }
        }
        passwordInput.addEventListener('input', checkPasswordsMatchRealtime);
        confirmPassword.addEventListener('input', checkPasswordsMatchRealtime);
    }

    // === Skill Capture Form ===
    if (skillForm) {
        skillForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateSkillForm()) {
                showNotification('Skill added successfully!', 'success');
                skillForm.reset();
            }
        });
    }

    // === Login Form ===
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const username = document.getElementById('email') ? document.getElementById('email').value.trim().toLowerCase() : document.getElementById('username').value.trim().toLowerCase();
            const password = document.getElementById('password').value.trim();
            if (!username || !password) {
                e.preventDefault();
                showNotification('Please fill in all fields', 'error');
                return false;
            }
            e.preventDefault();
            let userMap = {};
            try { userMap = JSON.parse(localStorage.getItem('userMap')) || {}; } catch (e) { userMap = {}; }
            if (!userMap[username]) {
                showNotification('No account found with that email. Please sign up.', 'error');
                return;
            }
            if (userMap[username].password !== password) {
                showNotification('Incorrect password. Please try again.', 'error');
                return;
            }
            localStorage.setItem('isSignedIn', 'true');
            localStorage.setItem('userFullName', userMap[username].name);
            updateAuthUI();
            showNotification('Sign in successful! Redirecting to your profile...', 'success');
            setTimeout(function() {
                window.location.href = 'index.html#about';
            }, 1500);
        });
    }

    // === Register Form ===
    if (registerForm) {
        const fullname = document.getElementById('fullname');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        const fullnameError = document.getElementById('fullname-error');
        const emailError = document.getElementById('email-error');
        const phoneError = document.getElementById('phone-error');
        const passwordError = document.getElementById('password-error');
        const confirmPasswordError = document.getElementById('confirm-password-error');

        if (fullname) {
            fullname.addEventListener('input', function() {
                if (fullname.value.trim().length > 0 && !isValidName(fullname.value.trim())) {
                    fullnameError.textContent = 'Please enter a valid name (letters, spaces, hyphens, apostrophes, min 2 chars)';
                    fullnameError.style.opacity = '1';
                    fullname.classList.add('error');
                } else {
                    fullnameError.textContent = '';
                    fullnameError.style.opacity = '0';
                    fullname.classList.remove('error');
                }
            });
        }
        if (email) {
            email.addEventListener('input', function() {
                if (email.value.trim().length > 0 && !isValidEmail(email.value.trim())) {
                    emailError.textContent = 'Please enter a valid email address';
                    emailError.style.opacity = '1';
                    email.classList.add('error');
                } else {
                    emailError.textContent = '';
                    emailError.style.opacity = '0';
                    email.classList.remove('error');
                }
            });
        }
        if (phone) {
            phone.addEventListener('input', function() {
                if (phone.value.trim().length > 0 && !isValidPhone(phone.value.trim())) {
                    phoneError.textContent = 'Please enter a valid phone number (10-15 digits)';
                    phoneError.style.opacity = '1';
                    phone.classList.add('error');
                } else {
                    phoneError.textContent = '';
                    phoneError.style.opacity = '0';
                    phone.classList.remove('error');
                }
            });
        }
        if (password) {
            password.addEventListener('input', function() {
                const pw = password.value;
                const pwValidation = validatePassword(pw);
                if (pw.length > 0 && !pwValidation.valid) {
                    passwordError.textContent = pwValidation.message;
                    passwordError.style.opacity = '1';
                    password.classList.add('error');
                } else {
                    passwordError.textContent = '';
                    passwordError.style.opacity = '0';
                    password.classList.remove('error');
                }
            });
        }
        if (password && confirmPassword && confirmPasswordError) {
            function checkPasswordsMatchRealtime() {
                if (confirmPassword.value.length > 0 && confirmPassword.value !== password.value) {
                    confirmPasswordError.textContent = 'Passwords do not match';
                    confirmPasswordError.style.opacity = '1';
                    confirmPassword.classList.add('error');
                } else {
                    confirmPasswordError.textContent = '';
                    confirmPasswordError.style.opacity = '0';
                    confirmPassword.classList.remove('error');
                }
            }
            password.addEventListener('input', checkPasswordsMatchRealtime);
            confirmPassword.addEventListener('input', checkPasswordsMatchRealtime);
        }

        // Also update on submit
        registerForm.addEventListener('submit', function(e) {
            let valid = true;
            // Reset errors
            [fullnameError, emailError, phoneError, passwordError, confirmPasswordError].forEach(div => { if (div) { div.textContent = ''; div.style.opacity = '0'; } });
            [fullname, email, phone, password, confirmPassword].forEach(input => { if (input) input.classList.remove('error'); });

            // Full Name
            if (!isValidName(fullname.value.trim())) {
                fullnameError.textContent = 'Please enter a valid name (letters, spaces, hyphens, apostrophes, min 2 chars)';
                fullnameError.style.opacity = '1';
                fullname.classList.add('error');
                valid = false;
            }
            // Email
            if (!email.value.trim() || !isValidEmail(email.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.style.opacity = '1';
                email.classList.add('error');
                valid = false;
            }
            // Phone
            if (!phone.value.trim() || !isValidPhone(phone.value.trim())) {
                phoneError.textContent = 'Please enter a valid phone number (10-15 digits)';
                phoneError.style.opacity = '1';
                phone.classList.add('error');
                valid = false;
            }
            // Password
            const pw = password.value;
            const pwValidation = validatePassword(pw);
            if (!pwValidation.valid) {
                passwordError.textContent = pwValidation.message;
                passwordError.style.opacity = '1';
                password.classList.add('error');
                valid = false;
            }
            // Confirm Password
            if (confirmPassword.value !== pw) {
                confirmPasswordError.textContent = 'Passwords do not match';
                confirmPasswordError.style.opacity = '1';
                confirmPassword.classList.add('error');
                valid = false;
            }
            if (!valid) {
                e.preventDefault();
                return;
            }
            // --- Prevent duplicate signup and store password ---
            e.preventDefault();
            let userMap = {};
            try {
                userMap = JSON.parse(localStorage.getItem('userMap')) || {};
            } catch (e) { userMap = {}; }
            const emailKey = email.value.trim().toLowerCase();
            if (userMap[emailKey]) {
                showNotification('An account with this email already exists. Please sign in.', 'error');
                emailError.textContent = 'Email already registered';
                emailError.style.opacity = '1';
                email.classList.add('error');
                return;
            }
            userMap[emailKey] = { name: fullname.value.trim(), password: pw };
            localStorage.setItem('userMap', JSON.stringify(userMap));
            localStorage.setItem('isSignedIn', 'true');
            localStorage.setItem('userFullName', fullname.value.trim());
            if (typeof updateAuthUI === 'function') updateAuthUI();
            showNotification('Account created successfully! Redirecting to sign in...', 'success');
            setTimeout(function() {
                window.location.href = 'signin.html';
            }, 1500);
        });
    }

    // === Scroll to Top Button ===
    // This block is now handled within the DOMContentLoaded listener's scroll event listener.

    // === Project Filters ===
    if (filterBtns && projectCards) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // === Skills Animation ===
    if (skillCards) {
        skillCards.forEach(card => {
            const progress = card.querySelector('.skill-progress');
            if (progress) {
                const value = progress.dataset.progress;
                progress.style.setProperty('--progress', `${value}%`);
            }
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // === Search Functionality ===
    if (searchOverlay && searchInput && searchClose && searchResults) {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                searchOverlay.classList.add('active');
                searchInput.focus();
            }
        });
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            const results = [];
            document.querySelectorAll('section').forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(query)) {
                    results.push({
                        title: section.querySelector('h2')?.textContent || 'Section',
                        content: text.substring(Math.max(0, text.indexOf(query) - 50), text.indexOf(query) + 50),
                        link: `#${section.id}`
                    });
                }
            });
            searchResults.innerHTML = results.map(result => `
                <div class="search-result">
                    <h3><a href="${result.link}">${result.title}</a></h3>
                    <p>...${result.content}...</p>
                </div>
            `).join('');
        });
    }

    // === SPA Navigation and Auth Protection ===
    const protectedSections = ['#profile', '#contact'];
    function handleNavigation(e, targetHash) {
        if (protectedSections.includes(targetHash) && !isAuthenticated()) {
            e.preventDefault();
            window.location.href = 'signin.html';
            return false;
        }
        if (targetHash.startsWith('#')) {
            e.preventDefault();
            showSection(targetHash);
            history.pushState(null, '', targetHash);
        }
    }
    function showSection(hash) {
        const allSections = document.querySelectorAll('section');
        let found = false;
        allSections.forEach(section => {
            if ('#' + section.id === hash) {
                section.style.display = '';
                section.classList.add('fade-in');
                found = true;
            } else {
                section.style.display = 'none';
                section.classList.remove('fade-in');
            }
        });
        if (!found && document.getElementById('home')) {
            document.getElementById('home').style.display = '';
            document.getElementById('home').classList.add('fade-in');
        }
        if (hash === '#contact') {
            updateContactSectionAndNav();
        }
    }
    navLinksAll.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('index.html#')) {
            link.addEventListener('click', function(e) {
                const hash = href.replace('index.html', '');
                handleNavigation(e, hash);
            });
        } else if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                handleNavigation(e, href);
            });
        }
    });
    let hash = window.location.hash || '#home';
    showSection(hash);
    window.addEventListener('hashchange', () => {
        hash = window.location.hash || '#home';
        showSection(hash);
        updateContactSectionAndNav();
    });

    // === Intersection Observer for Animations ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('skill-card')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                if (entry.target.classList.contains('project-card')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('section, .skill-card, .project-card, .contact-content').forEach(element => {
        observer.observe(element);
    });

    // === Dropdown menu for Projects (mobile support) ===
    if (dropdownToggle && navDropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 900 || (burger && getComputedStyle(burger).display === 'block')) {
                e.preventDefault();
                navDropdown.classList.toggle('open');
            }
        });
    }
    document.addEventListener('click', function(e) {
        if (navDropdown && navDropdown.classList.contains('open') && !e.target.closest('.nav-dropdown')) {
            navDropdown.classList.remove('open');
        }
    });
    const navLinksDropdown = document.querySelectorAll('.nav-link, .dropdown-link');
    navLinksDropdown.forEach(link => {
        link.addEventListener('click', function() {
            if (navDropdown) navDropdown.classList.remove('open');
        });
    });
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && navDropdown) {
            navDropdown.classList.remove('open');
        }
    });

    // === Add loading animation and section transitions ===
    // const loading = document.createElement('div');
    // loading.className = 'loading';
    // loading.innerHTML = `
    //     <div class="loading-spinner">
    //         <div class="spinner-circle"></div>
    //         <div class="spinner-text">Loading...</div>
    //     </div>
    // `;
    // document.body.appendChild(loading);
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-transition');
    });
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // === Contact Section Logic ===
    function updateContactSectionAndNav() {
        // Show/hide contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.style.display = isAuthenticated() ? '' : 'none';
        }
        // Show/hide contact nav link
        const contactNavLi = document.querySelector('.contact-link-li');
        if (contactNavLi) {
            contactNavLi.style.display = isAuthenticated() ? '' : 'none';
        }
    }

    // === Contact form submission ===
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullname = document.getElementById('contact-fullname').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            const successDiv = document.getElementById('contact-success');
            const errorDiv = document.getElementById('contact-error');
            // Basic validation
            if (!fullname || !phone || !email || !message) {
                errorDiv.textContent = 'Please fill in all fields.';
                errorDiv.style.display = 'block';
                successDiv.style.display = 'none';
                return;
            }
            // Optionally, add more validation here
            // Simulate success
            successDiv.textContent = 'Your message has been sent!';
            successDiv.style.display = 'block';
            errorDiv.style.display = 'none';
            contactForm.reset();
        });
    }

    // === Enhanced error handling for inline messages and field highlighting ===
    function setFieldError(input, errorDiv, message) {
        if (errorDiv) {
            // Add icon if not present
            if (!errorDiv.querySelector('i')) {
                errorDiv.innerHTML = '<i class="fa fa-exclamation-circle"></i> ' + message;
            } else {
                errorDiv.querySelector('i').nextSibling.textContent = ' ' + message;
            }
            errorDiv.style.opacity = '1';
            errorDiv.setAttribute('aria-live', 'polite');
        }
        if (input) {
            input.classList.add('error');
            input.classList.remove('success');
        }
    }
    function clearFieldError(input, errorDiv) {
        if (errorDiv) {
            errorDiv.innerHTML = '';
            errorDiv.style.opacity = '0';
        }
        if (input) {
            input.classList.remove('error');
            input.classList.add('success');
        }
    }

    // === Main Initialization ===
    // FOUC fix
    document.documentElement.style.visibility = 'visible';

    // Page transition
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (navbar) {
            if (currentScroll > 100) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
        if (hero) hero.style.backgroundPositionY = `${currentScroll * 0.5}px`;
        lastScroll = currentScroll;
        if (scrollTopBtn) {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // Mobile nav
    if (burger && nav && navLinks) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            burger.classList.toggle('toggle');
        });
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && !e.target.closest('.nav-links') && !e.target.closest('.burger')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    }
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            pageTransition.classList.add('active');
            setTimeout(() => {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                setTimeout(() => {
                    pageTransition.classList.remove('active');
                }, 600);
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(link => { link.style.animation = ''; });
                }
            }, 300);
        });
    });
    // Sign out
    if (signoutBtn) {
        signoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isSignedIn');
            localStorage.removeItem('userFullName');
            updateAuthUI();
        });
    }
    // Password validation and toggle
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePassword(this.value);
        });
    }
    if (passwordInput && togglePasswordBtn && togglePasswordIcon) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePasswordIcon.className = type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash';
        });
    }
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const val = passwordInput.value;
            let score = 0;
            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[a-z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[!@#$%^&*]/.test(val)) score++;
            const percent = (score / 5) * 100;
            strengthBar.style.width = percent + '%';
            let color = '#ef4444', text = 'Weak';
            if (score >= 4) { color = '#10b981'; text = 'Strong'; }
            else if (score === 3) { color = '#f59e42'; text = 'Medium'; }
            strengthBar.style.background = color;
            strengthText.textContent = val.length === 0 ? '' : text;
            strengthText.style.color = color;
        });
    }
    if (passwordInput && confirmPassword && confirmPasswordError) {
        function checkPasswordsMatchRealtime() {
            if (confirmPassword.value.length > 0 && confirmPassword.value !== passwordInput.value) {
                confirmPasswordError.textContent = 'Passwords do not match';
                confirmPasswordError.style.opacity = '1';
                confirmPassword.classList.add('error');
            } else {
                confirmPasswordError.textContent = '';
                confirmPasswordError.style.opacity = '0';
                confirmPassword.classList.remove('error');
            }
        }
        passwordInput.addEventListener('input', checkPasswordsMatchRealtime);
        confirmPassword.addEventListener('input', checkPasswordsMatchRealtime);
    }
    // Skill form
    if (skillForm) {
        skillForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateSkillForm()) {
                showNotification('Skill added successfully!', 'success');
                skillForm.reset();
            }
        });
    }
    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const username = document.getElementById('email') ? document.getElementById('email').value.trim().toLowerCase() : document.getElementById('username').value.trim().toLowerCase();
            const password = document.getElementById('password').value.trim();
            if (!username || !password) {
                e.preventDefault();
                showNotification('Please fill in all fields', 'error');
                return false;
            }
            e.preventDefault();
            let userMap = {};
            try { userMap = JSON.parse(localStorage.getItem('userMap')) || {}; } catch (e) { userMap = {}; }
            if (!userMap[username]) {
                showNotification('No account found with that email. Please sign up.', 'error');
                return;
            }
            if (userMap[username].password !== password) {
                showNotification('Incorrect password. Please try again.', 'error');
                return;
            }
            localStorage.setItem('isSignedIn', 'true');
            localStorage.setItem('userFullName', userMap[username].name);
            updateAuthUI();
            showNotification('Sign in successful! Redirecting to your profile...', 'success');
            setTimeout(function() {
                window.location.href = 'index.html#about';
            }, 1500);
        });
    }
    // Register form
    if (registerForm) {
        const fullname = document.getElementById('fullname');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        const fullnameError = document.getElementById('fullname-error');
        const emailError = document.getElementById('email-error');
        const phoneError = document.getElementById('phone-error');
        const passwordError = document.getElementById('password-error');
        const confirmPasswordError = document.getElementById('confirm-password-error');

        if (fullname) {
            fullname.addEventListener('input', function() {
                if (fullname.value.trim().length > 0 && !isValidName(fullname.value.trim())) {
                    fullnameError.textContent = 'Please enter a valid name (letters, spaces, hyphens, apostrophes, min 2 chars)';
                    fullnameError.style.opacity = '1';
                    fullname.classList.add('error');
                } else {
                    fullnameError.textContent = '';
                    fullnameError.style.opacity = '0';
                    fullname.classList.remove('error');
                }
            });
        }
        if (email) {
            email.addEventListener('input', function() {
                if (email.value.trim().length > 0 && !isValidEmail(email.value.trim())) {
                    emailError.textContent = 'Please enter a valid email address';
                    emailError.style.opacity = '1';
                    email.classList.add('error');
                } else {
                    emailError.textContent = '';
                    emailError.style.opacity = '0';
                    email.classList.remove('error');
                }
            });
        }
        if (phone) {
            phone.addEventListener('input', function() {
                if (phone.value.trim().length > 0 && !isValidPhone(phone.value.trim())) {
                    phoneError.textContent = 'Please enter a valid phone number (10-15 digits)';
                    phoneError.style.opacity = '1';
                    phone.classList.add('error');
                } else {
                    phoneError.textContent = '';
                    phoneError.style.opacity = '0';
                    phone.classList.remove('error');
                }
            });
        }
        if (password) {
            password.addEventListener('input', function() {
                const pw = password.value;
                const pwValidation = validatePassword(pw);
                if (pw.length > 0 && !pwValidation.valid) {
                    passwordError.textContent = pwValidation.message;
                    passwordError.style.opacity = '1';
                    password.classList.add('error');
                } else {
                    passwordError.textContent = '';
                    passwordError.style.opacity = '0';
                    password.classList.remove('error');
                }
            });
        }
        if (password && confirmPassword && confirmPasswordError) {
            function checkPasswordsMatchRealtime() {
                if (confirmPassword.value.length > 0 && confirmPassword.value !== password.value) {
                    confirmPasswordError.textContent = 'Passwords do not match';
                    confirmPasswordError.style.opacity = '1';
                    confirmPassword.classList.add('error');
                } else {
                    confirmPasswordError.textContent = '';
                    confirmPasswordError.style.opacity = '0';
                    confirmPassword.classList.remove('error');
                }
            }
            password.addEventListener('input', checkPasswordsMatchRealtime);
            confirmPassword.addEventListener('input', checkPasswordsMatchRealtime);
        }

        // Also update on submit
        registerForm.addEventListener('submit', function(e) {
            let valid = true;
            // Reset errors
            [fullnameError, emailError, phoneError, passwordError, confirmPasswordError].forEach(div => { if (div) { div.textContent = ''; div.style.opacity = '0'; } });
            [fullname, email, phone, password, confirmPassword].forEach(input => { if (input) input.classList.remove('error'); });

            // Full Name
            if (!isValidName(fullname.value.trim())) {
                fullnameError.textContent = 'Please enter a valid name (letters, spaces, hyphens, apostrophes, min 2 chars)';
                fullnameError.style.opacity = '1';
                fullname.classList.add('error');
                valid = false;
            }
            // Email
            if (!email.value.trim() || !isValidEmail(email.value.trim())) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.style.opacity = '1';
                email.classList.add('error');
                valid = false;
            }
            // Phone
            if (!phone.value.trim() || !isValidPhone(phone.value.trim())) {
                phoneError.textContent = 'Please enter a valid phone number (10-15 digits)';
                phoneError.style.opacity = '1';
                phone.classList.add('error');
                valid = false;
            }
            // Password
            const pw = password.value;
            const pwValidation = validatePassword(pw);
            if (!pwValidation.valid) {
                passwordError.textContent = pwValidation.message;
                passwordError.style.opacity = '1';
                password.classList.add('error');
                valid = false;
            }
            // Confirm Password
            if (confirmPassword.value !== pw) {
                confirmPasswordError.textContent = 'Passwords do not match';
                confirmPasswordError.style.opacity = '1';
                confirmPassword.classList.add('error');
                valid = false;
            }
            if (!valid) {
                e.preventDefault();
                return;
            }
            // --- Prevent duplicate signup and store password ---
            e.preventDefault();
            let userMap = {};
            try {
                userMap = JSON.parse(localStorage.getItem('userMap')) || {};
            } catch (e) { userMap = {}; }
            const emailKey = email.value.trim().toLowerCase();
            if (userMap[emailKey]) {
                showNotification('An account with this email already exists. Please sign in.', 'error');
                emailError.textContent = 'Email already registered';
                emailError.style.opacity = '1';
                email.classList.add('error');
                return;
            }
            userMap[emailKey] = { name: fullname.value.trim(), password: pw };
            localStorage.setItem('userMap', JSON.stringify(userMap));
            localStorage.setItem('isSignedIn', 'true');
            localStorage.setItem('userFullName', fullname.value.trim());
            if (typeof updateAuthUI === 'function') updateAuthUI();
            showNotification('Account created successfully! Redirecting to sign in...', 'success');
            setTimeout(function() {
                window.location.href = 'signin.html';
            }, 1500);
        });
    }
    // Project filters
    if (filterBtns && projectCards) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    // Skills animation
    if (skillCards) {
        skillCards.forEach(card => {
            const progress = card.querySelector('.skill-progress');
            if (progress) {
                const value = progress.dataset.progress;
                progress.style.setProperty('--progress', `${value}%`);
            }
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
    // Search functionality
    if (searchOverlay && searchInput && searchClose && searchResults) {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                searchOverlay.classList.add('active');
                searchInput.focus();
            }
        });
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            const results = [];
            document.querySelectorAll('section').forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(query)) {
                    results.push({
                        title: section.querySelector('h2')?.textContent || 'Section',
                        content: text.substring(Math.max(0, text.indexOf(query) - 50), text.indexOf(query) + 50),
                        link: `#${section.id}`
                    });
                }
            });
            searchResults.innerHTML = results.map(result => `
                <div class="search-result">
                    <h3><a href="${result.link}">${result.title}</a></h3>
                    <p>...${result.content}...</p>
                </div>
            `).join('');
        });
    }
    // Dropdown menu
    if (dropdownToggle && navDropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 900 || (burger && getComputedStyle(burger).display === 'block')) {
                e.preventDefault();
                navDropdown.classList.toggle('open');
            }
        });
    }
    document.addEventListener('click', function(e) {
        if (navDropdown && navDropdown.classList.contains('open') && !e.target.closest('.nav-dropdown')) {
            navDropdown.classList.remove('open');
        }
    });
    navLinksDropdown.forEach(link => {
        link.addEventListener('click', function() {
            if (navDropdown) navDropdown.classList.remove('open');
        });
    });
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && navDropdown) {
            navDropdown.classList.remove('open');
        }
    });
    // SPA navigation
    navLinksAll.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('index.html#')) {
            link.addEventListener('click', function(e) {
                const hash = href.replace('index.html', '');
                handleNavigation(e, hash);
            });
        } else if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                handleNavigation(e, href);
            });
        }
    });
    // On page load, show correct section
    hash = window.location.hash || '#home';
    showSection(hash);
    // On hash change
    window.addEventListener('hashchange', () => {
        hash = window.location.hash || '#home';
        showSection(hash);
        updateContactSectionAndNav();
    });
    // Contact section
    updateContactSectionAndNav();
});

// === Validation Helpers ===
function isValidEmail(email) {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
    // Allows 10-15 digits, optional + at start
    return /^\+?[0-9]{10,15}$/.test(phone);
}
function isValidName(name) {
    // Allows letters, spaces, hyphens, apostrophes, at least 2 chars
    return /^[A-Za-z\s\-']{2,}$/.test(name.trim());
}
