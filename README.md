    # 🎓 CORE Campus

    CORE Campus is a modern, responsive web-based Learning Management System (LMS) prototype designed to streamline interaction between students and faculty. It features a clean, unified interface for managing assignments, resources, classes, and doubts.

    ## 🚀 Features

    ### For Students
    - **Dashboard**: View upcoming deadlines, notifications, and daily schedule.
    - **Assignments**: Submit work, check grades, and view feedback.
    - **Resources**: Access study materials (PDFs, Videos, Links) organized by subject/unit.
    - **Doubts**: Ask questions and get answers from faculty or peers.
    - **Workspace**: A dedicated area for focused study.

    ### For Teachers
    - **Faculty Dashboard**: Overview of active batches, pending reviews, and schedule.
    - **Class Management**: specific views for each class (e.g., DBMS, DAA) with stream/announcements.
    - **Assignment Management**: Create, edit, and grade assignments with file upload support.
    - **Student Tracking**: Monitor student progress and submissions.

    ## 🛠️ Technology Stack
    - **Frontend**: HTML5, CSS3 (Modular & Utility-based), Vanilla JavaScript (ES6+).
    - **Styling**: Custom CSS architecture with shared utilities (`utilities.css`) and component-based styles (`tables.css`, `profile.css`).
    - **Icons**: FontAwesome 6.
    - **Fonts**: Inter & Outfit (Google Fonts).

    ## 📂 Project Structure

    ```
    core-campus/
    ├── assets/
    │   ├── css/
    │   │   ├── components/   # specialized styles (tables, profile)
    │   │   ├── shared/       # global utilities & variables
    │   │   ├── student/      # student-view specific styles
    │   │   └── teacher/      # teacher-view specific styles
    │   └── js/
    │       ├── shared/       # SearchUtils, FileHandler, Storage logic
    │       ├── student/      # Student interactions
    │       └── teacher/      # Teacher interactions
    ├── config/
    │   └── credentials.js    # Mock login credentials configuration
    ├── views/
    │   ├── student/          # Student HTML pages (dashboard, resources, etc.)
    │   └── teacher/          # Teacher HTML pages (dashboard, assignments, etc.)
    └── index.html            # Landing / Login Entry point
    ```

    ## ⚡ Recent Improvements
    - **Modular CSS**: Transformed monolithic CSS into maintainable modules, removing inline styles for cleaner code.
    - **Smart Search**: Integrated client-side search functionality across dashboards.
    - **Drag & Drop Uploads**: Added intuitive file upload interfaces for resources and assignments.

    ## 🏁 Getting Started

    1.  **Clone/Download** the repository.
    2.  Open `index.html` in your browser.
    3.  **Login Credentials** (Mock):
        *   **Student**: `student` / `student123`
        *   **Teacher**: `teacher` / `teacher123`
        *(See `config/credentials.js` for more)*

    ## 🔮 Future Roadmap
    - [ ] Backend integration (Node.js/Python).
    - [ ] Real-time Socket.io messaging.
    - [ ] Database implementation (MongoDB/SQL).