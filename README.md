# DevTrack – Smart Developer Growth & Job Tracker

A full-stack web application that helps developers track their coding practice, manage job applications, monitor technical skills, organize projects, and measure their daily learning progress — all in one place.

##  Overview

DevTrack is designed to help students and software developers organize their technical growth and career preparation.

Instead of maintaining separate spreadsheets and notes, users can manage their job search, coding progress, skills, projects, and daily goals through a centralized dashboard.

##  Features

###  Authentication & Security
- User registration and login
- JWT-based authentication
- Password encryption using BCrypt
- Protected API endpoints
- User profile management

###  Dashboard
- Overview of developer activities
- Job application statistics
- Coding practice progress
- Skills overview
- Recent activity tracking
- Interactive charts

###  Job Application Tracker
- Add, update, and delete job applications
- Track application status
- Search and filter applications
- Monitor job search progress

###  Coding Practice Tracker
- Track problems solved across coding platforms
- Record programming languages and topics
- Maintain difficulty levels and problem status
- Save problem URLs, notes, and time/space complexity

###  Skills Management
- Add and manage technical skills
- Track proficiency levels
- Organize skills by categories
- Identify areas for improvement

###  Project Management
- Maintain personal and professional projects
- Track technologies used
- Store GitHub and deployment links
- Update project progress

###  Daily Goals
- Create daily learning goals
- Set priorities
- Track completed and pending goals
- Monitor daily progress

###  Activity Tracking
- Activity calendar and heatmap
- Track actual application activities
- Monitor consistency over time

###  Reports
- View progress reports
- Export supported data as CSV
- Analyze learning and career progress

###  Profile & Settings
- Manage user profile
- Dark and light themes
- Application preferences

##  Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, JavaScript, Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| API Integration | Axios |
| Charts | Recharts |
| Backend | Java, Spring Boot 3.3.5 |
| Security | Spring Security, JWT, BCrypt |
| Database | PostgreSQL |
| ORM | Spring Data JPA, Hibernate |
| Testing | JUnit 5, Mockito, H2 |
| Build Tools | Maven, npm |
| Version Control | Git, GitHub |
| Containerization | Docker Compose |

##  Project Architecture

```text
DevTrack/
│
├── backend/
│   ├── src/main/java/com/devtrack/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── entity/
│   │   ├── exception/
│   │   ├── repository/
│   │   ├── security/
│   │   └── service/
│   │
│   ├── src/main/resources/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── package.json
│
├── database/
│   └── init.sql
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   ├── DEVELOPMENT_ROADMAP.md
│   └── CONTRIBUTION_LOG.md
│
├── docker-compose.yml
├── .env.example
├── CONTRIBUTING.md
└── README.md
```

##  Getting Started

### Prerequisites

Install the following before running the project:

- Java 21 or compatible supported JDK
- Maven
- Node.js and npm
- PostgreSQL or Docker Desktop with Docker Compose
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/priyankanadendla/DevTrack.git
```

```bash
cd DevTrack
```

### 2. Start PostgreSQL

From the project root:

```bash
docker compose up -d postgres
```

Configure the database credentials and environment variables according to `.env.example` and `backend/src/main/resources/application.yml`.

### 3. Run the Backend

Open a terminal:

```bash
cd backend
```

```bash
mvn spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

### 4. Run the Frontend

Open another terminal from the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

##  Testing

Run backend tests:

```bash
cd backend
mvn test
```

Build the frontend:

```bash
cd frontend
npm run build
```

##  Documentation

Additional project documentation is available in the `docs/` directory:

- [Architecture Documentation](docs/ARCHITECTURE.md)
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Development Roadmap](docs/DEVELOPMENT_ROADMAP.md)
- [Contribution Log](docs/CONTRIBUTION_LOG.md)

##  Future Improvements

- Email notifications and reminders
- Advanced coding analytics
- Resume and interview preparation tracker
- External job platform integrations
- Improved dashboard analytics
- Deployment and CI/CD automation

##  Contributing

Contributions and suggestions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Make meaningful changes.
4. Test your changes.
5. Commit and push your changes.
6. Open a Pull Request for review.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before contributing.

##  Author

**Priyanka Nadendla**

- GitHub: [@priyankanadendla](https://github.com/priyankanadendla)
- Project: [DevTrack](https://github.com/priyankanadendla/DevTrack)

---

 If you find this project useful, consider giving it a star!

**DevTrack – Track Your Progress. Build Your Skills. Grow Your Career.**
