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
    
    // Initialize resources page
    initializeResourcesPage();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load resources data
    loadResourcesData();
});

function initializeResourcesPage() {
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
    const currentPage = window.location.pathname.split('/').pop() || 'resources.html';
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
    
    // Upload resource button
    const uploadResourceBtn = document.getElementById('uploadResourceBtn');
    if (uploadResourceBtn) {
        uploadResourceBtn.addEventListener('click', () => {
            showUploadModal();
        });
    }
    
    // Category filters
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            categoryItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Filter resources by category
            const category = item.dataset.category;
            filterResourcesByCategory(category);
        });
    });
    
    // Subject filter
    const subjectFilter = document.getElementById('subjectFilter');
    if (subjectFilter) {
        subjectFilter.addEventListener('change', () => {
            const subject = subjectFilter.value;
            filterResourcesBySubject(subject);
        });
    }
    
    // Type filter
    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', () => {
            const type = typeFilter.value;
            filterResourcesByType(type);
        });
    }
    
    // Action buttons for resources
    setupResourceActionListeners();
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchResources(searchTerm);
        });
    }
}

function loadResourcesData() {
    // In a real implementation, this would fetch data from backend
    // For now, we'll use the static data in the HTML
    console.log('Loading resources data...');
}

function setupResourceActionListeners() {
    // View button
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const resourceItem = e.target.closest('.resource-item');
            const title = resourceItem.querySelector('h4').textContent;
            alert(`Viewing resource: ${title}`);
        });
    });
    
    // Edit button
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const resourceItem = e.target.closest('.resource-item');
            const title = resourceItem.querySelector('h4').textContent;
            showEditResourceModal(title);
        });
    });
    
    // Delete button
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const resourceItem = e.target.closest('.resource-item');
            const title = resourceItem.querySelector('h4').textContent;
            
            if (confirm(`Are you sure you want to delete resource: ${title}?`)) {
                resourceItem.remove();
                showNotification(`Resource "${title}" deleted`, 'success');
            }
        });
    });
}

function filterResourcesByCategory(category) {
    const items = document.querySelectorAll('.resource-item');
    
    items.forEach(item => {
        if (category === 'all') {
            item.style.display = 'flex';
        } else {
            if (item.dataset.subject === category) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

function filterResourcesBySubject(subject) {
    const items = document.querySelectorAll('.resource-item');
    
    items.forEach(item => {
        if (subject === 'all') {
            item.style.display = 'flex';
        } else {
            if (item.dataset.subject === subject) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

function filterResourcesByType(type) {
    const items = document.querySelectorAll('.resource-item');
    
    items.forEach(item => {
        if (type === 'all') {
            item.style.display = 'flex';
        } else {
            if (item.dataset.type === type) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

function searchResources(searchTerm) {
    const items = document.querySelectorAll('.resource-item');
    
    items.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const description = item.querySelector('.resource-desc').textContent.toLowerCase();
        const subject = item.querySelector('.subject').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || subject.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function showUploadModal() {
    // In a real implementation, this would show a modal form
    // For now, we'll just show an alert
    alert('Upload Resource functionality would open here');
}

function showEditResourceModal(resourceName) {
    // In a real implementation, this would show a modal form
    // For now, we'll just show an alert
    alert(`Editing resource: ${resourceName}`);
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