/**
 * storage.js
 * Handles local persistence for the application using localStorage.
 * Seeds default data if empty.
 */

const Storage = {
    // Keys
    KEYS: {
        STATS: 'core_campus_stats',
        STUDENTS: 'core_campus_students',
        ASSIGNMENTS: 'core_campus_assignments',
        SUBMISSIONS: 'core_campus_submissions'
    },

    // Default Seed Data
    defaults: {
        stats: {
            activeBatches: 3,
            pendingReviews: 18,
            totalStudents: 142,
            submittedCount: 18,
            totalCount: 32
        },
        // We can expand this later for full student lists etc.
    },

    init() {
        if (!localStorage.getItem(this.KEYS.STATS)) {
            console.log("Seeding default stats...");
            localStorage.setItem(this.KEYS.STATS, JSON.stringify(this.defaults.stats));
        }
    },

    getStats() {
        this.init(); // Ensure data exists
        return JSON.parse(localStorage.getItem(this.KEYS.STATS));
    },

    updateStats(newStats) {
        const current = this.getStats();
        const updated = { ...current, ...newStats };
        localStorage.setItem(this.KEYS.STATS, JSON.stringify(updated));
        return updated;
    }
};

// Auto-init on load
Storage.init();
