// teacher-dashboard.js
// Handles interaction for the teacher dashboard

document.addEventListener('DOMContentLoaded', () => {
    // Load Stats from Storage
    const stats = Storage.getStats();

    if (stats) {
        document.getElementById('statBatches').textContent = stats.activeBatches;
        document.getElementById('statReviews').textContent = stats.pendingReviews;
        document.getElementById('statStudents').textContent = stats.totalStudents;
    }
});

// (Keep existing code if any, or start fresh if duplicate logic exists)
// Original DOMContentLoaded might conflict, checking for separation...

// Set Teacher Session for Sidebar
sessionStorage.setItem('currentUser', JSON.stringify({
    id: 'CS_012',
    name: 'Dr. Sharma',
    email: 'dr.sharma@college.edu',
    role: 'teacher',
    subjects: ['CS301', 'CS204']
}));

// Get Current Teacher Subjects
const teacherMeta = JSON.parse(sessionStorage.getItem('currentUser'));
const mySubjects = teacherMeta.subjects || [];

console.log('Teacher Dashboard Loaded. Subjects:', mySubjects);

// Filter "My Classes" list
const classItems = document.querySelectorAll('.feed-item');
classItems.forEach(item => {
    const text = item.innerText;
    const matches = mySubjects.some(sub => text.includes(sub) || text.includes('Web Dev') || text.includes('DBMS'));
    if (!matches && !text.includes('Department Meeting')) {
        // item.style.display = 'none'; // Optional: hide irrelevant classes
    }
});

console.log('Teacher Dashboard Loaded');

// Add interactivity to Quick Action buttons
const quickActions = document.querySelectorAll('.quick-action-btn');
quickActions.forEach(btn => {
    btn.addEventListener('click', function () {
        const actionText = this.querySelector('span').innerText;

        if (actionText === 'Announce') {
            const msg = prompt("Enter announcement for CS301:");
            if (msg) alert("Announcement posted to student stream!");
        } else if (actionText === 'New Assn.') {
            window.location.href = 'assignments.html';
        } else {
            alert(`Action triggered: ${actionText} (Demo Only)`);
        }
    });
});

// Animate stats numbers on load
const statsNumbers = document.querySelectorAll('.t-stat-info h3');
statsNumbers.forEach(stat => {
    const finalValue = parseInt(stat.innerText);
    animateValue(stat, 0, finalValue, 1500);
});

// "Grade" button interaction
const gradeButtons = document.querySelectorAll('button[style*="color: #3b82f6"]');
gradeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.innerHTML = '<i class="fas fa-check"></i> Done';
        btn.style.color = '#10b981';
        btn.disabled = true;
    });
});
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}