/* assets/js/teacher/sidebar.js */
document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.getElementById('sidebar-container');

    if (sidebarContainer) {

        // --- 1. EMBEDDED STYLES (Global Layout Fixes - Matching Student) ---
        // --- 1. styles are now in assets/css/shared/sidebar.css ---
        // (Styles removed from here to fix delay)

        // Teacher Navigation HTML
        const sidebarHTML = `
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo-icon"><i class="fas fa-cube"></i></div>
                <h2>Spark Tech</h2>
            </div>
            
            <nav class="sidebar-nav">
                <div class="nav-group">
                    <p class="group-label">TEACHER PANEL</p>
                    
                    <a href="dashboard.html" class="nav-item" id="nav-dashboard">
                        <i class="fas fa-home"></i> <span>Dashboard</span>
                    </a>
                    
                    <a href="classes.html" class="nav-item" id="nav-classes">
                        <i class="fas fa-chalkboard-teacher"></i> <span>Classes</span>
                    </a>
                    
                    <a href="assignments.html" class="nav-item" id="nav-assignments">
                        <i class="fas fa-tasks"></i> <span>Assignments</span>
                    </a>

                    <a href="gradebook.html" class="nav-item" id="nav-gradebook">
                        <i class="fas fa-book-open"></i> <span>Grade Book</span>
                    </a>

                    <a href="resources.html" class="nav-item" id="nav-resources">
                        <i class="fas fa-folder-open"></i> <span>Resources</span>
                    </a>
                </div>

                <div class="nav-group">
                    <p class="group-label">COMMUNICATION</p>
                    <a href="schedule.html" class="nav-item" id="nav-schedule">
                        <i class="fas fa-calendar-alt"></i> <span>Schedule</span>
                    </a>
                    <a href="messages.html" class="nav-item" id="nav-messages">
                        <i class="fas fa-envelope"></i> <span>Messages</span>
                    </a>
                    <a href="doubts.html" class="nav-item" id="nav-doubts">
                        <i class="fas fa-question-circle"></i> <span>Doubts</span>
                    </a>
                    <a href="notices.html" class="nav-item" id="nav-notices">
                        <i class="fas fa-bullhorn"></i> <span>Notices</span>
                    </a>
                </div>
            </nav>

            <div class="sidebar-footer">
                <div class="user-mini-profile">
                    <div class="avatar">DS</div>
                    <div class="info">
                        <span class="name">Dr. Sharma</span>
                        <span class="role">Faculty</span>
                    </div>
                    <button class="logout-btn" onclick="if(confirm('Logout?')) window.location.href='login.html'">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        </aside>
        `;

        sidebarContainer.innerHTML = sidebarHTML;

        // Highlight Active Link Algorithm
        const path = window.location.pathname;
        const page = path.split("/").pop();

        const navItems = {
            'dashboard.html': 'nav-dashboard',
            'classes.html': 'nav-classes',
            'assignments.html': 'nav-assignments',
            'gradebook.html': 'nav-gradebook',
            'edit-assignment.html': 'nav-assignments',
            'submissions.html': 'nav-assignments',
            'grading.html': 'nav-assignments',
            'class-detail.html': 'nav-classes',
            'doubts.html': 'nav-doubts',
            'schedule.html': 'nav-schedule',
            'messages.html': 'nav-messages',
            'schedule.html': 'nav-schedule',
            'messages.html': 'nav-messages',
            'notices.html': 'nav-notices',
            'resources.html': 'nav-resources'
        };

        const activeId = navItems[page];
        if (activeId) {
            const el = document.getElementById(activeId);
            if (el) el.classList.add('active');
        }
    }
});
