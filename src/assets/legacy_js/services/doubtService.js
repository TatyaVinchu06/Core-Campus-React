import { doubts } from '../mock/doubts.js';
import { delay } from './_utils.js';

/**
 * Fetch all doubts
 * @returns {Promise<{data: Array, meta: Object}>}
 */
export const getDoubts = async () => {
    await delay();
    return {
        data: doubts,
        meta: {
            total: doubts.length
        }
    };
};

/**
 * Fetch details of a specific doubt
 * @param {string} id 
 * @returns {Promise<{data: Object}>}
 */
export const getDoubtById = async (id) => {
    await delay();
    const doubt = doubts.find(d => d.id === id);

    if (!doubt) {
        throw new Error('DOUBT_NOT_FOUND');
    }

    return { data: doubt };
};
