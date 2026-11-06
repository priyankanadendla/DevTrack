# DevTrack – Smart Developer Growth & Job Tracker

[![Spring Boot 3.3](https://img.shields.io/badge/Spring%20Boot-3.3.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React 18](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg)](https://vitejs.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791.svg)](https://www.postgresql.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**DevTrack** is a commercial-grade developer productivity and career tracking web platform designed to streamline tech job hunting, algorithm challenge consistency, technical skill mastery, and software portfolio management.

---

## 🌟 Key Application Modules

### 1. 🔐 Authentication & Profile Management
- Secure user registration and login with BCrypt password hashing.
- Stateless JWT (HMAC-SHA256) bearer token authentication with auto-refresh interceptors.
- Protected client-side routing and automatic session expiry redirect.
- Profile management with avatar image, professional bio, GitHub, LinkedIn, and portfolio links.

### 2. 📊 Live Statistics Dashboard
- Real-time KPI summary cards: Total Coding Challenges, Active Applications, Projects Built, Skills Matrix, Daily Goals Completed.
- Interactive Recharts donut chart for Job Pipeline Stages.
- Interactive Bar chart for Problem Difficulty distribution (Easy, Medium, Hard).
- Real-time Activity Feed tracking latest accomplishments.

### 3. 💼 Job Application Tracker (`/jobs`)
- Full lifecycle management across hiring stages: `APPLIED`, `ASSESSMENT`, `INTERVIEW`, `SELECTED`, `REJECTED`.
- Tracks company name, job role, location (Remote/Onsite), application date, salary range ($), job description, listing URL, recruiter contacts, and private notes.
- Real-time keyword search, status dropdown filtering, and server-side pagination.
- Add, Edit, and Delete modal workflows with confirmation dialogs.

### 4. 💻 Coding Practice Tracker (`/coding`)
- Track algorithmic problems across LeetCode, HackerRank, Codeforces, NeetCode, etc.
- Log programming language, algorithmic topic, difficulty (`EASY`, `MEDIUM`, `HARD`), time complexity (Big-O), space complexity, solution notes, and URL.
- One-click status toggling (`SOLVED`, `PENDING`, `REVISIT`).
- Filter by difficulty, platform, status, and search keywords.

### 5. ⚡ Developer Skills Matrix (`/skills`)
- Track competencies (Java, Python, SQL, React, Spring Boot, PostgreSQL, Docker, Git, etc.).
- Interactive 0–100% proficiency sliders, years of experience, category categorization, and primary focus stars.
- Interactive **Competency Radar Chart** mapping strengths across technical categories.
- One-click "Seed Standard Skills" button to immediately populate industry defaults.

### 6. 📁 Project Manager (`/projects`)
- Document and showcase software portfolio projects.
- Tracks project title, description, technology stack tags, live deployment URL, GitHub repository URL, start and completion dates.
- Statuses: `PLANNING`, `IN_PROGRESS`, `COMPLETED`, `ON_HOLD`, `CANCELLED`.

### 7. 🎯 Daily Goals & Accountability (`/goals`)
- Scheduled daily goals with date picker, deadline timestamp, priority tier (`LOW`, `MEDIUM`, `HIGH`), and category tags.
- Interactive checkbox completion toggle triggering real-time activity log records.
- Live progress bar showing daily completion percentage.

### 8. 📅 365-Day Activity Heatmap (`/calendar`)
- GitHub-style contribution calendar strictly reflecting **genuine, recorded activities** inside DevTrack.
- No fabricated data. Each square represents verified daily submissions, solved problems, and completed goals.
- Metrics: Current streak, Longest streak, Total activities, Active days count.
- Interactive square hover tooltips with detailed activity stream breakdown.

### 9. 📈 Reports & Data Export (`/reports`)
- Executive summary breakdowns for hiring pipelines and DSA preparation.
- One-click **CSV Export** for all 4 primary domains:
  - `devtrack_job_applications.csv`
  - `devtrack_coding_problems.csv`
  - `devtrack_skills.csv`
  - `devtrack_goals.csv`

### 10. ⚙️ Settings & System Architecture (`/settings`)
- Light Mode / Dark Mode toggle with instant theme application and persistence.
- Account and security specifications.
- Quick navigation keyboard shortcuts cheatsheet.
- System micro-specifications display.

---

## 🛠️ Technology Stack

| Component | Technology | Version | Description |
|---|---|---|---|
| **Frontend Framework** | React.js | 18.x | Declarative UI library |
| **Build Tool** | Vite | 8.x | High-performance frontend bundler |
| **CSS Framework** | Tailwind CSS | 3.4.x | Utility-first responsive styling |
| **Data Visualization** | Recharts | 3.x | SVG charting library |
| **Icons** | Lucide React | 1.x | Modern UI iconography |
| **HTTP Client** | Axios | 1.x | Promise-based client with interceptors |
| **Routing** | React Router DOM | 7.x | Client-side SPA routing |
| **Backend Framework** | Spring Boot | 3.3.5 | Production-grade Java backend |
| **Language** | Java | 21 / 24 | Modern Java platform |
| **ORM / Data Access** | Spring Data JPA / Hibernate | 6.5.x | Relational mapping & repositories |
| **Security** | Spring Security & JJWT | 6.x / 0.12.6 | Stateless JWT authentication |
| **Database** | PostgreSQL | 15 (Alpine) | Production relational database |
| **Testing** | JUnit 5, AssertJ, H2 Database | Latest | Unit & integration testing |
| **Containerization** | Docker Compose | 3.8 | Multi-service local orchestration |

---

## 📂 Monorepo Project Structure

```
Devtrack/
├── .env.example                 # Root environment template
├── .gitignore                   # Git ignore specifications
├── docker-compose.yml           # PostgreSQL container service definition
├── CONTRIBUTING.md              # Contribution standards & Git guidelines
├── README.md                    # Project documentation
│
├── database/
│   └── init.sql                 # DDL migration script with triggers & indexes
│
├── backend/
│   ├── pom.xml                  # Maven dependencies & build configuration
│   └── src/
│       ├── main/
│       │   ├── java/com/devtrack/
│       │   │   ├── DevTrackApplication.java
│       │   │   ├── config/      # SecurityConfig, JpaConfig
│       │   │   ├── controller/  # 7 REST Controllers (Auth, Jobs, Coding, etc.)
│       │   │   ├── dto/         # Request & Response DTOs
│       │   │   ├── entity/      # 7 JPA Entities (User, JobApplication, etc.)
│       │   │   ├── exception/   # GlobalExceptionHandler, Custom Exceptions
│       │   │   ├── repository/  # Spring Data JPA Repositories
│       │   │   ├── security/    # JwtUtils, JwtFilter, UserPrincipal
│       │   │   └── service/     # Business logic & transactional services
│       │   └── resources/
│       │       ├── application.yml      # Base PostgreSQL configuration
│       │       └── application-test.yml # In-memory H2 test profile
│       └── test/
│           └── java/com/devtrack/
│               └── DevTrackApplicationTests.java # 7 automated test suites
│
├── frontend/
│   ├── index.html               # SPA Entrypoint HTML
│   ├── package.json             # NPM dependencies & scripts
│   ├── vite.config.js           # Vite configuration & server port
│   ├── tailwind.config.js       # Dark mode & custom theme tokens
│   ├── postcss.config.js        # PostCSS plugins
│   └── src/
│       ├── main.jsx             # React DOM root render
│       ├── App.jsx              # Router & Route declarations
│       ├── index.css            # Tailwind directives & component styles
│       ├── api/                 # Axios instance & service clients
│       ├── components/          # Layout, Sidebar, UI primitives
│       ├── context/             # AuthContext, ThemeContext
│       └── pages/               # 12 Full-featured SaaS pages
│
└── docs/
    ├── ARCHITECTURE.md          # System & security architecture specs
    ├── API_DOCUMENTATION.md     # Complete REST API reference
    ├── DATABASE_SCHEMA.md       # Relational entity & index documentation
    ├── DEVELOPMENT_ROADMAP.md   # 100+ granular development tasks
    └── CONTRIBUTION_LOG.md      # Record of implemented milestones
```

---

## 🚀 Quickstart Local Setup

### 1. Prerequisites
- **Node.js** (v18+ or v22 LTS) & **npm** (v10+)
- **Java JDK** (21 or 24)
- **Apache Maven** (3.9+)
- **Docker Desktop** (for PostgreSQL)

---

### 2. Start PostgreSQL Database
DevTrack includes a pre-configured Docker Compose file that spins up PostgreSQL 15 and initializes all tables and triggers automatically from `database/init.sql`.

```bash
# From project root
docker compose up -d postgres
```

Verify the container is healthy:
```bash
docker ps
```

---

### 3. Run the Backend API
```bash
cd backend
mvn spring-boot:run
```
The REST API will boot at `http://localhost:8080`.

To run the automated test suite:
```bash
mvn test
```

---

### 4. Run the React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your web browser.

---

## 🧪 Testing & Verification

### Backend Automated Tests
DevTrack includes Spring Boot `@SpringBootTest` suites verifying:
1. Spring application context loads cleanly.
2. User creation and password hashing.
3. Job application persistence and user isolation.
4. Coding problem creation and status tracking.
5. Skill matrix creation and duplicate prevention.
6. Portfolio project management.
7. Daily goal completion workflow.

```bash
cd backend
mvn test
```
*Result: 7 tests run, 0 failures, 0 errors.*

### Frontend Production Build
Verify that the React code bundles cleanly with zero warnings or syntax errors:
```bash
cd frontend
npx vite build
```
*Result: Assets bundled into `dist/` with gzip optimization.*

---

## 🗺️ 100+ Genuine Development Roadmap

To support long-term continuous development and building a genuine GitHub contribution history, DevTrack comes with an extensive roadmap containing **100 independent, reviewable tasks** across 10 milestones:

- **Milestone 1**: Project Setup and Authentication (Tasks 1–10)
- **Milestone 2**: Dashboard and UI Improvements (Tasks 11–20)
- **Milestone 3**: Job Application Management (Tasks 21–30)
- **Milestone 4**: Coding Practice Management (Tasks 31–40)
- **Milestone 5**: Skills Management (Tasks 41–50)
- **Milestone 6**: Project Management (Tasks 51–60)
- **Milestone 7**: Daily Goals and Calendar (Tasks 61–70)
- **Milestone 8**: Reports and Analytics (Tasks 71–80)
- **Milestone 9**: Security and Performance (Tasks 81–90)
- **Milestone 10**: Testing, Deployment and Documentation (Tasks 91–100)

Detailed specifications with Task IDs, file changes, acceptance criteria, branch names, commit messages, and PR titles are available in [`docs/DEVELOPMENT_ROADMAP.md`](docs/DEVELOPMENT_ROADMAP.md).

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
