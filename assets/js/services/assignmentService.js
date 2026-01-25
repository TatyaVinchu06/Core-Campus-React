import { assignments } from '../mock/assignments.js';
import { delay } from './_utils.js';

/**
 * Fetch all assignments
 * @returns {Promise<{data: Array, meta: Object}>}
 */
export const getAssignments = async () => {
    await delay();
    return {
        data: assignments,
        meta: {
            total: assignments.length,
            pending: assignments.filter(a => a.status === 'pending').length,
            submitted: assignments.filter(a => a.status === 'submitted').length
        }
    };
};

/**
 * Fetch a single assignment by ID
 * @param {string} id 
 * @returns {Promise<{data: Object}>}
 */
export const getAssignmentById = async (id) => {
    await delay();
    const assignment = assignments.find(a => a.id === id);

    if (!assignment) {
        throw new Error('ASSIGNMENT_NOT_FOUND');
    }

    return { data: assignment };
};
