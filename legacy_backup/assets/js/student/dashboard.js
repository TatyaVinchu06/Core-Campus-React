import { getAssignments } from '../services/assignmentService.js';
import { getFeed } from '../services/activityService.js';
import { getUser } from '../services/authService.js';
import { renderState, setSafeText } from '../utils/dom.js';
import { formatDate } from '../utils/date.js';

document.addEventListener('DOMContentLoaded', init);

async function init() {
    const statsRow = document.getElementById('stats-row');
    const deadlinesList = document.getElementById('deadlines-list');
    const feedContainer = document.getElementById('activity-feed');
    const greetingEl = document.getElementById('greeting');

    // Initial Loading State
    renderState(statsRow, 'loading');
    renderState(deadlinesList, 'loading');
    renderState(feedContainer, 'loading');

    try {
        // Parallel Fetch
        const [userRes, assignmentsRes, feedRes] = await Promise.all([
            getUser(),
            getAssignments(),
            getFeed()
        ]);

        const user = userRes.data;
        const assignments = assignmentsRes.data;
        const feed = feedRes.data;

        // Calculate stats dynamically from assignments
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const dynamicStats = {
            pendingAssignments: assignments.filter(a => a.status === 'pending' || a.status === 'overdue').length,
            completedThisWeek: assignments.filter(a => {
                if (a.status !== 'submitted' && a.status !== 'graded') return false;
                // For demo, assume all submitted/graded were done this week
                return true;
            }).length,
            upcomingEvents: feed.filter(f => f.type === 'event').length
        };

        // 1. Render User Info
        if (user && greetingEl) {
            greetingEl.textContent = `Welcome back, ${user.name.split(' ')[0]}!`;
        }

        // 2. Render Stats (using calculated stats)
        renderStats(statsRow, dynamicStats);

        // 3. Render Deadlines
        renderDeadlines(deadlinesList, assignments);

        // 4. Render Feed
        renderFeed(feedContainer, feed);

    } catch (error) {
        console.error('Initialization failed:', error);
        renderState(statsRow, 'error');
        renderState(deadlinesList, 'error', 'Failed to load deadlines');
        renderState(feedContainer, 'error', 'Failed to load feed');
    }

    setupInteractions();
}

function renderStats(container, stats) {
    if (!stats) {
        renderState(container, 'empty');
        return;
    }

    container.innerHTML = '';
    const statItems = [
        { label: 'Pending Assignments', value: stats.pendingAssignments, icon: 'fa-layer-group', color: 'blue' },
        { label: 'Completed This Week', value: stats.completedThisWeek, icon: 'fa-check-circle', color: 'green' },
        { label: 'Upcoming Events', value: stats.upcomingEvents, icon: 'fa-calendar-day', color: 'gold' }
    ];

    statItems.forEach(stat => {
        const div = document.createElement('div');
        div.className = 'stat-card';
        div.innerHTML = `
            <div class="icon-box ${stat.color}"><i class="fas ${stat.icon}"></i></div>
            <div class="stat-info">
                <h3>${stat.value}</h3>
                <p>${stat.label}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderDeadlines(container, assignments) {
    // Filter pending & sort by date
    const pending = assignments
        .filter(a => a.status === 'pending' || a.status === 'overdue')
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 3); // Show top 3

    if (pending.length === 0) {
        renderState(container, 'empty', 'No upcoming deadlines!');
        return;
    }

    container.innerHTML = '';
    pending.forEach(item => {
        const urgencyColor = item.urgency === 'high' ? 'red' : (item.urgency === 'medium' ? 'orange' : 'green');
        const displayDate = formatDate(item.deadline);

        const div = document.createElement('div');
        div.className = 'deadline-card';
        div.style.cursor = 'pointer';
        div.onclick = () => {
            window.location.href = `workspace.html?assignment=${item.id}&title=${encodeURIComponent(item.title)}`;
        };
        div.innerHTML = `
            <div class="task-icon"><i class="fas fa-laptop-code"></i></div>
            <div class="task-content">
                <h4>${item.title}</h4>
                <div class="task-meta">
                    <span><span class="urgency-dot ${urgencyColor}"></span> ${displayDate}</span>
                    <span>• ${item.subject}</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${item.progress}%; background: ${item.urgency === 'high' ? '#ef4444' : '#003366'}"></div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderFeed(container, feed) {
    if (!feed || feed.length === 0) {
        renderState(container, 'empty', 'No recent activity');
        return;
    }

    container.innerHTML = '';
    feed.forEach(item => {
        // Calculate relative time
        const now = new Date();
        const timestamp = new Date(item.timestamp);
        const diffMs = now - timestamp;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        let timeDisplay;
        if (diffMins < 60) {
            timeDisplay = `${diffMins} mins ago`;
        } else if (diffHours < 24) {
            timeDisplay = `${diffHours} hours ago`;
        } else if (diffDays === 1) {
            timeDisplay = 'Yesterday';
        } else {
            timeDisplay = `${diffDays} days ago`;
        }

        const div = document.createElement('div');
        div.className = 'feed-item';

        // Make notice and event items clickable
        if (item.type === 'notice' || item.type === 'event') {
            div.style.cursor = 'pointer';
            div.onclick = () => {
                // Redirect with notice ID so notices page can highlight it
                window.location.href = `notices.html?id=${item.id}`;
            };
        }

        div.innerHTML = `
            <div class="feed-icon"><i class="fas ${item.icon}"></i></div>
            <div class="feed-text">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <span class="time">${timeDisplay}</span>
            </div>
        `;
        container.appendChild(div);
    });
}

function setupInteractions() {
    // Notifications
    const notifBell = document.getElementById('notifBell');
    const notifDropdown = document.getElementById('notifDropdown');

    if (notifBell && notifDropdown) {
        notifBell.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!notifDropdown.contains(e.target) && !notifBell.contains(e.target)) {
                notifDropdown.classList.remove('active');
            }
        });
    }

    // Logout
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to logout?")) {
                window.location.href = '../login.html';
            }
        });
    }
}