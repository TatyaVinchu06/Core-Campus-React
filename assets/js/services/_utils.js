import { CONFIG } from '../config.js';

/**
 * Simulates network delay based on global config
 * @param {number} ms - Optional override
 * @returns {Promise}
 */
export const delay = (ms = CONFIG.API_DELAY) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
