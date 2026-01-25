// Set current user as teacher
sessionStorage.setItem('currentUser', JSON.stringify({
    id: 'CS_012',
    name: 'Dr. Sharma',
    email: 'dr.sharma@college.edu',
    role: 'teacher',
    subjects: ['CS301', 'CS204']
}));

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
    // Filter assignments based on teacher's subjects
    const teacherMeta = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    const mySubjects = teacherMeta.subjects || ['CS301', 'CS204'];

    const assignmentCards = document.querySelectorAll('.assignment-card');

    assignmentCards.forEach(card => {
        const subjectTag = card.querySelector('.subject-tag');
        if (subjectTag) {
            const subject = subjectTag.innerText.trim();
            if (!mySubjects.includes(subject)) {
                card.style.display = 'none';
            }
        }
    });

    // Load assignments data
    loadAssignmentsData();

    // Set up event listeners
    setupEventListeners();
});

function loadAssignmentsData() {
    // In a real implementation, this would fetch data from backend
    // For now, we'll use the static data in the HTML
    console.log('Loading assignments data...');
}

function setupEventListeners() {
    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Filter assignments based on status
            const filter = tab.dataset.filter;
            filterAssignments(filter);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchAssignments(searchTerm);
        });
    }
}

function filterAssignments(filter) {
    const cards = document.querySelectorAll('.assignment-card');

    cards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
        } else {
            // Check the status of the assignment
            const statusElement = card.querySelector('.status-active, .status-closed, .status-draft');
            if (statusElement) {
                const status = statusElement.classList.contains('status-active') ? 'active' :
                    statusElement.classList.contains('status-closed') ? 'closed' : 'draft';

                if (status === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        }
    });
}

function searchAssignments(searchTerm) {
    const cards = document.querySelectorAll('.assignment-card');

    cards.forEach(card => {
        const title = card.querySelector('.assignment-title h3').textContent.toLowerCase();
        const subject = card.querySelector('.subject-tag').textContent.toLowerCase();
        const description = card.querySelector('.assignment-description p').textContent.toLowerCase();

        if (title.includes(searchTerm) || subject.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Global functions for button clicks
function editAssignment(id) {
    alert(`Editing assignment with ID: ${id}`);
}

function deleteAssignment(id) {
    if (confirm(`Are you sure you want to close this assignment?`)) {
        // In a real implementation, this would make an API call
        alert(`Assignment ${id} closed`);
    }
}

function duplicateAssignment(id) {
    alert(`Duplicating assignment with ID: ${id}`);
}