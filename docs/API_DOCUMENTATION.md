# DevTrack – REST API Documentation

Base URL: `http://localhost:8080/api`

DevTrack uses standard HTTP response codes and JWT bearer authentication. Include the header `Authorization: Bearer <token>` on all endpoints except `/api/auth/register` and `/api/auth/login`.

---

## 1. Authentication Endpoints

### Register New User
- **Method**: `POST /auth/register`
- **Request Body**:
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "fullName": "John Doe"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "USER",
      "createdAt": "2026-11-06T12:00:00Z"
    }
  }
  ```

### User Login
- **Method**: `POST /auth/login`
- **Request Body**:
  ```json
  {
    "usernameOrEmail": "johndoe",
    "password": "password123"
  }
  ```
- **Response**: `200 OK` (Returns JWT and User profile)

### Get Current User Profile
- **Method**: `GET /auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`

### Update Profile
- **Method**: `PUT /auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "fullName": "John Doe",
    "bio": "Senior Backend & Cloud Engineer",
    "avatarUrl": "https://avatars.githubusercontent.com/u/1",
    "githubUrl": "https://github.com/johndoe",
    "linkedinUrl": "https://linkedin.com/in/johndoe",
    "websiteUrl": "https://johndoe.dev"
  }
  ```
- **Response**: `200 OK`

---

## 2. Dashboard Endpoints

### Get Aggregated Statistics
- **Method**: `GET /dashboard/stats`
- **Response**: `200 OK`
  ```json
  {
    "totalJobApplications": 12,
    "totalCodingProblems": 45,
    "totalSolvedProblems": 38,
    "totalSkills": 10,
    "totalProjects": 4,
    "totalGoals": 20,
    "completedGoals": 16,
    "pendingGoals": 4,
    "jobStatusDistribution": {
      "APPLIED": 6,
      "INTERVIEW": 3,
      "SELECTED": 1
    },
    "problemDifficultyDistribution": {
      "EASY": 15,
      "MEDIUM": 20,
      "HARD": 3
    }
  }
  ```

### Get Recent Activity Stream
- **Method**: `GET /dashboard/activities?limit=10`
- **Response**: `200 OK` (Array of timestamped activity logs)

### Get 365-Day Contribution Heatmap Data
- **Method**: `GET /dashboard/calendar?days=365`
- **Response**: `200 OK`
  ```json
  {
    "2026-11-01": 3,
    "2026-11-02": 5,
    "2026-11-06": 4
  }
  ```

---

## 3. Job Applications Endpoints

### List Job Applications
- **Method**: `GET /jobs?page=0&size=10&search=Google&status=APPLIED&sortBy=createdAt&sortDir=desc`
- **Response**: `200 OK` (Spring Page response with content and pagination metadata)

### Get Application By ID
- **Method**: `GET /jobs/{id}`

### Create Job Application
- **Method**: `POST /jobs`
- **Request Body**:
  ```json
  {
    "companyName": "Google",
    "jobRole": "Software Engineer II",
    "location": "Mountain View, CA / Remote",
    "applicationDate": "2026-11-06",
    "salaryMin": 140000,
    "salaryMax": 185000,
    "status": "APPLIED",
    "jobDescription": "Full stack development with Java and React.",
    "notes": "Referred by team member",
    "jobUrl": "https://careers.google.com/jobs/123",
    "contactName": "Sarah Recruiter",
    "contactEmail": "sarah@google.com"
  }
  ```

### Update Job Application
- **Method**: `PUT /jobs/{id}`

### Delete Job Application
- **Method**: `DELETE /jobs/{id}`

---

## 4. Coding Problems Endpoints

### List Coding Problems
- **Method**: `GET /coding?page=0&size=10&search=Two+Sum&difficulty=EASY&status=SOLVED`

### Create Coding Problem
- **Method**: `POST /coding`
- **Request Body**:
  ```json
  {
    "problemName": "LRU Cache",
    "platform": "LeetCode",
    "language": "Java",
    "topic": "Design, Hash Table, Doubly Linked List",
    "difficulty": "MEDIUM",
    "status": "SOLVED",
    "solvedDate": "2026-11-06",
    "problemUrl": "https://leetcode.com/problems/lru-cache/",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(capacity)",
    "notes": "Use dummy head and tail nodes to avoid edge cases."
  }
  ```

### Update Coding Problem
- **Method**: `PUT /coding/{id}`

### Delete Coding Problem
- **Method**: `DELETE /coding/{id}`

---

## 5. Skills Endpoints

### List All Skills
- **Method**: `GET /skills`

### Create Skill
- **Method**: `POST /skills`
- **Request Body**:
  ```json
  {
    "skillName": "Spring Boot",
    "category": "Backend",
    "proficiencyLevel": 85,
    "yearsOfExperience": 3.5,
    "isPrimary": true,
    "notes": "Spring Security, JPA, Microservices"
  }
  ```

### Update Skill
- **Method**: `PUT /skills/{id}`

### Delete Skill
- **Method**: `DELETE /skills/{id}`

---

## 6. Projects Endpoints

### List Projects
- **Method**: `GET /projects?page=0&size=10&search=Devtrack`

### Create Project
- **Method**: `POST /projects`
- **Request Body**:
  ```json
  {
    "projectName": "DevTrack",
    "description": "Smart developer growth and career management SaaS.",
    "techStack": "React, Spring Boot, PostgreSQL, Tailwind",
    "githubUrl": "https://github.com/developer/devtrack",
    "liveUrl": "https://devtrack.example.com",
    "startDate": "2026-11-01",
    "status": "IN_PROGRESS"
  }
  ```

### Update Project
- **Method**: `PUT /projects/{id}`

### Delete Project
- **Method**: `DELETE /projects/{id}`

---

## 7. Daily Goals Endpoints

### List Goals for Date
- **Method**: `GET /goals/date/2026-11-06`

### Create Daily Goal
- **Method**: `POST /goals`
- **Request Body**:
  ```json
  {
    "title": "Complete 2 Hard Dynamic Programming problems",
    "description": "Target Knapsack and LCS variants",
    "goalDate": "2026-11-06",
    "priority": "HIGH",
    "category": "Coding"
  }
  ```

### Toggle Completion Status
- **Method**: `PATCH /goals/{id}/toggle`
- **Response**: `200 OK` (Toggles `isCompleted` and sets `completedAt`)

### Delete Goal
- **Method**: `DELETE /goals/{id}`
