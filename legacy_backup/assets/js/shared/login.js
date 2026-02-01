/* assets/js/shared/login.js */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Select DOM Elements ---
    const wrapper = document.querySelector('.form-wrapper');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('error-msg');

    // --- 2. Mascot Elements (Critical for movement) ---
    const pupils = document.getElementById('pupils');
    // We select the first eye-white to calculate the center point
    const eyeRef = document.querySelector('.eye-white');

    // Debugging: Check if elements were found
    if (!pupils || !eyeRef) {
        console.warn("Mascot elements not found! Check your HTML IDs/Classes.");
        // Continue anyway, just without mascot logic
    }

    // --- 3. MOUSE TRACKING LOGIC ---
    const handleMouseMove = (e) => {
        if (!pupils || !eyeRef) return;

        // A. Check if we are in "Password Mode" (Hidden eyes)
        // If the wrapper has this class, we STOP moving the eyes.
        if (wrapper.classList.contains('password-mode')) {
            return;
        }

        // B. Get the position of the eye on the screen
        const rect = eyeRef.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        // C. Calculate the Angle between Mouse and Eye
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);

        // D. Calculate Distance (Clamped)
        // This '15' controls how "far" the eyes move. Lower = more movement.
        const maxMove = 10;
        const dist = Math.min(maxMove, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 15);

        // E. Move the pupils
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;

        pupils.style.transform = `translate(${x}px, ${y}px)`;
    };

    // Attach event to the entire Window to catch all movement
    window.addEventListener('mousemove', handleMouseMove);


    // --- 4. INPUT EVENTS (When to hide eyes) ---

    // Password Focus -> Add Class to Hide Eyes
    passwordInput.addEventListener('focus', () => {
        wrapper.classList.add('password-mode');
        if (pupils) pupils.style.transform = 'translate(0, 0)'; // Reset eyes to center
    });

    // Password Blur -> Remove Class (Unless text is visible)
    passwordInput.addEventListener('blur', () => {
        wrapper.classList.remove('password-mode');
    });

    // Email Focus -> Ensure Eyes are Visible
    emailInput.addEventListener('focus', () => {
        wrapper.classList.remove('password-mode');
        errorMsg.style.display = 'none';
    });


    // --- 5. PASSWORD TOGGLE ---
    toggleBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        toggleBtn.classList.toggle('fa-eye');
        toggleBtn.classList.toggle('fa-eye-slash');

        // If showing text, eyes should see (remove password-mode)
        if (type === 'text') {
            wrapper.classList.remove('password-mode');
        } else {
            // Only cover eyes if user is currently clicked inside the box
            if (document.activeElement === passwordInput) {
                wrapper.classList.add('password-mode');
            }
        }
    });

    // --- 6. UNIFIED LOGIN BUTTON ---
    const performLogin = async (e) => {
        if (e) e.preventDefault();

        const email = emailInput.value.trim();
        const pass = passwordInput.value;

        try {
            console.log('Attempting login with:', email);

            // Check if credentials object exists
            if (typeof credentials === 'undefined') {
                console.error("Credentials object missing. Make sure credentials.js is loaded.");
                throw new Error("Credentials module not loaded. Check script imports.");
            }

            // Find matching student credential
            const student = credentials.students.find(s =>
                (s.id === email || s.email === email) && s.password === pass
            );

            // Find matching teacher credential
            const teacher = credentials.teachers.find(t =>
                (t.id === email || t.email === email) && t.password === pass
            );

            if (student) {
                console.log('Student found, redirecting...');
                // 1. Visual Feedback
                errorMsg.style.display = 'none';
                loginBtn.innerText = "Redirecting...";
                loginBtn.style.background = "#10b981"; // Green color
                loginBtn.disabled = true;

                // 2. Play Sound
                const successSound = document.getElementById('success-sound');
                if (successSound) {
                    successSound.volume = 0.3;
                    successSound.play().catch(err => console.log('Audio blocked:', err));
                }

                // Store user info
                sessionStorage.setItem('currentUser', JSON.stringify({
                    id: student.id,
                    name: student.name,
                    role: 'student'
                }));

                // 3. THE REDIRECT
                setTimeout(() => {
                    // Use replace to prevent back-button loop
                    window.location.href = 'student/dashboard.html';
                }, 800);

            } else if (teacher) {
                console.log('Teacher found, redirecting...');
                // 1. Visual Feedback
                errorMsg.style.display = 'none';
                loginBtn.innerText = "Redirecting...";
                loginBtn.style.background = "#10b981"; // Green color
                loginBtn.disabled = true;

                // 2. Play Sound
                const successSound = document.getElementById('success-sound');
                if (successSound) {
                    successSound.volume = 0.3;
                    successSound.play().catch(err => console.log('Audio blocked:', err));
                }

                // Store user info
                sessionStorage.setItem('currentUser', JSON.stringify({
                    id: teacher.id,
                    name: teacher.name,
                    role: 'teacher'
                }));

                // 3. THE REDIRECT
                setTimeout(() => {
                    window.location.href = 'teacher/dashboard.html';
                }, 800);

            } else {
                console.warn('Invalid credentials');
                // Error State
                wrapper.classList.remove('password-mode');
                errorMsg.style.display = 'block';
                errorMsg.innerText = "Invalid credentials. Try 'student123' or 'teacher123'.";
                loginBtn.innerText = "Log In";
            }
        } catch (error) {
            console.error('Login Error:', error);
            errorMsg.style.display = 'block';
            errorMsg.innerText = "Login error: " + (error.message || "Unknown error");
            loginBtn.innerText = "Log In";
        }
    };

    loginBtn.addEventListener('click', performLogin);

    // Also handle form submission via Enter key
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault(); // Always prevent form submit
        performLogin(e);
    });
});