// Credentials configuration file
const credentials = {
  students: [
    {
      id: "student123",
      email: "student@college.edu",
      password: "core123",
      name: "Student User"
    }
  ],
  teachers: [
    {
      id: "teacher123",
      email: "teacher@college.edu",
      password: "teach123",
      name: "Teacher User"
    }
  ]
};

// Export for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = credentials;
}