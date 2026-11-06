# DevTrack – System Architecture & Technical Specifications

DevTrack is built using Clean Layered Architecture on the backend and Component-Driven State Architecture on the frontend.

---

## 1. High-Level Architecture Overview

```
 +---------------------------------------------------------+
 |                 Client Layer (Browser)                  |
 |  React 18 + Vite SPA, Tailwind CSS, Recharts, Contexts  |
 +---------------------------------------------------------+
                             |
                      HTTPS / JSON REST
                             |
 +---------------------------------------------------------+
 |             Security & Gateway Layer (Spring Boot)       |
 |  CORS Filter -> JWT Auth Filter -> SecurityFilterChain  |
 +---------------------------------------------------------+
                             |
 +---------------------------------------------------------+
 |                     Controller Layer                    |
 | AuthController | DashboardController | JobController... |
 +---------------------------------------------------------+
                             |
 +---------------------------------------------------------+
 |                      Service Layer                      |
 |  AuthService | JobApplicationService | DailyGoalService |
 |         (Business Logic, Transaction Management)        |
 +---------------------------------------------------------+
                             |
 +---------------------------------------------------------+
 |               Data Access Layer (Spring Data JPA)       |
 | UserRepository | JobRepository | DailyGoalRepository... |
 +---------------------------------------------------------+
                             |
               PostgreSQL 15 (Hibernate 6 ORM)
```

---

## 2. Security Architecture

### Authentication & Authorization
- **Algorithm**: HMAC-SHA256 (via `io.jsonwebtoken` JJWT 0.12.6).
- **Format**: `Bearer <token>` in HTTP Authorization Header.
- **Statelessness**: Session creation policy configured to `SessionCreationPolicy.STATELESS`. No server-side session affinity required.
- **Password Protection**: BCrypt with salted rounds applied prior to database persistence. Passwords are never returned in DTO responses or logged.
- **User-Level Data Isolation**: All queries and mutations in repositories strictly scope records using `user_id` derived directly from authenticated JWT principal (`principal.getId()`).

---

## 3. Data Integrity & Validation
- **Input Validation**: Jakarta Bean Validation (`@Valid`, `@NotBlank`, `@Size`, `@Min`, `@Max`, `@Email`).
- **Global Exception Handling**: `@RestControllerAdvice` intercepts `MethodArgumentNotValidException`, `ResourceNotFoundException`, `DuplicateResourceException`, and `BadCredentialsException`.
- **Database Constraints**: Foreign keys with `ON DELETE CASCADE`, unique constraints on `(user_id, skill_name)`, and B-tree indexes for fast filtered lookups.

---

## 4. Frontend Design Architecture
- **State Management**:
  - `AuthContext`: Tracks authentication state, token, user profile, login, registration, and logout.
  - `ThemeContext`: Toggles dark/light class on HTML root element with localStorage persistence.
- **Routing**: `react-router-dom` v7 with `ProtectedRoute` guards and automatic redirects.
- **Data Visualization**: Responsive `recharts` graphs (Donut status distribution, Difficulty bar charts, Radar competency map).
- **Responsive Design**: Mobile drawer navigation overlay with desktop sticky sidebar.
