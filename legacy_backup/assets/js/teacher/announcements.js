document.addEventListener('DOMContentLoaded', () => {

    // Check authentication
    const currentUser = sessionStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== 'teacher') {
        window.location.href = 'login.html';
        return;
    }

    // Initialize announcements page
    initializeAnnouncementsPage();

    // Set up event listeners
    setupEventListeners();

    // Load announcements data
    loadAnnouncementsData();
});

function initializeAnnouncementsPage() {
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
    const currentPage = window.location.pathname.split('/').pop() || 'announcements.html';
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
                window.location.href = 'login.html';
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

    // Create announcement button
    const createAnnouncementBtn = document.getElementById('createAnnouncementBtn');
    if (createAnnouncementBtn) {
        createAnnouncementBtn.addEventListener('click', () => {
            showCreateAnnouncementModal();
        });
    }

    // Audience filter
    const audienceFilter = document.getElementById('audienceFilter');
    if (audienceFilter) {
        audienceFilter.addEventListener('change', () => {
            const audience = audienceFilter.value;
            filterAnnouncementsByAudience(audience);
        });
    }

    // Date filter
    const dateFilter = document.getElementById('dateFilter');
    if (dateFilter) {
        dateFilter.addEventListener('change', () => {
            const dateRange = dateFilter.value;
            filterAnnouncementsByDate(dateRange);
        });
    }

    // Action buttons for announcements
    setupAnnouncementActionListeners();

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchAnnouncements(searchTerm);
        });
    }
}

function loadAnnouncementsData() {
    // In a real implementation, this would fetch data from backend
    // For now, we'll use the static data in the HTML
    console.log('Loading announcements data...');
}

function setupAnnouncementActionListeners() {
    // Edit button
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const announcementItem = e.target.closest('.announcement-item');
            const title = announcementItem.querySelector('h3').textContent;
            showEditAnnouncementModal(title);
        });
    });

    // Pin button
    const pinButtons = document.querySelectorAll('.pin-btn');
    pinButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const announcementItem = e.target.closest('.announcement-item');
            const title = announcementItem.querySelector('h3').textContent;

            // Toggle pinned state
            announcementItem.classList.toggle('pinned');
            const isPinned = announcementItem.classList.contains('pinned');

            if (isPinned) {
                button.innerHTML = '<i class="fas fa-thumbtack"></i> Unpin';
                button.title = 'Unpin Announcement';
                showNotification(`Announcement "${title}" pinned`, 'info');
            } else {
                button.innerHTML = '<i class="fas fa-thumbtack"></i> Pin';
                button.title = 'Pin Announcement';
                showNotification(`Announcement "${title}" unpinned`, 'info');
            }
        });
    });

    // Delete button
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const announcementItem = e.target.closest('.announcement-item');
            const title = announcementItem.querySelector('h3').textContent;

            if (confirm(`Are you sure you want to delete announcement: ${title}?`)) {
                announcementItem.remove();
                showNotification(`Announcement "${title}" deleted`, 'success');
            }
        });
    });
}

function filterAnnouncementsByAudience(audience) {
    const items = document.querySelectorAll('.announcement-item');

    items.forEach(item => {
        if (audience === 'all') {
            item.style.display = 'block';
        } else {
            if (item.dataset.audience === audience) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

function filterAnnouncementsByDate(dateRange) {
    const items = document.querySelectorAll('.announcement-item');
    const now = new Date();

    items.forEach(item => {
        const announcementDate = new Date(item.dataset.date);

        let shouldShow = true;

        switch (dateRange) {
            case 'today':
                shouldShow = isToday(announcementDate);
                break;
            case 'week':
                shouldShow = isWithinWeek(announcementDate, now);
                break;
            case 'month':
                shouldShow = isWithinMonth(announcementDate, now);
                break;
            default:
                shouldShow = true;
        }

        item.style.display = shouldShow ? 'block' : 'none';
    });
}

function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
}

function isWithinWeek(date, referenceDate) {
    const weekAgo = new Date(referenceDate);
    weekAgo.setDate(referenceDate.getDate() - 7);
    return date >= weekAgo && date <= referenceDate;
}

function isWithinMonth(date, referenceDate) {
    const monthAgo = new Date(referenceDate);
    monthAgo.setMonth(referenceDate.getMonth() - 1);
    return date >= monthAgo && date <= referenceDate;
}

function searchAnnouncements(searchTerm) {
    const items = document.querySelectorAll('.announcement-item');

    items.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const content = item.querySelector('.announcement-content p').textContent.toLowerCase();
        const subject = item.querySelector('.announcement-subject').textContent.toLowerCase();
        const author = item.querySelector('.author').textContent.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm) || subject.includes(searchTerm) || author.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function showCreateAnnouncementModal() {
    // In a real implementation, this would show a modal form
    // For now, we'll just show an alert
    alert('Create Announcement functionality would open here');
}

function showEditAnnouncementModal(announcementTitle) {
    // In a real implementation, this would show a modal form
    // For now, we'll just show an alert
    alert(`Editing announcement: ${announcementTitle}`);
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