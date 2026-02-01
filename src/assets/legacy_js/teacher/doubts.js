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
    
    // Initialize doubts page
    initializeDoubtsPage();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load doubts data
    loadDoubtsData();
});

function initializeDoubtsPage() {
    // Set user information in header
    const userNameElement = document.querySelector('.user-name');
    const userIdElement = document.querySelector('.user-id');
    
    if (userNameElement && userIdElement) {
        userNameElement.textContent = user.name || 'Dr. Faculty';
        userIdElement.textContent = `Faculty ID: ${user.id || 'FAC_001'}`;
    }
    
    // Set active navigation
    setActiveNavigation();
}

function setActiveNavigation() {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to current page
    const currentPage = window.location.pathname.split('/').pop() || 'doubts.html';
    const activeItem = document.querySelector(`.nav-item[href="${currentPage}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
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
            
            // Filter doubts based on status
            const status = button.dataset.status;
            filterDoubtsByStatus(status);
        });
    });
    
    // Subject filter
    const subjectFilter = document.getElementById('subjectFilter');
    if (subjectFilter) {
        subjectFilter.addEventListener('change', () => {
            const subject = subjectFilter.value;
            filterDoubtsBySubject(subject);
        });
    }
    
    // Action buttons for doubts
    setupDoubtActionListeners();
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchDoubts(searchTerm);
        });
    }
}

function loadDoubtsData() {
    // In a real implementation, this would fetch data from backend
    // For now, we'll use the static data in the HTML
    console.log('Loading doubts data...');
}

function setupDoubtActionListeners() {
    // Reply button
    const replyButtons = document.querySelectorAll('.reply-btn');
    replyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const doubtItem = e.target.closest('.doubt-item');
            const title = doubtItem.querySelector('.doubt-title h3').textContent;
            showReplyModal(title);
        });
    });
    
    // Resolve button
    const resolveButtons = document.querySelectorAll('.resolve-btn');
    resolveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const doubtItem = e.target.closest('.doubt-item');
            const title = doubtItem.querySelector('.doubt-title h3').textContent;
            
            if (confirm(`Are you sure you want to mark doubt "${title}" as resolved?`)) {
                doubtItem.dataset.status = 'resolved';
                doubtItem.querySelector('.resolve-btn').className = 'action-btn resolved-btn';
                doubtItem.querySelector('.resolve-btn').disabled = true;
                doubtItem.querySelector('.resolve-btn').innerHTML = '<i class="fas fa-check"></i> Resolved';
                
                showNotification(`Doubt "${title}" marked as resolved`, 'success');
            }
        });
    });
    
    // Pin button
    const pinButtons = document.querySelectorAll('.pin-btn');
    pinButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const doubtItem = e.target.closest('.doubt-item');
            const title = doubtItem.querySelector('.doubt-title h3').textContent;
            
            // Toggle pinned state
            doubtItem.classList.toggle('pinned');
            const isPinned = doubtItem.classList.contains('pinned');
            
            if (isPinned) {
                button.innerHTML = '<i class="fas fa-thumbtack"></i> Unpin';
                showNotification(`Doubt "${title}" pinned`, 'info');
            } else {
                button.innerHTML = '<i class="fas fa-thumbtack"></i> Pin';
                showNotification(`Doubt "${title}" unpinned`, 'info');
            }
        });
    });
    
    // Convert to FAQ button
    const convertButtons = document.querySelectorAll('.convert-btn');
    convertButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const doubtItem = e.target.closest('.doubt-item');
            const title = doubtItem.querySelector('.doubt-title h3').textContent;
            
            if (confirm(`Convert doubt "${title}" to FAQ?`)) {
                showNotification(`Doubt "${title}" converted to FAQ`, 'success');
            }
        });
    });
}

function filterDoubtsByStatus(status) {
    const items = document.querySelectorAll('.doubt-item');
    
    items.forEach(item => {
        if (status === 'all') {
            item.style.display = 'block';
        } else {
            if (item.dataset.status === status) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

function filterDoubtsBySubject(subject) {
    const items = document.querySelectorAll('.doubt-item');
    
    items.forEach(item => {
        if (subject === 'all') {
            item.style.display = 'block';
        } else {
            if (item.dataset.subject === subject) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

function searchDoubts(searchTerm) {
    const items = document.querySelectorAll('.doubt-item');
    
    items.forEach(item => {
        const title = item.querySelector('.doubt-title h3').textContent.toLowerCase();
        const content = item.querySelector('.doubt-content p').textContent.toLowerCase();
        const author = item.querySelector('.author').textContent.toLowerCase();
        const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const matches = title.includes(searchTerm) || 
                       content.includes(searchTerm) || 
                       author.includes(searchTerm) ||
                       tags.some(tag => tag.includes(searchTerm));
        
        item.style.display = matches ? 'block' : 'none';
    });
}

function showReplyModal(doubtTitle) {
    // In a real implementation, this would show a modal form
    // For now, we'll just show an alert
    const reply = prompt(`Reply to doubt: "${doubtTitle}"\n\nYour reply:`);
    if (reply && reply.trim()) {
        showNotification('Reply submitted successfully', 'success');
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