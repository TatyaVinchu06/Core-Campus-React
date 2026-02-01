/**
 * Format large numbers (e.g., 1200 -> 1.2k)
 * @param {number} num 
 * @returns {string}
 */
export const formatNumber = (num) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
};

/**
 * Capitalize first letter
 * @param {string} str 
 * @returns {string}
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};
