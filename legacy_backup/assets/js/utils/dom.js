/**
 * Standardized render helper for loading, error, and empty states.
 * @param {HTMLElement} container - The DOM element to render into
 * @param {string} state - 'loading' | 'error' | 'empty' | 'content' (default)
 * @param {string} message - Optional message for error/empty states
 */
export const renderState = (container, state, message = '') => {
    if (!container) return;

    switch (state) {
        case 'loading':
            container.innerHTML = `
                <div class="skeleton-loader" style="padding: 20px;">
                    <div class="skeleton-line" style="height: 20px; width: 60%; background: rgba(255,255,255,0.1); margin-bottom: 10px; border-radius: 4px;"></div>
                    <div class="skeleton-line" style="height: 20px; width: 80%; background: rgba(255,255,255,0.1); margin-bottom: 10px; border-radius: 4px;"></div>
                    <div class="skeleton-line" style="height: 20px; width: 40%; background: rgba(255,255,255,0.1); border-radius: 4px;"></div>
                </div>`;
            break;

        case 'error':
            container.innerHTML = `
                <div class="state-message error" style="text-align: center; padding: 2rem; color: #ef4444;">
                    <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>${message || 'Something went wrong. Please try again.'}</p>
                </div>`;
            break;

        case 'empty':
            container.innerHTML = `
                <div class="state-message empty" style="text-align: center; padding: 2rem; color: #94a3b8;">
                    <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>${message || 'No items found.'}</p>
                </div>`;
            break;

        case 'content':
            container.innerHTML = ''; // Clear for content to be appended
            break;
    }
};

/**
 * Safe text content setter
 * @param {string} selector 
 * @param {string} text 
 * @param {HTMLElement} parent 
 */
export const setSafeText = (selector, text, parent = document) => {
    const el = parent.querySelector(selector);
    if (el) el.textContent = text;
};
