import { getAssignments } from '../services/assignmentService.js';
import { renderState, setSafeText } from '../utils/dom.js';
import { formatDate } from '../utils/date.js';

document.addEventListener('DOMContentLoaded', init);

let assignmentsData = []; // Store for filtering
let activeFilter = 'all';

async function init() {
    const assignmentsList = document.getElementById('assignmentsList');

    renderState(assignmentsList, 'loading');

    try {
        const response = await getAssignments();
        assignmentsData = response.data;
        renderAssignments();
    } catch (error) {
        console.error('Failed to load assignments:', error);
        renderState(assignmentsList, 'error', 'Failed to load assignments.');
    }

    setupFilters();
    setupSearch();
}

function renderAssignments() {
    const container = document.getElementById('assignmentsList');

    // 1. FILTERING logic
    // Mapping internal status to UI filter logic
    let filtered = assignmentsData.filter(a => {
        if (activeFilter === 'all') return true;

        // Map data status to filter keys
        if (activeFilter === 'pending') return a.status === 'pending';
        if (activeFilter === 'submitted') return a.status === 'submitted' || a.status === 'graded';
        if (activeFilter === 'overdue') return a.status === 'overdue';

        return true;
    });

    const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';
    if (searchQuery) {
        filtered = filtered.filter(a =>
            a.title.toLowerCase().includes(searchQuery) ||
            a.subject.toLowerCase().includes(searchQuery)
        );
    }

    // 2. GROUPING logic
    const groups = {
        overdue: [],
        dueSoon: [],
        upcoming: [],
        submitted: [],
        graded: []
    };

    const now = new Date();

    filtered.forEach(a => {
        // Simple logic mirroring original but cleaner
        if (a.status === 'graded') {
            groups.graded.push(a);
        } else if (a.status === 'submitted') {
            groups.submitted.push(a);
        } else if (a.status === 'overdue' || (new Date(a.deadline) < now && a.status !== 'submitted')) {
            // Catch explicit overdue status OR date check
            groups.overdue.push(a);
        } else {
            // Check if due soon (within 48 hours)
            const hoursLeft = (new Date(a.deadline) - now) / (1000 * 60 * 60);
            if (hoursLeft <= 48 && hoursLeft > 0) {
                groups.dueSoon.push(a);
            } else {
                groups.upcoming.push(a);
            }
        }
    });

    // 3. RENDER
    container.innerHTML = '';

    let hasItems = false;

    if (renderSection(container, '🔴 Overdue', groups.overdue, 'overdue')) hasItems = true;
    if (renderSection(container, '🟡 Due Soon', groups.dueSoon, 'duesoon')) hasItems = true;
    if (renderSection(container, 'Upcoming', groups.upcoming, 'normal')) hasItems = true;
    if (renderSection(container, '✅ Submitted', groups.submitted, 'submitted')) hasItems = true;
    if (renderSection(container, '⭐ Graded', groups.graded, 'graded')) hasItems = true;

    if (!hasItems) {
        renderState(container, 'empty', 'No assignments found matching criteria.');
    }
}

function renderSection(container, title, items, variant) {
    if (items.length === 0) return false;

    const section = document.createElement('div');
    section.className = `assignment-section section-${variant}`;
    section.innerHTML = `
        <div class="section-header">
            <h2>${title}</h2>
            <span class="count-badge">${items.length}</span>
        </div>
    `;

    items.forEach(item => {
        section.appendChild(createCard(item));
    });

    container.appendChild(section);
    return true;
}

function createCard(item) {
    const div = document.createElement('div');
    div.className = 'assignment-card';

    let btnConfig = { text: 'Start', class: 'btn-primary', icon: 'fa-play' };

    // Determine button state based on our simpler data model
    if (item.status === 'graded') {
        // Mock marks for graded
        const marks = item.marks || 18;
        const max = item.max || 20;
        btnConfig = { text: `${marks}/${max}`, class: 'btn-info', icon: 'fa-star' };
    } else if (item.status === 'overdue') {
        btnConfig = { text: 'Late Submit', class: 'btn-danger', icon: 'fa-exclamation' };
    } else if (item.status === 'submitted') {
        btnConfig = { text: 'View', class: 'btn-secondary', icon: 'fa-eye' };
    } else if (item.progress > 0) {
        btnConfig = { text: 'Continue', class: 'btn-primary', icon: 'fa-pen' };
    }

    const dueDisplay = formatDate(item.deadline);

    div.innerHTML = `
        <div class="card-left">
            <div class="card-header">
                <span class="subject-badge">${item.subject}</span>
                <span class="type-badge">Assignment</span>
            </div>
            <h3 class="card-title">${item.title}</h3>
            <div class="card-meta">
                <span>Due: ${dueDisplay}</span>
            </div>
        </div>
        <div class="card-action">
            <button class="btn ${btnConfig.class}" data-assignment-id="${item.id}">
                <i class="fas ${btnConfig.icon}"></i> ${btnConfig.text}
            </button>
        </div>
    `;

    // Add click handler to button
    const button = div.querySelector('button');
    if (button && item.status !== 'graded') {
        button.addEventListener('click', () => {
            // Redirect to workspace with assignment context
            window.location.href = `workspace.html?assignment=${item.id}&title=${encodeURIComponent(item.title)}`;
        });
    }

    return div;
}

function setupFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeFilter = tab.dataset.filter;
            renderAssignments();
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderAssignments();
        });
    }
}