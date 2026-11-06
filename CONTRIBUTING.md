# Contributing to DevTrack

Thank you for your interest in contributing to **DevTrack – Smart Developer Growth & Job Tracker**! DevTrack is built to empower software engineers to track their daily coding habits, technical skills, project milestones, and tech job applications with genuine metrics.

---

## 1. Code of Conduct

All contributors and maintainers are expected to maintain a welcoming, respectful, and constructive environment. Harassment, condescending behavior, or abusive language will not be tolerated.

---

## 2. Genuine Contribution Principles

DevTrack follows strict authentic development rules:
- **No Artificial Commits**: Never generate fake commits, artificially backdate Git timestamps, or create empty commits.
- **Atomic, Meaningful Changes**: Every commit must represent actual, reviewable, working code, unit tests, bug fixes, or documentation updates.
- **Quality Over Quantity**: Focus on clean architecture, reusability, test coverage, and responsive UX design.
- **Test Before Submitting**: Ensure both backend tests (`mvn test`) and frontend builds (`npm run build`) pass before creating a pull request.

---

## 3. Getting Started

### Prerequisites
- Java JDK 21+ (or JDK 24)
- Apache Maven 3.9+
- Node.js 18+ (Node 22 LTS recommended) & npm 10+
- Docker & Docker Compose (for PostgreSQL)
- Git

### Local Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/devtrack.git
   cd devtrack
   ```

2. **Start the database**:
   ```bash
   docker compose up -d postgres
   ```

3. **Run the backend**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

4. **Run the frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

5. Open your browser at `http://localhost:5173`.

---

## 4. Development Workflow & Git Standards

### Branch Naming Conventions
Follow standardized branch conventions:
- `feature/dt-XXX-short-description` (e.g. `feature/dt-023-jobs-kanban-view`)
- `bugfix/dt-XXX-short-description` (e.g. `bugfix/dt-012-chart-resize-glitch`)
- `test/dt-XXX-short-description` (e.g. `test/dt-010-auth-service-tests`)
- `docs/dt-XXX-short-description` (e.g. `docs/dt-098-postman-collection`)

### Commit Message Standard (Conventional Commits)
Format your commit messages as:
```
<type>(<scope>): <short imperative summary>

[optional body explaining rationale]
```
Common types:
- `feat`: New feature or user capability
- `fix`: Bug fix
- `test`: Adding or updating test suites
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance enhancement
- `docs`: Documentation updates
- `chore`: Build or dependency maintenance

*Examples:*
- `feat(jobs): add multi-currency compensation range selector`
- `fix(auth): correct token expiration date comparison`
- `test(coding): add unit tests for SpacedRepetitionService`

---

## 5. Pull Request Process

1. Reference the relevant Task ID from `docs/DEVELOPMENT_ROADMAP.md` in your PR title.
2. Provide a clear description of the problem solved and acceptance criteria met.
3. Attach screenshots or GIFs for any UI changes.
4. Verify all tests pass locally:
   - Backend: `cd backend && mvn test`
   - Frontend: `cd frontend && npx vite build`
5. Update `docs/CONTRIBUTION_LOG.md` with your completed work.
6. Request a code review from a maintainer.

---

## 6. Architecture & Code Style Guidelines

- **Java Backend**:
  - Follow standard Java naming conventions (CamelCase for classes, lowerCamelCase for methods/variables).
  - Use constructor injection instead of field injection.
  - Keep entities in `entity`, business logic in `service`, endpoints in `controller`, and data transfer objects in `dto`.
  - Handle errors via `@RestControllerAdvice` and RFC 7807 structured exceptions.
- **React Frontend**:
  - Use functional components and React Hooks.
  - Organize reusable UI primitives into `components/ui`.
  - Style exclusively with Tailwind CSS utility classes.
  - Maintain both Dark Mode and Light Mode readability.
