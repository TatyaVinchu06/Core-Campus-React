/* assets/js/shared/file-handler.js */

const FileHandler = {
    initDropZone: function (dropZoneId, fileInputId, listId, callback) {
        const dropZone = document.getElementById(dropZoneId);
        const fileInput = document.getElementById(fileInputId);
        const fileList = document.getElementById(listId);

        if (!dropZone || !fileInput) return;

        // Click to browse
        dropZone.addEventListener('click', () => fileInput.click());

        // Drag Over
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
            dropZone.style.borderColor = '#3b82f6';
            dropZone.style.background = '#eff6ff';
        });

        // Drag Leave
        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            dropZone.style.borderColor = '#cbd5e1';
            dropZone.style.background = '#f8fafc';
        });

        // Drop
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            dropZone.style.borderColor = '#cbd5e1';
            dropZone.style.background = '#f8fafc';

            if (e.dataTransfer.files.length > 0) {
                this.handleFiles(e.dataTransfer.files, listId);
                if (callback) callback(e.dataTransfer.files);
            }
        });

        // Input Change
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFiles(e.target.files, listId);
                if (callback) callback(e.target.files);
            }
        });
    },

    handleFiles: function (files, listId) {
        const list = document.getElementById(listId);
        if (!list) return;

        Array.from(files).forEach(file => {
            // Validate size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert(`File ${file.name} is too large (Max 5MB)`);
                return;
            }

            const div = document.createElement('div');
            div.className = 'file-item';
            // Using inline style here temporarily, but ideal would be classes
            div.style.cssText = 'background: white; border: 1px solid #e2e8f0; padding: 0.75rem; border-radius: 6px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;';

            div.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-file-alt" style="color: #3b82f6;"></i>
                    <span style="font-size: 0.9rem; color: #0f172a;">${file.name}</span>
                    <span style="font-size: 0.75rem; color: #64748b;">(${(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <button type="button" onclick="this.parentElement.remove()" style="background: none; border: none; color: #ef4444; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            `;
            list.appendChild(div);
        });
    }
};

window.FileHandler = FileHandler;
