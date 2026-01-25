import { getUser } from '../services/authService.js';

document.addEventListener('DOMContentLoaded', initSidebar);

async function initSidebar() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return;

    // --- 1. styles are now in assets/css/shared/sidebar.css ---
    // (Styles removed from here to fix delay)

    // --- 2. FETCH USER ---
    let user = null;

    // PRIORITY 1: Check sessionStorage for logged-in user
    const sessionUser = sessionStorage.getItem('currentUser');
    if (sessionUser) {
        try {
            user = JSON.parse(sessionUser);
            // console.log('Sidebar: Loaded user from session:', user);
        } catch (e) {
            console.warn('Sidebar: Failed to parse session user');
        }
    }

    // PRIORITY 2: Fall back to authService (mock data)
    if (!user) {
        try {
            const response = await getUser();
            user = response.data;
            // console.log('Sidebar: Loaded user from authService:', user);
        } catch (e) {
            console.warn('Sidebar: Failed to fetch user from service, using guest mode.');
        }
    }

    // --- 3. GENERATE NAV ---
    let navContent = '';

    // Check role from fetched user
    const isTeacher = user && user.role === 'teacher';

    // Assuming we are in views/student/ or similar depth, fix paths
    // Original code used hardcoded checks. Use relative paths carefully.
    // Since sidebar.js is included in views like views/student/dashboard.html

    if (isTeacher) {
        navContent = `
            <div class="nav-group">
                <p class="group-label">TEACHER PANEL</p>       
                <a href="../dashboard.html" class="nav-item" id="nav-dashboard"><i class="fas fa-home"></i> <span>Dashboard</span></a>
                <a href="../assignments.html" class="nav-item" id="nav-assignments"><i class="fas fa-tasks"></i> <span>Manage Assignments</span></a>
            </div>
        `;
    } else {
        navContent = `
            <div class="nav-group">
                <p class="group-label">ACADEMICS</p>       
                <a href="dashboard.html" class="nav-item" id="nav-dashboard"><i class="fas fa-home"></i> <span>Dashboard</span></a>
                <a href="assignments.html" class="nav-item" id="nav-assignments"><i class="fas fa-code"></i> <span>Assignments</span></a>
                <a href="classes.html" class="nav-item" id="nav-classes"><i class="fas fa-chalkboard"></i> <span>My Classes</span></a>
                <a href="workspace.html" class="nav-item" id="nav-workspace"><i class="fas fa-laptop-code"></i> <span>Code Editor</span></a>
                <a href="resources.html" class="nav-item" id="nav-resources"><i class="fas fa-book"></i> <span>Resources</span></a>
                <a href="doubts.html" class="nav-item" id="nav-doubts"><i class="fas fa-question-circle"></i> <span>Doubts</span></a>
            </div>
            <div class="nav-group">
                <p class="group-label">CAMPUS</p>
                <a href="notices.html" class="nav-item" id="nav-notices"><i class="fas fa-bullhorn"></i> <span>Notices</span></a>
                <a href="messages.html" class="nav-item" id="nav-messages"><i class="fas fa-envelope"></i> <span>Messages</span></a>
            </div>
        `;
    }

    const userName = user ? user.name : 'Guest';
    const userRole = user ? (isTeacher ? `Teacher ID: ${user.id}` : `Student ID: ${user.id}`) : 'Guest';
    const avatarInitial = userName.charAt(0).toUpperCase();

    const sidebarHTML = `
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="logo-icon"><i class="fas fa-cube"></i></div>
            <h2>Spark Tech</h2>
        </div>
                
        <nav class="sidebar-nav">
            ${navContent}
        </nav>
    
        <div class="sidebar-footer">
            <div class="user-mini-profile">
                <div class="avatar">${avatarInitial}</div>
                <div class="info">
                    <span class="name">${userName}</span>
                    <span class="role">${userRole}</span>
                </div>
                <button class="logout-btn" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </div>
    </aside>
    `;

    sidebarContainer.innerHTML = sidebarHTML;

    // --- 4. HIGHLIGHT ACTIVE LINK ---
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage && currentPage !== 'index.html') {
        const activeLink = document.getElementById('nav-' + currentPage.replace('.html', ''));
        if (activeLink) activeLink.classList.add('active');
    }

    // --- 5. EVENTS ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Logout?')) {
                sessionStorage.removeItem('currentUser');
                window.location.href = '../../views/login.html';
            }
        });
    }
}