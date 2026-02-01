document.addEventListener('DOMContentLoaded', () => {
    
    // Check authentication
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = '../../views/login.html';
        return;
    }
    
    const user = JSON.parse(currentUser);
    if (user.role !== 'teacher') {
        window.location.href = '../../views/login.html';
        return;
    }
    
    // Initialize submissions page
    initializeSubmissionsPage();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load submissions data
    loadSubmissionsData();
});

function initializeSubmissionsPage() {
    // Set user information in header
    const userNameElement = document.querySelector('.user-name');
    const userIdElement = document.querySelector('.user-id');
    
    if (userNameElement && userIdElement) {
        userNameElement.textContent = user.name || 'Dr. Faculty';
        userIdElement.textContent = `Faculty ID: ${user.id || 'FAC_001'}`;
    }
    
    // Set active navigation
    setActiveNavigation();
    
    // Set up student selection
    setupStudentSelection();
}

function setActiveNavigation() {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to current page
    const currentPage = window.location.pathname.split('/').pop() || 'submissions.html';
    const activeItem = document.querySelector(`.nav-item[href="${currentPage}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function setupStudentSelection() {
    // Add click event to student rows
    const studentRows = document.querySelectorAll('.student-row');
    studentRows.forEach(row => {
        row.addEventListener('click', (e) => {
            // Remove active class from all rows
            studentRows.forEach(r => r.classList.remove('active'));
            // Add active class to clicked row
            row.classList.add('active');
            
            // Update submission details based on selected student
            const studentName = row.querySelector('.student-details h4').textContent;
            updateSubmissionDetails(studentName);
        });
    });
    
    // Set first student as active by default
    if (studentRows.length > 0) {
        studentRows[0].classList.add('active');
        const studentName = studentRows[0].querySelector('.student-details h4').textContent;
        updateSubmissionDetails(studentName);
    }
}

function updateSubmissionDetails(studentName) {
    // Update submission header with student info
    const submissionHeader = document.querySelector('.submission-info p');
    if (submissionHeader) {
        submissionHeader.textContent = `Submitted by: ${studentName} • 10 minutes ago`;
    }
}

function setupEventListeners() {
    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.removeItem('currentUser');
                window.location.href = '../../views/login.html';
            }
        });
    }
    
    // Notification badge click
    const notificationBadge = document.querySelector('.notification-badge');
    if (notificationBadge) {
        notificationBadge.addEventListener('click', () => {
            alert('Notifications would open here');
        });
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter submissions based on status
            const status = button.dataset.status;
            filterSubmissionsByStatus(status);
        });
    });
    
    // Navigation buttons (Prev/Next student)
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            navigateToStudent('prev');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            navigateToStudent('next');
        });
    }
    
    // Run code button
    const runBtn = document.querySelector('.run-btn');
    if (runBtn) {
        runBtn.addEventListener('click', () => {
            runCode();
        });
    }
    
    // Submit grade button
    const submitGradeBtn = document.querySelector('.submit-grade');
    if (submitGradeBtn) {
        submitGradeBtn.addEventListener('click', () => {
            submitGrade();
        });
    }
    
    // Save draft button
    const saveDraftBtn = document.querySelector('.save-draft');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            saveDraft();
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchSubmissions(searchTerm);
        });
    }
}

function loadSubmissionsData() {
    // In a real implementation, this would fetch data from backend
    // For now, we'll use the static data in the HTML
    console.log('Loading submissions data...');
}

function filterSubmissionsByStatus(status) {
    const rows = document.querySelectorAll('.student-row');
    
    rows.forEach(row => {
        if (status === 'all') {
            row.style.display = 'flex';
        } else {
            if (row.dataset.status === status) {
                row.style.display = 'flex';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

function searchSubmissions(searchTerm) {
    const rows = document.querySelectorAll('.student-row');
    
    rows.forEach(row => {
        const name = row.querySelector('.student-details h4').textContent.toLowerCase();
        const roll = row.querySelector('.student-details p').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || roll.includes(searchTerm)) {
            row.style.display = 'flex';
        } else {
            row.style.display = 'none';
        }
    });
}

function navigateToStudent(direction) {
    const allRows = Array.from(document.querySelectorAll('.student-row'));
    const currentActive = document.querySelector('.student-row.active');
    const currentIndex = allRows.indexOf(currentActive);
    
    let newIndex;
    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : allRows.length - 1;
    } else {
        newIndex = currentIndex < allRows.length - 1 ? currentIndex + 1 : 0;
    }
    
    // Remove active class from current
    currentActive.classList.remove('active');
    // Add active class to new
    allRows[newIndex].classList.add('active');
    
    // Update submission details
    const studentName = allRows[newIndex].querySelector('.student-details h4').textContent;
    updateSubmissionDetails(studentName);
}

function runCode() {
    // In a real implementation, this would send code to backend for execution
    // For now, we'll simulate the output
    showNotification('Running code...', 'info');
    
    // Simulate execution delay
    setTimeout(() => {
        showNotification('Code executed successfully!', 'success');
    }, 1000);
}

function submitGrade() {
    const marksInput = document.getElementById('marks');
    const feedbackInput = document.getElementById('feedback');
    
    if (!marksInput || !feedbackInput) {
        showNotification('Error: Missing grading inputs', 'error');
        return;
    }
    
    const marks = parseInt(marksInput.value);
    const feedback = feedbackInput.value.trim();
    
    if (isNaN(marks) || marks < 0 || marks > 100) {
        showNotification('Please enter valid marks (0-100)', 'error');
        return;
    }
    
    if (!feedback) {
        showNotification('Please provide feedback', 'error');
        return;
    }
    
    // In a real implementation, this would send grade to backend
    // For now, we'll just show a success message
    const currentStudent = document.querySelector('.student-row.active .student-details h4').textContent;
    showNotification(`Grade submitted for ${currentStudent}: ${marks}/100`, 'success');
    
    // Update status to graded
    const activeRow = document.querySelector('.student-row.active');
    if (activeRow) {
        activeRow.dataset.status = 'graded';
        activeRow.querySelector('.status-badge').className = 'status-badge graded';
        activeRow.querySelector('.status-badge').textContent = 'Graded';
        activeRow.querySelector('.status-indicator').className = 'status-indicator graded';
    }
}

function saveDraft() {
    const marksInput = document.getElementById('marks');
    const feedbackInput = document.getElementById('feedback');
    
    if (!marksInput || !feedbackInput) {
        showNotification('Error: Missing grading inputs', 'error');
        return;
    }
    
    // In a real implementation, this would save to backend
    // For now, we'll just show a success message
    showNotification('Grade saved as draft', 'info');
    
    // Update status to reviewed
    const activeRow = document.querySelector('.student-row.active');
    if (activeRow) {
        activeRow.dataset.status = 'reviewed';
        activeRow.querySelector('.status-badge').className = 'status-badge reviewed';
        activeRow.querySelector('.status-badge').textContent = 'Reviewed';
        activeRow.querySelector('.status-indicator').className = 'status-indicator reviewed';
    }
}

// Utility functions for teacher-specific features
function navigateToPage(page) {
    window.location.href = page;
}

function showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#10b981' : 
                         type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        zIndex: '1000',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Make functions available globally
window.navigateToPage = navigateToPage;
window.showNotification = showNotification;