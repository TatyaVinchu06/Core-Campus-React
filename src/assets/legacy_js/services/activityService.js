import { activities } from '../mock/activities.js';
import { delay } from './_utils.js';

/**
 * Fetch activity feed
 * @returns {Promise<{data: Array, meta: Object}>}
 */
export const getFeed = async () => {
    await delay();
    return {
        data: activities,
        meta: {
            total: activities.length
        }
    };
};
