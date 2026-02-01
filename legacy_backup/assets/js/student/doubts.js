import { getDoubts } from '../services/doubtService.js';
import { renderState, setSafeText } from '../utils/dom.js';

document.addEventListener('DOMContentLoaded', init);

let doubtsData = [];
let activeFilter = 'all';

async function init() {
    const doubtsList = document.getElementById('doubtsList');
    renderState(doubtsList, 'loading');

    try {
        const response = await getDoubts();
        doubtsData = response.data;
        renderDoubts();
    } catch (error) {
        console.error('Failed to load doubts:', error);
        renderState(doubtsList, 'error', 'Failed to load doubts.');
    }

    setupFilters();
    setupModals();
}

function renderDoubts() {
    const container = document.getElementById('doubtsList');

    // Filtering Logic
    let filtered = doubtsData;
    if (activeFilter === 'unanswered') filtered = doubtsData.filter(d => d.answersCount === 0);
    // Note: 'resolved' isn't explicitly in my mock data but I'll add logic or fallback
    // Assuming 'resolved' usually means accepted answer exists in comments
    if (activeFilter === 'resolved') {
        filtered = doubtsData.filter(d => d.comments && d.comments.some(c => c.accepted));
    }

    if (filtered.length === 0) {
        renderState(container, 'empty', 'No doubts found.');
        return;
    }

    container.innerHTML = '';
    filtered.forEach(d => {
        const isResolved = d.comments && d.comments.some(c => c.accepted);
        const card = document.createElement('div');
        card.className = 'doubt-card';
        card.innerHTML = `
            <div class="vote-box">
                <span class="vote-count">${d.votes}</span>
                <span class="vote-label">Votes</span>
                ${isResolved ? '<i class="fas fa-check-circle" style="color:#10b981; margin-top:5px; font-size:1.2rem;"></i>' : ''}
            </div>
            <div class="doubt-main">
                <div class="doubt-title">${d.title}</div>
                <div class="doubt-desc">${d.desc}</div>
                <div class="tags-row">
                    ${d.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('')}
                </div>
            </div>
        `;
        card.onclick = () => openDetail(d);
        container.appendChild(card);
    });
}

function setupFilters() {
    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            renderDoubts();
        });
    });
}

// --- DETAIL VIEW LOGIC ---
function openDetail(d) {
    const overlay = document.getElementById('detailOverlay');
    const detailContent = document.getElementById('detailContent');

    if (!overlay || !detailContent) return;

    // 1. Generate Answers
    const answersHTML = (d.comments || []).map(c => `
        <div class="answer-item ${c.accepted ? 'accepted' : ''}">
            <div class="big-vote-box">
                <button class="vote-btn"><i class="fas fa-caret-up"></i></button>
                <span class="big-score">${c.accepted ? 5 : 1}</span>
                <button class="vote-btn"><i class="fas fa-caret-down"></i></button>
                ${c.accepted ? '<i class="fas fa-check" style="color:#10b981; font-size:1.5rem; margin-top:10px;"></i>' : ''}
            </div>
            
            <div class="answer-content" style="flex:1;">
                ${c.accepted ? '<div class="accepted-badge"><i class="fas fa-check-circle"></i> Accepted Solution</div>' : ''}
                
                <div style="font-size:1rem; line-height:1.6; color:#334155; margin-bottom:1.5rem; white-space: pre-wrap;">${c.text}</div>
                
                <div class="user-signature">
                    <span class="asked-time">Answered by ${c.author}</span>
                    <div class="user-row">
                        <div class="user-avatar" style="background:${c.accepted ? '#10b981' : '#64748b'}">${c.author.charAt(0)}</div>
                        <div>
                            <span class="user-name" style="color:${c.accepted ? '#047857' : '#334155'}">${c.author}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // 2. Generate Full Layout
    detailContent.innerHTML = `
        <div class="question-section">
            <div class="big-vote-box">
                <button class="vote-btn"><i class="fas fa-caret-up"></i></button>
                <span class="big-score">${d.votes}</span>
                <button class="vote-btn"><i class="fas fa-caret-down"></i></button>
                <button style="border:none; background:none; color:#cbd5e1; margin-top:10px;"><i class="fas fa-star"></i></button>
            </div>
            
            <div style="flex:1;">
                <h1 class="q-title-lg">${d.title}</h1>
                <div class="tags-row" style="margin-bottom:1.5rem;">
                    ${d.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('')}
                </div>
                
                <div class="q-text-lg">${d.desc}</div>

                <div class="user-signature" style="background:#e0f2fe; border-color:#bae6fd;">
                    <span class="asked-time">Asked ${d.time}</span>
                    <div class="user-row">
                        <div class="user-avatar" style="background:#0284c7;">${d.author.charAt(0)}</div>
                        <div>
                            <span class="user-name" style="color:#0284c7;">${d.author}</span>
                            <span class="user-role">Student</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <h3 class="answers-header">${d.comments ? d.comments.length : 0} Answers</h3>
        ${answersHTML}

        <div class="reply-section">
            <h4 style="margin-bottom:15px; color:#0f172a; font-size:1.1rem;">Your Answer</h4>
            
            <div class="editor-container">
                <div class="editor-toolbar">
                    <i class="fas fa-bold" title="Bold"></i>
                    <i class="fas fa-italic" title="Italic"></i>
                    <i class="fas fa-link" title="Link"></i>
                    <i class="fas fa-code" title="Code Block"></i>
                    <i class="fas fa-list-ul" title="List"></i>
                    <i class="fas fa-image" title="Image"></i>
                </div>
                <textarea class="reply-textarea" placeholder="Type your detailed solution here... Use Markdown for code blocks."></textarea>
            </div>
            
            <button class="post-btn">Post Your Answer</button>
        </div>
    `;

    overlay.classList.add('active');

    // Close logic
    const closeBtn = document.getElementById('closeDetail');
    if (closeBtn) {
        closeBtn.onclick = () => overlay.classList.remove('active');
    }
}

function setupModals() {
    const askModal = document.getElementById('askModal');
    const askBtn = document.getElementById('askBtn');

    if (askModal && askBtn) {
        askBtn.onclick = () => askModal.classList.add('active');
        document.querySelectorAll('.close-modal').forEach(b => b.onclick = () => askModal.classList.remove('active'));
    }
}