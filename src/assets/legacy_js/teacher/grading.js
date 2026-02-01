// teacher-grading.js
// Read-only editor + Grading Logic

// Mock Submission Data
const submissionFiles = {
    'Node.js': {
        language: 'javascript',
        content: `class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
module.exports = Node;`
    },
    'BinaryTree.js': {
        language: 'javascript',
        content: `const Node = require('./Node');

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    
    // TODO: Implement search
}
`
    }
};

// Override Mock Data for Web Dev Context if assignment is about it
if (window.location.search.includes('Web')) {
    // Replace with Web Dev Mock Data
    Object.keys(submissionFiles).forEach(key => delete submissionFiles[key]);

    submissionFiles['index.html'] = {
        language: 'html',
        content: `<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="card">
        <h1>Student Project</h1>
        <p>This is a graded submission.</p>
        <button id="btn">Test Interaction</button>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`
    };

    submissionFiles['style.css'] = {
        language: 'css',
        content: `body { font-family: sans-serif; background: #f8fafc; display: flex; justify-content: center; padding-top: 50px; }
.card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
h1 { color: #0f172a; }
button { background: #3b82f6; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }`
    };

    submissionFiles['script.js'] = {
        language: 'javascript',
        content: `document.getElementById('btn').addEventListener('click', () => {
    alert('Interaction working!');
});`
    };

    activeFileName = 'index.html';
}

let activeFileName = 'BinaryTree.js';
let editorInstance = null;

// --- INITIALIZE EDITOR ---
// Get URL Params for Student Name
const urlParams = new URLSearchParams(window.location.search);
const studentName = urlParams.get('student') || 'Aditya Kumar';
const assignTitle = urlParams.get('assign') || 'Binary Tree Implementation';

// Update UI with Student Data
document.querySelector('.student-name').innerText = studentName;
document.getElementById('assignTitle').innerText = assignTitle;
// Update Back Button Link to preserve assignment context
document.querySelector('.home-btn').onclick = () => {
    window.location.href = `submissions.html?assign=${encodeURIComponent(assignTitle)}`;
};

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' } });

require(['vs/editor/editor.main'], function () {
    // Create Editor
    editorInstance = monaco.editor.create(document.getElementById('monaco-editor-root'), {
        value: submissionFiles[activeFileName].content,
        language: submissionFiles[activeFileName].language,
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 14,
        readOnly: true, // Teachers review code, usually don't edit directly in this view
        minimap: { enabled: false }
    });

    renderFileTree();
    renderFileTree();
    renderTabs();

    // Auto-run if web dev
    if (submissionFiles['index.html']) {
        runCode();
    }
});

// --- UI RENDERING ---
function renderFileTree() {
    const tree = document.getElementById('fileTree');
    tree.innerHTML = '';

    Object.keys(submissionFiles).forEach(fileName => {
        const item = document.createElement('div');
        item.className = `file-item ${fileName === activeFileName ? 'active' : ''}`;

        let icon = 'fa-file-code';
        if (fileName.endsWith('.js')) icon = 'fa-js';

        item.innerHTML = `<i class="fab ${icon} file-icon"></i> ${fileName}`;
        item.onclick = () => switchFile(fileName);
        tree.appendChild(item);
    });
}

function renderTabs() {
    const bar = document.getElementById('tabBar');
    bar.innerHTML = `
        <div class="tab active">
            <i class="fab fa-js"></i> 
            ${activeFileName}
            <span class="tab-close" style="opacity:0">×</span> 
        </div>
    `;
}

// --- LOGIC ---
function switchFile(fileName) {
    activeFileName = fileName;
    editorInstance.setValue(submissionFiles[fileName].content);
    monaco.editor.setModelLanguage(editorInstance.getModel(), submissionFiles[fileName].language);
    renderFileTree();
    renderTabs();
}

// --- GRADING SUBMISSION ---
document.getElementById('submitGradeBtn').addEventListener('click', function () {
    const score = document.getElementById('scoreInput').value;
    const feedback = document.getElementById('feedbackInput').value;
    const btn = this;

    if (!score) {
        alert('Please enter a score.');
        return;
    }

    // Effect
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Submitting...';
    btn.disabled = true;

    setTimeout(() => {
        // In a real app, this sends data to backend
        alert(`Grade Submitted!\nScore: ${score}/100\nFeedback: ${feedback}`);
        window.location.href = 'assignments.html';
    }, 1500);
});

// Run Check Mock
document.getElementById('runBtn').addEventListener('click', runCode);

function runCode() {
    // If Web Dev project
    if (submissionFiles['index.html']) {
        const html = submissionFiles['index.html'].content;
        const css = submissionFiles['style.css'] ? submissionFiles['style.css'].content : '';
        const js = submissionFiles['script.js'] ? submissionFiles['script.js'].content : '';

        const combinedSource = `
            <html>
                <head>
                    <style>${css}</style>
                </head>
                <body>
                    ${html}
                    <script>${js}<\/script>
                </body>
            </html>
        `;

        const iframe = document.getElementById('previewFrame');
        if (iframe) iframe.srcdoc = combinedSource;

    } else {
        // Standard Console Output Mock
        alert('Running automated test cases...\n\n✅ Test 1: Insertion - Passed\n✅ Test 2: Order Validation - Passed\n❌ Test 3: Search - Failed (Not Implemented)');
    }
}
