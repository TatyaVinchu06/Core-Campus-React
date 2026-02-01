import { user } from '../mock/user.js';
import { delay } from './_utils.js';

/**
 * Fetch current user profile
 * @returns {Promise<{data: Object}>}
 */
export const getUser = async () => {
    await delay(500); // Slightly faster than full API delay for user feeling
    return {
        data: user
    };
};
