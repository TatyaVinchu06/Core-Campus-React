import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/student/workspace.css';

// Monaco Editor types
declare global {
    interface Window {
        monaco: any;
        require: any;
    }
}

interface FileData {
    language: string;
    content: string;
}

interface Files {
    [key: string]: FileData;
}

const StudentWorkspace: React.FC = () => {
    const navigate = useNavigate();
    const editorRef = useRef<HTMLDivElement>(null);
    const [editor, setEditor] = useState<any>(null);
    const [activeFile, setActiveFile] = useState('index.html');
    const [saveStatus, setSaveStatus] = useState('Saved');
    const [activeView, setActiveView] = useState<'preview' | 'terminal'>('preview');
    const [monacoLoaded, setMonacoLoaded] = useState(false);

    // EXACT MOCK DATA from legacy workspace.js
    const [files, setFiles] = useState<Files>({
        'index.html': {
            language: 'html',
            content: `<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Hello Campus!</h1>
        <p>Edit this text to see changes.</p>
        <button id="btn">Click Me</button>
    </div>
    <script src="script.js"></script>
</body>
</html>`
        },
        'style.css': {
            language: 'css',
            content: `body { 
    background: #f0f2f5; 
    font-family: sans-serif; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    height: 100vh; 
}
.container { 
    background: white; 
    padding: 2rem; 
    border-radius: 10px; 
    box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
    text-align: center;
}
h1 { color: #003366; }
button { 
    padding: 10px 20px; 
    background: #007acc; 
    color: white; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
}`
        },
        'script.js': {
            language: 'javascript',
            content: `document.getElementById('btn').addEventListener('click', () => {
    alert('Code Running Successfully!');
    console.log("Button clicked!");
});`
        }
    });

    // Initialize Monaco Editor
    useEffect(() => {
        // Check if Monaco is already loaded
        if (window.monaco) {
            initializeEditor();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/loader.min.js';
        script.async = true;
        script.onload = () => {
            window.require.config({
                paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' }
            });

            window.require(['vs/editor/editor.main'], function () {
                setMonacoLoaded(true);
                initializeEditor();
            });
        };
        document.body.appendChild(script);

        return () => {
            if (editor) {
                editor.dispose();
            }
        };
    }, []);

    const initializeEditor = () => {
        if (editorRef.current && !editor && window.monaco) {
            const editorInstance = window.monaco.editor.create(editorRef.current, {
                value: files['index.html'].content,
                language: 'html',
                theme: 'vs-dark',
                automaticLayout: true,
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                renderWhitespace: 'selection',
                tabSize: 2
            });

            editorInstance.onDidChangeModelContent(() => {
                const currentContent = editorInstance.getValue();
                setFiles(prev => ({
                    ...prev,
                    [activeFile]: { ...prev[activeFile], content: currentContent }
                }));
                setSaveStatus('Saving...');
                setTimeout(() => {
                    setSaveStatus('Saved');
                    // Auto-run on change
                    runCodePreview();
                }, 1000);
            });

            setEditor(editorInstance);

            // Initial run
            setTimeout(() => runCodePreview(), 500);
        }
    };

    // Switch file
    const switchFile = (fileName: string) => {
        if (editor && window.monaco) {
            setActiveFile(fileName);
            editor.setValue(files[fileName].content);
            window.monaco.editor.setModelLanguage(editor.getModel(), files[fileName].language);
        }
    };

    // Run code in preview
    const runCodePreview = () => {
        const html = files['index.html'].content;
        const css = files['style.css'].content;
        const js = files['script.js'].content;

        const combinedSource = `
            <!DOCTYPE html>
            <html>
                <head>
                    <style>${css}</style>
                </head>
                <body>
                    ${html.replace(/<script.*?<\/script>/gi, '')}
                    <script>${js}<\/script>
                </body>
            </html>
        `;

        const iframe = document.getElementById('previewFrame') as HTMLIFrameElement;
        if (iframe) {
            iframe.srcdoc = combinedSource;
        }
    };

    // Run code button handler
    const runCode = () => {
        runCodePreview();
    };

    const getFileIcon = (fileName: string) => {
        if (fileName.endsWith('.html')) return 'fa-html5';
        if (fileName.endsWith('.css')) return 'fa-css3-alt';
        if (fileName.endsWith('.js')) return 'fa-js';
        return 'fa-file';
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#1e1e1e', overflow: 'hidden' }}>
            {/* Header */}
            <header className="ide-header">
                <div className="left-controls">
                    <button className="home-btn" onClick={() => navigate('/student/assignments')}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className="assignment-info">
                        <span className="course-tag">CS302</span>
                        <h1>Web Development Project</h1>
                    </div>
                </div>

                <div className="center-controls">
                    <span className="save-status">
                        <i className={`fas ${saveStatus === 'Saved' ? 'fa-check-circle' : 'fa-circle-notch fa-spin'}`}></i> {saveStatus}
                    </span>
                </div>

                <div className="right-controls">
                    <button className="btn-secondary"><i className="fas fa-save"></i> Save</button>
                    <button className="btn-primary" onClick={runCode}><i className="fas fa-play"></i> Run Code</button>
                    <button className="btn-submit">Submit</button>
                </div>
            </header>

            {/* IDE Container */}
            <div className="ide-container">
                {/* File Explorer */}
                <aside className="file-explorer">
                    <div className="explorer-header">
                        <span>EXPLORER</span>
                        <div className="explorer-actions">
                            <i className="fas fa-folder-plus"></i>
                            <i className="fas fa-file-plus"></i>
                        </div>
                    </div>
                    <div className="file-tree">
                        {Object.keys(files).map(fileName => (
                            <div
                                key={fileName}
                                className={`file-item ${fileName === activeFile ? 'active' : ''}`}
                                onClick={() => switchFile(fileName)}
                            >
                                <i className={`fab ${getFileIcon(fileName)} file-icon`}></i> {fileName}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Editor */}
                <div className="editor-container">
                    <div className="tab-bar">
                        <div className="tab active">
                            <i className={`fab ${getFileIcon(activeFile)}`}></i> {activeFile}
                            <span className="tab-close">×</span>
                        </div>
                    </div>
                    <div ref={editorRef} id="monaco-editor-root" style={{ width: '100%', height: 'calc(100% - 35px)' }}></div>
                </div>

                {/* Preview/Terminal */}
                <div className="preview-container">
                    <div className="panel-header">
                        <div className="panel-tabs">
                            <button
                                className={`panel-tab ${activeView === 'preview' ? 'active' : ''}`}
                                onClick={() => { setActiveView('preview'); runCode(); }}
                            >
                                <i className="fas fa-globe"></i> Preview
                            </button>
                            <button
                                className={`panel-tab ${activeView === 'terminal' ? 'active' : ''}`}
                                onClick={() => setActiveView('terminal')}
                            >
                                <i className="fas fa-terminal"></i> Terminal
                            </button>
                        </div>
                        <button className="clear-btn"><i className="fas fa-ban"></i></button>
                    </div>

                    <div className={`panel-content ${activeView === 'preview' ? 'active' : ''}`} style={{ height: 'calc(100% - 35px)' }}>
                        <iframe id="previewFrame" title="Result" style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}></iframe>
                    </div>

                    <div className={`panel-content ${activeView === 'terminal' ? 'active' : ''}`} style={{ height: 'calc(100% - 35px)' }}>
                        <div className="terminal-output">
                            <span className="term-line system">&gt; Ready to execute...</span>
                            <span className="term-line success">Build Successful (20ms)</span>
                            <span className="term-line">&gt; [Log] Button clicked event listener attached.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentWorkspace;
