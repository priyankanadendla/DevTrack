# DevTrack – Contribution Log

This log permanently records all completed development tasks, architectural milestones, code refactors, and test suites implemented in the DevTrack project.

---

## Log Entries

### [2026-11-06] Milestone 1: Initial Architecture & Monorepo Foundation
- **Tasks**: Foundation setup, Spring Boot 3.3 backend scaffolding, Vite React frontend, Docker Compose.
- **Backend**:
  - Implemented Spring Security with stateless JWT (HMAC-SHA256) authentication filter chain.
  - Implemented 7 JPA relational entity models: `User`, `JobApplication`, `CodingProblem`, `Skill`, `Project`, `DailyGoal`, `ActivityLog`.
  - Configured PostgreSQL 15 dialect and schema validation.
  - Configured in-memory H2 profile for automated unit and integration tests.
  - Created global exception handler with RFC 7807 structured HTTP error models.
  - Implemented BCrypt password hashing.
- **Database**:
  - Designed `database/init.sql` schema with UUID generation, foreign key constraints, `ON DELETE CASCADE`, composite B-tree performance indexes, and automatic `updated_at` trigger functions.
- **Frontend**:
  - Initialized React 18 + Vite SPA with modern Tailwind CSS styling.
  - Created unified layout with responsive sidebar navigation, mobile drawer overlay, and light/dark theme context.
  - Implemented Axios interceptors with automated Bearer token attachment and 401 redirect handling.
  - Built component library: Buttons, Modals, ConfirmDialogs, Badges, Input fields, StatCards, ProgressBars, EmptyStates, PageLoaders.

### [2026-11-06] Milestone 2–8: Full-Stack Application Modules Implementation
- **Dashboard Module (`/dashboard`)**:
  - Live metric aggregations (Problems solved, applications sent, skills tracked, projects, daily goals).
  - Interactive Recharts status pie chart and difficulty bar chart.
  - Real-time activity feed displaying recent accomplishments.
- **Job Application Tracker (`/jobs`)**:
  - Full CRUD operations with company, role, location, salary ranges, dates, URLs, and notes.
  - Stages: `APPLIED`, `ASSESSMENT`, `INTERVIEW`, `SELECTED`, `REJECTED`.
  - Search by company/role, status filtering, and pagination.
- **Coding Practice Tracker (`/coding`)**:
  - Problem logging with platform (LeetCode, HackerRank, etc.), language, topic, difficulty (`EASY`, `MEDIUM`, `HARD`), time/space complexity notes.
  - Statuses: `PENDING`, `SOLVED`, `REVISIT` with one-click status toggling.
- **Skills Matrix (`/skills`)**:
  - Technical inventory tracker with 0-100% proficiency sliders, years of experience, category tags, and primary focus stars.
  - Interactive Recharts Radar competency chart.
  - One-click "Seed Default Skills" functionality (Java, Spring Boot, React, SQL, etc.).
- **Project Manager (`/projects`)**:
  - Showcase full-stack projects with status (`PLANNING`, `IN_PROGRESS`, `COMPLETED`, `ON_HOLD`, `CANCELLED`), GitHub and live demo links, tech stack badges, and dates.
- **Daily Goals (`/goals`)**:
  - Target tracking with date picker, priority tiers (`LOW`, `MEDIUM`, `HIGH`), category tags, completion toggle, and progress bar percentage indicator.
- **Activity Calendar (`/calendar`)**:
  - GitHub-style 365-day contribution heatmap powered strictly by authentic DevTrack recorded activity logs.
  - Streak calculators: Current consecutive streak, longest historical streak, active days count.
  - Timestamped activity stream.
- **Reports & Data Export (`/reports`)**:
  - Executive summary tables for hiring funnel and DSA preparation progress.
  - CSV export for all 4 primary domains: Job Applications, Coding Problems, Skills Matrix, Daily Goals.
- **Profile & Settings (`/profile`, `/settings`)**:
  - Profile manager with avatar preview, professional bio, portfolio and GitHub links.
  - Dark/Light mode theme switcher.
  - System architecture specifications and keyboard shortcut cheatsheet.

---
*Maintained in accordance with genuine GitHub contribution rules.*
