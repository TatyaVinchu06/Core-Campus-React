# CORE Campus | React + TypeScript

> **The Operating System for College Engineering**
> A unified workspace where code meets campus. Manage assignments, debug logic, and collaborate faster.

## 🚀 Overview

This repository contains the **React + TypeScript** implementation of the CORE Campus platform. It has been successfully migrated from a legacy static site to a modern Single Page Application (SPA) using Vite.

### Key Features
- **Role-Based Access**: Dedicated Dashboards for Students and Teachers.
- **Modern UI/UX**: Premium aesthetic with glassmorphism, smooth animations, and responsive design.
- **Interactive Login**: Featuring the signature animated Owl Mascot that tracks mouse movement.
- **Component Architecture**: Reusable layouts, sidebars, and top navigation bars.

## 🛠️ Tech Stack
- **Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Native CSS (Modular & Scalable)
- **Routing**: [React Router](https://reactrouter.com/)

## 📂 Project Structure

```text
src/
├── assets/         # Global styles (CSS) and static assets
├── components/     # Reusable UI components
│   └── layout/     # App shell (Sidebar, TopBar)
├── context/        # Global state (Auth, Theme)
├── pages/          # Application views
│   ├── auth/       # Login/Signup
│   ├── student/    # Student-specific pages
│   └── teacher/    # Teacher-specific pages
├── services/       # API integration & Business logic
└── types/          # TypeScript definitions
```

## ⚡ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TatyaVinchu06/Core-Campus-React.git
   cd Core-Campus-React
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`.

## 🏗️ Building for Production

To generate a production-ready build:
```bash
npm run build
```
The output will be in the `dist/` directory.

---

<footer style="text-align: center; margin-top: 50px; color: #64748b;">
    <p>&copy; 2026 Core Campus. All rights reserved.</p>
</footer>