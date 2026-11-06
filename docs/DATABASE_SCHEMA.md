# DevTrack – Relational Database Architecture

DevTrack uses PostgreSQL 15 as its production relational database engine.

---

## Entity Relationship Overview

```
 [users]
    | (1:N)
    +-----------------+-------------------+-------------------+-------------------+
    |                 |                   |                   |                   |
 [job_applications] [coding_problems]   [skills]          [projects]        [daily_goals]
                                                                                  |
                                                                            [activity_logs]
```

---

## Table Definitions

### 1. `users`
Core user identity and profile entity.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PRIMARY KEY | Unique user identifier |
| `username` | VARCHAR(50) | NOT NULL, UNIQUE | Login handle (3-50 chars) |
| `email` | VARCHAR(100) | NOT NULL, UNIQUE | Contact & authentication email |
| `password` | VARCHAR(255) | NOT NULL | BCrypt hashed password string |
| `full_name` | VARCHAR(100) | NULL | Display name |
| `bio` | TEXT | NULL | Short developer bio |
| `avatar_url` | VARCHAR(255) | NULL | Profile image URL |
| `github_url` | VARCHAR(255) | NULL | GitHub profile URL |
| `linkedin_url` | VARCHAR(255) | NULL | LinkedIn profile URL |
| `website_url` | VARCHAR(255) | NULL | Personal portfolio link |
| `role` | VARCHAR(20) | NOT NULL, DEFAULT 'USER' | System role (`USER`, `ADMIN`) |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE | Soft delete & activation status |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Timestamp created |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Timestamp last modified |

---

### 2. `job_applications`
Tracks job opportunities across application pipelines.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PRIMARY KEY | Application ID |
| `user_id` | BIGINT | NOT NULL, FK -> users(id) ON DELETE CASCADE | Owner user |
| `company_name` | VARCHAR(100) | NOT NULL | Company name |
| `job_role` | VARCHAR(100) | NOT NULL | Job title |
| `location` | VARCHAR(100) | NULL | Location / Remote status |
| `application_date`| DATE | NULL | Date applied |
| `salary_min` | DECIMAL(12,2) | NULL | Lower compensation range |
| `salary_max` | DECIMAL(12,2) | NULL | Upper compensation range |
| `job_description` | TEXT | NULL | Job specs and requirements |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'APPLIED' | `APPLIED`, `ASSESSMENT`, `INTERVIEW`, `SELECTED`, `REJECTED` |
| `notes` | TEXT | NULL | Interview notes and prep |
| `job_url` | VARCHAR(255) | NULL | Original job posting URL |
| `contact_name` | VARCHAR(100) | NULL | Recruiter/hiring manager |
| `contact_email`| VARCHAR(100) | NULL | Recruiter email |
| `created_at` | TIMESTAMP | NOT NULL | Timestamp created |
| `updated_at` | TIMESTAMP | NOT NULL | Timestamp modified |

---

### 3. `coding_problems`
Coding challenges solved on LeetCode, HackerRank, etc.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PRIMARY KEY | Problem record ID |
| `user_id` | BIGINT | NOT NULL, FK -> users(id) ON DELETE CASCADE | Owner user |
| `problem_name` | VARCHAR(200) | NOT NULL | Name of problem |
| `platform` | VARCHAR(50) | NULL | e.g. LeetCode, Codeforces |
| `language` | VARCHAR(50) | NULL | Programming language used |
| `topic` | VARCHAR(100) | NULL | Data structure / algorithmic topic |
| `difficulty` | VARCHAR(10) | NOT NULL, DEFAULT 'MEDIUM' | `EASY`, `MEDIUM`, `HARD` |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'PENDING' | `PENDING`, `SOLVED`, `REVISIT` |
| `solved_date` | DATE | NULL | Date problem was marked solved |
| `problem_url` | VARCHAR(255) | NULL | Link to original problem |
| `notes` | TEXT | NULL | Key insights, algorithm approach |
| `time_complexity` | VARCHAR(50) | NULL | Big-O time complexity |
| `space_complexity`| VARCHAR(50) | NULL | Big-O space complexity |
| `created_at` | TIMESTAMP | NOT NULL | Created date |
| `updated_at` | TIMESTAMP | NOT NULL | Modified date |

---

### 4. `skills`
Developer technical competencies matrix.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PRIMARY KEY | Skill ID |
| `user_id` | BIGINT | NOT NULL, FK -> users(id) ON DELETE CASCADE | Owner user |
| `skill_name` | VARCHAR(100) | NOT NULL | e.g. Java, PostgreSQL, React |
| `category` | VARCHAR(50) | NULL | Frontend, Backend, Database, DevOps |
| `proficiency_level`| INT | NOT NULL, CHECK(0-100) | Current self-rating percentage |
| `years_of_experience`| DECIMAL(4,1) | NULL | Years active experience |
| `is_primary` | BOOLEAN | DEFAULT FALSE | Highlight on core focus cards |
| `notes` | TEXT | NULL | Learning goals & certificates |
| `created_at` | TIMESTAMP | NOT NULL | Created date |
| `updated_at` | TIMESTAMP | NOT NULL | Modified date |
| *Constraint* | UNIQUE(user_id, skill_name) | Enforces unique skill name per user |

---

### 5. `projects`
Showcase of software engineering projects.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PRIMARY KEY | Project ID |
| `user_id` | BIGINT | NOT NULL, FK -> users(id) ON DELETE CASCADE | Owner user |
| `project_name` | VARCHAR(200) | NOT NULL | Title of project |
| `description` | TEXT | NULL | Architecture & feature summary |
| `tech_stack` | VARCHAR(500) | NULL | Comma-separated technologies |
| `github_url` | VARCHAR(255) | NULL | Source code repository |
| `live_url` | VARCHAR(255) | NULL | Production deployment link |
| `start_date` | DATE | NULL | Date initiated |
| `completion_date` | DATE | NULL | Date completed |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'IN_PROGRESS' | `PLANNING`, `IN_PROGRESS`, `COMPLETED`, `ON_HOLD`, `CANCELLED` |
| `thumbnail_url` | VARCHAR(255) | NULL | Screenshot or diagram |
| `notes` | TEXT | NULL | Sprint notes and roadmap |

---

### 6. `daily_goals`
Actionable daily tasks and accountability tracker.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PRIMARY KEY | Goal ID |
| `user_id` | BIGINT | NOT NULL, FK -> users(id) ON DELETE CASCADE | Owner user |
| `title` | VARCHAR(200) | NOT NULL | Goal title |
| `description` | TEXT | NULL | Checklist details |
| `goal_date` | DATE | NOT NULL | Target scheduled date |
| `deadline` | TIMESTAMP | NULL | Specific target hour |
| `is_completed`| BOOLEAN | NOT NULL, DEFAULT FALSE | Completion flag |
| `completed_at`| TIMESTAMP | NULL | Exact completion timestamp |
| `priority` | VARCHAR(10) | NOT NULL, DEFAULT 'MEDIUM' | `LOW`, `MEDIUM`, `HIGH` |
| `category` | VARCHAR(50) | NULL | Coding, Learning, Job Search |

---

### 7. `activity_logs`
Chronological activity stream powering the genuine 365-day contribution calendar.
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | BIGSERIAL | PRIMARY KEY | Activity log ID |
| `user_id` | BIGINT | NOT NULL, FK -> users(id) ON DELETE CASCADE | Owner user |
| `activity_type` | VARCHAR(50) | NOT NULL | `PROBLEM_SOLVED`, `GOAL_COMPLETED`, etc. |
| `activity_date` | DATE | NOT NULL, DEFAULT CURRENT_DATE | Date bucket for calendar |
| `description` | TEXT | NULL | Human readable activity description |
| `reference_id` | BIGINT | NULL | Foreign entity ID |
| `reference_type`| VARCHAR(50) | NULL | Entity type |
| `created_at` | TIMESTAMP | NOT NULL | Timestamp logged |

---

## Database Indexes
- `idx_job_applications_user_id` ON `job_applications(user_id)`
- `idx_job_applications_status` ON `job_applications(status)`
- `idx_coding_problems_user_id` ON `coding_problems(user_id)`
- `idx_coding_problems_status` ON `coding_problems(status)`
- `idx_coding_problems_difficulty` ON `coding_problems(difficulty)`
- `idx_skills_user_id` ON `skills(user_id)`
- `idx_projects_user_id` ON `projects(user_id)`
- `idx_daily_goals_user_id` ON `daily_goals(user_id)`
- `idx_daily_goals_date` ON `daily_goals(goal_date)`
- `idx_activity_logs_user_id` ON `activity_logs(user_id)`
- `idx_activity_logs_date` ON `activity_logs(activity_date)`
