/**
 * Formats an ISO date string to a readable locale string
 * @param {string} isoString 
 * @returns {string}
 */
export const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
};

/**
 * Checks if a deadline has passed
 * @param {string} deadlineIso 
 * @returns {boolean}
 */
export const isOverdue = (deadlineIso) => {
    if (!deadlineIso) return false;
    return new Date(deadlineIso) < new Date();
};

/**
 * Returns a relative time string (e.g., "2 hours ago")
 * @param {string} isoString 
 * @returns {string}
 */
export const getRelativeTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
};
