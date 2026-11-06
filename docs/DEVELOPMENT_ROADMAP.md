# DevTrack – Comprehensive 100+ Genuine Development Task Roadmap

This roadmap contains 100 granular, meaningful, and independent development tasks designed for steady, genuine contribution history. Each task represents a realistic engineering enhancement, test addition, refactor, UI refinement, or feature implementation.

---

## Milestone 1: Project Setup and Authentication (Tasks 1–10)

### DT-001: Configure Multi-Environment Application Profiles
- **Description**: Add `application-dev.yml` and `application-prod.yml` profiles with structured datasource and logging configurations.
- **Files Likely to Change**: `backend/src/main/resources/application-dev.yml`, `backend/src/main/resources/application-prod.yml`
- **Acceptance Criteria**: Profiles load cleanly using `--spring.profiles.active=dev` and configure custom database and log levels.
- **Suggested Branch**: `feature/dt-001-env-profiles`
- **Commit Message**: `feat(config): add dev and prod spring boot application profiles`
- **PR Title**: `feat(config): add dev and prod application profiles`

### DT-002: Add Password Strength Validation
- **Description**: Implement custom password strength validator requiring uppercase, lowercase, number, and special character.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/validation/PasswordStrength.java`, `backend/src/main/java/com/devtrack/validation/PasswordStrengthValidator.java`, `backend/src/main/java/com/devtrack/dto/request/RegisterRequest.java`
- **Acceptance Criteria**: Registration rejects simple passwords with descriptive error messages.
- **Suggested Branch**: `feature/dt-002-password-validation`
- **Commit Message**: `feat(auth): implement custom password strength validator annotation`
- **PR Title**: `feat(auth): add password strength validator`

### DT-003: Add Refresh Token Entity and Endpoint
- **Description**: Implement secure refresh token rotation to prolong sessions safely without storing long-lived access tokens.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/RefreshToken.java`, `backend/src/main/java/com/devtrack/repository/RefreshTokenRepository.java`, `backend/src/main/java/com/devtrack/controller/AuthController.java`
- **Acceptance Criteria**: `/api/auth/refresh` endpoint validates refresh token and returns fresh access token.
- **Suggested Branch**: `feature/dt-003-refresh-tokens`
- **Commit Message**: `feat(auth): implement refresh token rotation and endpoint`
- **PR Title**: `feat(auth): add refresh token entity and rotation`

### DT-004: Implement Account Password Change API
- **Description**: Add endpoint allowing logged-in users to update their password after verifying old password.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/dto/request/ChangePasswordRequest.java`, `backend/src/main/java/com/devtrack/controller/AuthController.java`, `backend/src/main/java/com/devtrack/service/AuthService.java`
- **Acceptance Criteria**: PUT `/api/auth/password` verifies current password and stores BCrypt hash of new password.
- **Suggested Branch**: `feature/dt-004-password-change`
- **Commit Message**: `feat(auth): add change password endpoint with verification`
- **PR Title**: `feat(auth): add change password API`

### DT-005: Add Password Visibility Toggle in Frontend Auth Forms
- **Description**: Enhance Login and Registration form inputs with show/hide password toggle eye icon.
- **Files Likely to Change**: `frontend/src/components/ui/index.jsx`, `frontend/src/pages/LoginPage.jsx`, `frontend/src/pages/RegisterPage.jsx`
- **Acceptance Criteria**: Eye icon toggles input type between `password` and `text`.
- **Suggested Branch**: `feature/dt-005-password-visibility-toggle`
- **Commit Message**: `feat(ui): add password visibility toggle icon to auth inputs`
- **PR Title**: `feat(ui): add password visibility toggle`

### DT-006: Add Client-Side Input Validation for Auth Forms
- **Description**: Validate email regex and password minimum length before triggering network requests.
- **Files Likely to Change**: `frontend/src/pages/RegisterPage.jsx`, `frontend/src/pages/LoginPage.jsx`
- **Acceptance Criteria**: Instant inline feedback displayed on blur or submit attempt if field is invalid.
- **Suggested Branch**: `feature/dt-006-auth-client-validation`
- **Commit Message**: `feat(ui): add client-side validation rules to registration form`
- **PR Title**: `feat(ui): client-side validation for auth`

### DT-007: Add Remember Me Local Storage Option
- **Description**: Add checkbox on Login page allowing user to persist session preference.
- **Files Likely to Change**: `frontend/src/pages/LoginPage.jsx`, `frontend/src/context/AuthContext.jsx`
- **Acceptance Criteria**: If unchecked, session token is stored in sessionStorage instead of localStorage.
- **Suggested Branch**: `feature/dt-007-remember-me`
- **Commit Message**: `feat(auth): add remember-me storage preference handler`
- **PR Title**: `feat(auth): add remember-me persistence option`

### DT-008: Add User Avatar Upload Support
- **Description**: Add multipart file upload endpoint for user avatar with image compression and format check.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/controller/UserController.java`, `backend/src/main/java/com/devtrack/service/FileStorageService.java`
- **Acceptance Criteria**: Supports PNG/JPEG uploads under 2MB and persists file path in User record.
- **Suggested Branch**: `feature/dt-008-avatar-upload`
- **Commit Message**: `feat(user): add file upload service for profile avatar`
- **PR Title**: `feat(user): add profile avatar upload support`

### DT-009: Implement Account Deactivation API
- **Description**: Allow user to deactivate or delete their DevTrack account with confirmation.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/controller/AuthController.java`, `backend/src/main/java/com/devtrack/service/AuthService.java`
- **Acceptance Criteria**: Soft deletes user account (`isActive = false`) and revokes active JWT tokens.
- **Suggested Branch**: `feature/dt-009-account-deactivation`
- **Commit Message**: `feat(auth): implement user account deactivation endpoint`
- **PR Title**: `feat(auth): add account deactivation`

### DT-010: Add Comprehensive Unit Tests for AuthService
- **Description**: Create unit tests mocking `UserRepository`, `PasswordEncoder`, and `JwtUtils` using Mockito.
- **Files Likely to Change**: `backend/src/test/java/com/devtrack/service/AuthServiceTest.java`
- **Acceptance Criteria**: 100% method coverage of registration, login, and duplicate email handling.
- **Suggested Branch**: `test/dt-010-auth-service-tests`
- **Commit Message**: `test(auth): add mockito unit tests for AuthService methods`
- **PR Title**: `test(auth): add AuthService unit test suite`

---

## Milestone 2: Dashboard and UI Improvements (Tasks 11–20)

### DT-011: Add Skeleton Loading Placeholders for Dashboard Cards
- **Description**: Replace spinner with animated pulse skeleton cards for improved perceived performance.
- **Files Likely to Change**: `frontend/src/components/ui/index.jsx`, `frontend/src/pages/DashboardPage.jsx`
- **Acceptance Criteria**: Shimmer skeletons render until stats and activities load from API.
- **Suggested Branch**: `feature/dt-011-skeleton-loader`
- **Commit Message**: `feat(ui): add shimmer skeleton loaders to dashboard stats`
- **PR Title**: `feat(ui): dashboard skeleton loaders`

### DT-012: Add Date Range Filter to Dashboard Statistics
- **Description**: Allow user to filter dashboard numbers by Last 7 Days, Last 30 Days, or All Time.
- **Files Likely to Change**: `frontend/src/pages/DashboardPage.jsx`, `backend/src/main/java/com/devtrack/controller/DashboardController.java`
- **Acceptance Criteria**: Selecting 30 days re-queries backend with `startDate` and updates metrics.
- **Suggested Branch**: `feature/dt-012-dashboard-date-filter`
- **Commit Message**: `feat(dashboard): add date range filter dropdown to overview`
- **PR Title**: `feat(dashboard): add date range filter`

### DT-013: Add Weekly Coding Goal Progress Ring Widget
- **Description**: Circular progress indicator on dashboard displaying weekly problems solved vs goal.
- **Files Likely to Change**: `frontend/src/components/charts/ProgressRing.jsx`, `frontend/src/pages/DashboardPage.jsx`
- **Acceptance Criteria**: SVG radial ring updates smoothly based on solved problems count.
- **Suggested Branch**: `feature/dt-013-progress-ring-widget`
- **Commit Message**: `feat(ui): add circular progress ring component for weekly goal`
- **PR Title**: `feat(ui): circular progress ring widget`

### DT-014: Add Motivational Developer Quote Banner
- **Description**: Display rotating inspiring developer quotes on dashboard header.
- **Files Likely to Change**: `frontend/src/utils/quotes.js`, `frontend/src/pages/DashboardPage.jsx`
- **Acceptance Criteria**: Random programming wisdom displays daily with author attribution.
- **Suggested Branch**: `feature/dt-014-quote-banner`
- **Commit Message**: `feat(dashboard): add rotating daily developer quote banner`
- **PR Title**: `feat(dashboard): developer quote banner`

### DT-015: Add Quick Action Floating Button on Mobile
- **Description**: Floating action button (FAB) on small screens for quick-adding problem, job, or goal.
- **Files Likely to Change**: `frontend/src/components/layout/Layout.jsx`, `frontend/src/components/ui/QuickActionFab.jsx`
- **Acceptance Criteria**: Speed-dial popup opens modals directly from any page on mobile.
- **Suggested Branch**: `feature/dt-015-mobile-quick-action-fab`
- **Commit Message**: `feat(ui): add floating action button for quick adds on mobile`
- **PR Title**: `feat(ui): mobile quick-action FAB`

### DT-016: Add Activity Type Filter to Recent Activity List
- **Description**: Filter dashboard activities by Problems, Jobs, Projects, or Goals.
- **Files Likely to Change**: `frontend/src/pages/DashboardPage.jsx`, `backend/src/main/java/com/devtrack/controller/DashboardController.java`
- **Acceptance Criteria**: Clickable chips filter feed without full page refresh.
- **Suggested Branch**: `feature/dt-016-activity-type-filter`
- **Commit Message**: `feat(dashboard): filter recent activities by category type`
- **PR Title**: `feat(dashboard): filter activities by type`

### DT-017: Add Sound Effect on Goal Completion
- **Description**: Subtle optional chime audio effect when marking a goal completed.
- **Files Likely to Change**: `frontend/src/utils/sound.js`, `frontend/src/pages/GoalsPage.jsx`
- **Acceptance Criteria**: Web Audio API generates pleasant notification tone with mute toggle.
- **Suggested Branch**: `feature/dt-017-sound-effects`
- **Commit Message**: `feat(ui): add subtle audio chime on goal completion`
- **PR Title**: `feat(ui): goal completion sound effect`

### DT-018: Add Custom Theme Color Accent Picker
- **Description**: Allow user to pick primary accent color (Blue, Violet, Emerald, Amber, Rose).
- **Files Likely to Change**: `frontend/src/context/ThemeContext.jsx`, `frontend/src/pages/SettingsPage.jsx`
- **Acceptance Criteria**: Chosen color updates Tailwind CSS variables dynamically.
- **Suggested Branch**: `feature/dt-018-theme-accents`
- **Commit Message**: `feat(theme): add custom accent color palette selector`
- **PR Title**: `feat(theme): accent color customization`

### DT-019: Add Dashboard Export to Image/PDF
- **Description**: Allow developer to download dashboard overview card as PNG for sharing on social media.
- **Files Likely to Change**: `frontend/src/pages/DashboardPage.jsx`, `frontend/package.json`
- **Acceptance Criteria**: Generates high-res image of achievements without layout distortion.
- **Suggested Branch**: `feature/dt-019-dashboard-share-image`
- **Commit Message**: `feat(dashboard): export summary achievement card to image`
- **PR Title**: `feat(dashboard): export summary card image`

### DT-020: Add Dashboard Statistics Backend Unit Tests
- **Description**: Unit tests covering aggregation queries in `DashboardService`.
- **Files Likely to Change**: `backend/src/test/java/com/devtrack/service/DashboardServiceTest.java`
- **Acceptance Criteria**: Verifies calculation of total solved, percentages, and status distributions.
- **Suggested Branch**: `test/dt-020-dashboard-service-tests`
- **Commit Message**: `test(dashboard): add unit tests for DashboardService metrics`
- **PR Title**: `test(dashboard): DashboardService unit tests`

---

## Milestone 3: Job Application Management (Tasks 21–30)

### DT-021: Add Salary Range Currency Selector
- **Description**: Support multiple currencies (USD, EUR, GBP, INR, CAD) in Job Application form.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/JobApplication.java`, `frontend/src/pages/JobsPage.jsx`
- **Acceptance Criteria**: Currency symbol renders correctly in table and cards.
- **Suggested Branch**: `feature/dt-021-job-currency-support`
- **Commit Message**: `feat(jobs): add multi-currency support to job applications`
- **PR Title**: `feat(jobs): add salary currency support`

### DT-022: Add Interview Rounds Sub-Tracker
- **Description**: Allow logging multiple interview rounds (Technical, System Design, HR) per application.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/InterviewRound.java`, `frontend/src/pages/JobsPage.jsx`
- **Acceptance Criteria**: User can add rounds with dates, interviewer names, and notes.
- **Suggested Branch**: `feature/dt-022-interview-rounds`
- **Commit Message**: `feat(jobs): implement interview rounds sub-entity and tracker`
- **PR Title**: `feat(jobs): add interview rounds tracker`

### DT-023: Add Kanban Board View for Job Applications
- **Description**: Add drag-and-drop or column-based Kanban layout for job stages.
- **Files Likely to Change**: `frontend/src/pages/JobsPage.jsx`, `frontend/src/components/jobs/KanbanBoard.jsx`
- **Acceptance Criteria**: Users toggle between Card Grid, Table View, and Kanban columns.
- **Suggested Branch**: `feature/dt-023-jobs-kanban-view`
- **Commit Message**: `feat(jobs): add kanban board view for application pipeline`
- **PR Title**: `feat(jobs): kanban board view`

### DT-024: Add Job Application Follow-Up Date Reminder
- **Description**: Add follow-up date field with visual warning badge when a follow-up is overdue.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/JobApplication.java`, `frontend/src/pages/JobsPage.jsx`
- **Acceptance Criteria**: "Follow-up due" badge displays if date is today or past.
- **Suggested Branch**: `feature/dt-024-job-followup-reminders`
- **Commit Message**: `feat(jobs): add follow-up reminder date and overdue alert`
- **PR Title**: `feat(jobs): follow-up reminder alerts`

### DT-025: Add Company Website Logo Auto-Fetch
- **Description**: Render company favicon or logo automatically using Clearbit / DuckDuckGo logo API.
- **Files Likely to Change**: `frontend/src/pages/JobsPage.jsx`, `frontend/src/utils/companyLogo.js`
- **Acceptance Criteria**: Displays crisp company favicon next to company name.
- **Suggested Branch**: `feature/dt-025-company-logo-fetch`
- **Commit Message**: `feat(jobs): auto-fetch company icon using domain lookup`
- **PR Title**: `feat(jobs): company logo auto-fetch`

### DT-026: Add Job Application Archival Support
- **Description**: Soft archive rejected or old applications to keep active board focused.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/JobApplication.java`, `frontend/src/pages/JobsPage.jsx`
- **Acceptance Criteria**: Archived toggle hides applications from default view.
- **Suggested Branch**: `feature/dt-026-job-archival`
- **Commit Message**: `feat(jobs): add archive toggle to declutter job application list`
- **PR Title**: `feat(jobs): application archival support`

### DT-027: Add Offer Comparison Calculator
- **Description**: Modal allowing side-by-side compensation comparison of two selected offers.
- **Files Likely to Change**: `frontend/src/components/jobs/OfferComparisonModal.jsx`, `frontend/src/pages/JobsPage.jsx`
- **Acceptance Criteria**: Compares base salary, bonus, equity, and remote benefits.
- **Suggested Branch**: `feature/dt-027-offer-comparison`
- **Commit Message**: `feat(jobs): add side-by-side job offer compensation comparator`
- **PR Title**: `feat(jobs): offer comparison calculator`

### DT-028: Add Job Application CSV Import
- **Description**: Allow importing existing job applications from spreadsheet CSV.
- **Files Likely to Change**: `frontend/src/pages/JobsPage.jsx`, `backend/src/main/java/com/devtrack/controller/JobApplicationController.java`
- **Acceptance Criteria**: Parses CSV headers and batch inserts valid records.
- **Suggested Branch**: `feature/dt-028-job-csv-import`
- **Commit Message**: `feat(jobs): implement batch CSV import for job applications`
- **PR Title**: `feat(jobs): CSV import for job applications`

### DT-029: Add Remote / Hybrid / On-Site Work Model Tag
- **Description**: Add workplace type enum (`REMOTE`, `HYBRID`, `ON_SITE`) with badge filter.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/JobApplication.java`, `frontend/src/pages/JobsPage.jsx`
- **Acceptance Criteria**: Can filter applications specifically by Remote status.
- **Suggested Branch**: `feature/dt-029-job-work-model`
- **Commit Message**: `feat(jobs): add work model field with remote/hybrid/on-site filter`
- **PR Title**: `feat(jobs): work model categorization`

### DT-030: Add JobApplicationService Unit and Integration Tests
- **Description**: Full Mockito service tests and MockMvc controller integration tests.
- **Files Likely to Change**: `backend/src/test/java/com/devtrack/service/JobApplicationServiceTest.java`, `backend/src/test/java/com/devtrack/controller/JobApplicationControllerTest.java`
- **Acceptance Criteria**: Covers pagination, filtering, authorization checks, and CRUD methods.
- **Suggested Branch**: `test/dt-030-job-tests`
- **Commit Message**: `test(jobs): add unit and controller integration test suites`
- **PR Title**: `test(jobs): comprehensive job module tests`

---

## Milestone 4: Coding Practice Management (Tasks 31–40)

### DT-031: Add LeetCode Problem URL Auto-Parser
- **Description**: Paste LeetCode URL to auto-extract problem slug and title.
- **Files Likely to Change**: `frontend/src/pages/CodingPage.jsx`, `frontend/src/utils/urlParser.js`
- **Acceptance Criteria**: Pasting `https://leetcode.com/problems/two-sum/` sets title to "Two Sum".
- **Suggested Branch**: `feature/dt-031-leetcode-url-parser`
- **Commit Message**: `feat(coding): auto-extract problem name from LeetCode URL`
- **PR Title**: `feat(coding): LeetCode URL title parser`

### DT-032: Add Solution Code Snippet Markdown Viewer
- **Description**: Store and highlight actual code solution using syntax highlighter.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/CodingProblem.java`, `frontend/src/pages/CodingPage.jsx`
- **Acceptance Criteria**: Form has Code field; card displays expandable highlighted snippet.
- **Suggested Branch**: `feature/dt-032-code-snippet-viewer`
- **Commit Message**: `feat(coding): add syntax-highlighted code solution viewer`
- **PR Title**: `feat(coding): code snippet storage & viewer`

### DT-033: Add Spaced Repetition Review Interval Algorithm
- **Description**: Calculate next review date using SuperMemo SM-2 algorithm for problems marked REVISIT.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/service/SpacedRepetitionService.java`, `frontend/src/pages/CodingPage.jsx`
- **Acceptance Criteria**: Flags problems due for review today based on difficulty.
- **Suggested Branch**: `feature/dt-033-spaced-repetition`
- **Commit Message**: `feat(coding): implement spaced repetition review scheduler`
- **PR Title**: `feat(coding): spaced repetition review scheduler`

### DT-034: Add Problem Solving Timer / Stopwatch
- **Description**: Built-in stopwatch modal for mock interview timed problem-solving.
- **Files Likely to Change**: `frontend/src/components/coding/PracticeStopwatch.jsx`, `frontend/src/pages/CodingPage.jsx`
- **Acceptance Criteria**: Tracks minutes taken to solve and saves time in minutes to problem record.
- **Suggested Branch**: `feature/dt-034-practice-stopwatch`
- **Commit Message**: `feat(coding): add practice stopwatch for timed challenges`
- **PR Title**: `feat(coding): practice stopwatch widget`

### DT-035: Add Blind 75 / NeetCode 150 Checklist Mode
- **Description**: Pre-populate Blind 75 questions list with one-click import.
- **Files Likely to Change**: `backend/src/main/resources/data/blind75.json`, `frontend/src/pages/CodingPage.jsx`
- **Acceptance Criteria**: "Import Blind 75" button loads questions categorized by topic.
- **Suggested Branch**: `feature/dt-035-blind75-importer`
- **Commit Message**: `feat(coding): add Blind 75 curated problem set import`
- **PR Title**: `feat(coding): Blind 75 curated problems importer`

### DT-036: Add Platform Statistics Breakdown (LeetCode vs HackerRank vs Codeforces)
- **Description**: Visual donut chart showing problem distribution across coding platforms.
- **Files Likely to Change**: `frontend/src/pages/CodingPage.jsx`
- **Acceptance Criteria**: Recharts pie chart displays counts per platform.
- **Suggested Branch**: `feature/dt-036-platform-breakdown`
- **Commit Message**: `feat(coding): add platform distribution pie chart`
- **PR Title**: `feat(coding): platform statistics chart`

### DT-037: Add Tag Autocomplete for Problem Topics
- **Description**: Autocomplete suggestions when typing topics (Graphs, Sliding Window, DP, Trie).
- **Files Likely to Change**: `frontend/src/pages/CodingPage.jsx`
- **Acceptance Criteria**: Dropdown suggests existing topics as user types in input.
- **Suggested Branch**: `feature/dt-037-topic-autocomplete`
- **Commit Message**: `feat(coding): add topic autocomplete dropdown in problem form`
- **PR Title**: `feat(coding): topic tag autocomplete`

### DT-038: Add Batch Status Update for Selected Problems
- **Description**: Multi-select checkboxes to mark multiple problems as Solved in bulk.
- **Files Likely to Change**: `frontend/src/pages/CodingPage.jsx`, `backend/src/main/java/com/devtrack/controller/CodingProblemController.java`
- **Acceptance Criteria**: Selecting 5 problems and clicking "Mark Solved" executes batch update.
- **Suggested Branch**: `feature/dt-038-coding-batch-actions`
- **Commit Message**: `feat(coding): add batch selection and bulk status update`
- **PR Title**: `feat(coding): bulk actions for coding problems`

### DT-039: Add Daily Problem Recommendation Engine
- **Description**: Suggest 1 Easy and 1 Medium unsolved problem based on weakest topic.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/service/RecommendationService.java`, `frontend/src/pages/CodingPage.jsx`
- **Acceptance Criteria**: Card suggests "Today's Recommended Challenge" on top of coding page.
- **Suggested Branch**: `feature/dt-039-daily-recommendation`
- **Commit Message**: `feat(coding): suggest daily challenge based on topic progress`
- **PR Title**: `feat(coding): daily problem recommendation engine`

### DT-040: Add Unit Tests for CodingProblemService and Repository
- **Description**: Mockito tests covering difficulty counting, search filtering, and user isolation.
- **Files Likely to Change**: `backend/src/test/java/com/devtrack/service/CodingProblemServiceTest.java`
- **Acceptance Criteria**: Tests ensure User A cannot read or mutate User B's problem records.
- **Suggested Branch**: `test/dt-040-coding-service-tests`
- **Commit Message**: `test(coding): add unit tests for CodingProblemService with user isolation`
- **PR Title**: `test(coding): CodingProblemService unit tests`

---

## Milestone 5: Skills Management (Tasks 41–50)

### DT-041: Add Skill Target Level and Due Date
- **Description**: Allow user to define target proficiency (e.g. Current 60%, Target 85%) and target date.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/Skill.java`, `frontend/src/pages/SkillsPage.jsx`
- **Acceptance Criteria**: Skill card shows delta gap bar between current and target proficiency.
- **Suggested Branch**: `feature/dt-041-skill-targets`
- **Commit Message**: `feat(skills): add target proficiency level and target completion date`
- **PR Title**: `feat(skills): skill target level and deadline`

### DT-042: Add Skill Certification Log
- **Description**: Allow attaching certifications (AWS SAA, CKA, Spring Certified) to skills.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/Certification.java`, `frontend/src/pages/SkillsPage.jsx`
- **Acceptance Criteria**: Renders badge with certification credential ID and verification link.
- **Suggested Branch**: `feature/dt-042-skill-certifications`
- **Commit Message**: `feat(skills): add certification credentials sub-tracker`
- **PR Title**: `feat(skills): skill certifications logger`

### DT-043: Add Skill Proficiency History and Audit Trail
- **Description**: Record timestamped history whenever skill proficiency is updated to show growth curve.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/SkillHistory.java`, `frontend/src/pages/SkillsPage.jsx`
- **Acceptance Criteria**: Click on skill displays line chart of proficiency growth over time.
- **Suggested Branch**: `feature/dt-043-skill-history`
- **Commit Message**: `feat(skills): track historical proficiency changes and display trend chart`
- **PR Title**: `feat(skills): skill growth history tracking`

### DT-044: Add Pre-built Role-Based Skill Templates
- **Description**: Templates for "Backend Engineer", "Full Stack", "DevOps", and "Data Engineer".
- **Files Likely to Change**: `frontend/src/utils/skillTemplates.js`, `frontend/src/pages/SkillsPage.jsx`
- **Acceptance Criteria**: Clicking template populates 8 curated skills with standard starting ratings.
- **Suggested Branch**: `feature/dt-044-skill-templates`
- **Commit Message**: `feat(skills): add role-based preset skill matrix templates`
- **PR Title**: `feat(skills): role-based skill templates`

### DT-045: Add Skill Resource Bookmark Links
- **Description**: Store official docs, course links, and books associated with each skill.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/Skill.java`, `frontend/src/pages/SkillsPage.jsx`
- **Acceptance Criteria**: Dropdown list of study resource links inside skill card.
- **Suggested Branch**: `feature/dt-045-skill-resources`
- **Commit Message**: `feat(skills): attach documentation and course bookmarks to skills`
- **PR Title**: `feat(skills): skill learning resource bookmarks`

### DT-046: Add Skill Assessment Quiz Mode (Self-Rating Guide)
- **Description**: Interactive modal with rubrics helping developer determine objective 0-100 rating.
- **Files Likely to Change**: `frontend/src/components/skills/SkillRubricModal.jsx`, `frontend/src/pages/SkillsPage.jsx`
- **Acceptance Criteria**: Answering 5 questions calculates suggested proficiency score.
- **Suggested Branch**: `feature/dt-046-skill-rubric`
- **Commit Message**: `feat(skills): add guided rubric modal for objective self-assessment`
- **PR Title**: `feat(skills): skill assessment rubric modal`

### DT-047: Add Skill Search and Multi-Category Filter
- **Description**: Instant text search for skills matching name or notes.
- **Files Likely to Change**: `frontend/src/pages/SkillsPage.jsx`
- **Acceptance Criteria**: Search bar filters list in real-time as user types.
- **Suggested Branch**: `feature/dt-047-skill-search`
- **Commit Message**: `feat(skills): add real-time search input for skill inventory`
- **PR Title**: `feat(skills): real-time skill search`

### DT-048: Add Skill Export to Resume Markdown Section
- **Description**: Format skills into clean markdown snippet ready to paste into technical resume.
- **Files Likely to Change**: `frontend/src/pages/SkillsPage.jsx`, `frontend/src/utils/resumeGenerator.js`
- **Acceptance Criteria**: Generates categorized `Languages: Java, Python... Frameworks: Spring Boot, React...` with copy button.
- **Suggested Branch**: `feature/dt-048-skill-resume-export`
- **Commit Message**: `feat(skills): generate resume-ready markdown skills summary`
- **PR Title**: `feat(skills): resume markdown skills export`

### DT-049: Add Skill Level Threshold Colors (Beginner, Intermediate, Advanced, Expert)
- **Description**: Distinct color palettes and labels for skill tiers.
- **Files Likely to Change**: `frontend/src/pages/SkillsPage.jsx`, `frontend/src/components/ui/index.jsx`
- **Acceptance Criteria**: 0-39% = Beginner, 40-69% = Intermediate, 70-89% = Advanced, 90-100% = Expert.
- **Suggested Branch**: `feature/dt-049-skill-tier-badges`
- **Commit Message**: `feat(skills): display beginner/intermediate/expert tier labels and colors`
- **PR Title**: `feat(skills): skill proficiency tier badges`

### DT-050: Add SkillService Unit Tests
- **Description**: Test duplicate skill prevention, category filtering, and proficiency bounds validation.
- **Files Likely to Change**: `backend/src/test/java/com/devtrack/service/SkillServiceTest.java`
- **Acceptance Criteria**: Rejects proficiency < 0 or > 100 and verifies update operations.
- **Suggested Branch**: `test/dt-050-skill-service-tests`
- **Commit Message**: `test(skills): add unit tests for SkillService business logic`
- **PR Title**: `test(skills): SkillService unit tests`

---

## Milestone 6: Project Management (Tasks 51–60)

### DT-051: Add GitHub Repository Stats Fetcher
- **Description**: Auto-fetch stars, forks, and open issues from GitHub API if repository URL is provided.
- **Files Likely to Change**: `frontend/src/pages/ProjectsPage.jsx`, `frontend/src/api/github.js`
- **Acceptance Criteria**: Shows stars count badge on project card.
- **Suggested Branch**: `feature/dt-051-github-repo-stats`
- **Commit Message**: `feat(projects): fetch public GitHub stars and forks count`
- **PR Title**: `feat(projects): GitHub repository stats fetcher`

### DT-052: Add Project Milestone Checklist Sub-Tasks
- **Description**: Allow adding sub-tasks (e.g. "Implement Auth", "Setup CI/CD") inside a project.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/ProjectTask.java`, `frontend/src/pages/ProjectsPage.jsx`
- **Acceptance Criteria**: Checkbox list calculates project percentage completion.
- **Suggested Branch**: `feature/dt-052-project-milestones`
- **Commit Message**: `feat(projects): add milestone tasks checklist sub-entity`
- **PR Title**: `feat(projects): project milestone sub-tasks`

### DT-053: Add Tech Stack Icon Badges
- **Description**: Render official SVGs for Docker, React, Spring, Postgres, AWS in project cards.
- **Files Likely to Change**: `frontend/src/pages/ProjectsPage.jsx`, `frontend/src/components/ui/TechBadge.jsx`
- **Acceptance Criteria**: Recognizes standard names and displays brand icons.
- **Suggested Branch**: `feature/dt-053-tech-stack-icons`
- **Commit Message**: `feat(ui): render branded technology badges on project cards`
- **PR Title**: `feat(ui): project tech stack icon badges`

### DT-054: Add Live Demo Health Checker
- **Description**: Background check testing if project live deployment URL returns HTTP 200.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/service/HealthCheckService.java`, `frontend/src/pages/ProjectsPage.jsx`
- **Acceptance Criteria**: Shows green "Live" pulse dot or red "Offline" indicator.
- **Suggested Branch**: `feature/dt-054-project-health-check`
- **Commit Message**: `feat(projects): ping live deployment URLs and show uptime indicator`
- **PR Title**: `feat(projects): live deployment health check`

### DT-055: Add Architecture Diagram Image Viewer
- **Description**: Modal allowing full-screen preview of uploaded system architecture diagrams.
- **Files Likely to Change**: `frontend/src/pages/ProjectsPage.jsx`
- **Acceptance Criteria**: Clicking architecture thumbnail opens lightbox modal.
- **Suggested Branch**: `feature/dt-055-architecture-diagram-modal`
- **Commit Message**: `feat(projects): add full-screen architecture diagram preview modal`
- **PR Title**: `feat(projects): architecture diagram preview modal`

### DT-056: Add Project Duration in Days / Months Counter
- **Description**: Automatically calculate and display elapsed project duration.
- **Files Likely to Change**: `frontend/src/pages/ProjectsPage.jsx`, `frontend/src/utils/dateCalculations.js`
- **Acceptance Criteria**: Shows "Active for 3 weeks" or "Completed in 45 days".
- **Suggested Branch**: `feature/dt-056-project-duration-calc`
- **Commit Message**: `feat(projects): calculate and display active project duration`
- **PR Title**: `feat(projects): project duration calculator`

### DT-057: Add Project Markdown README Viewer Modal
- **Description**: Render raw markdown project documentation directly inside DevTrack.
- **Files Likely to Change**: `frontend/src/components/projects/ReadmeModal.jsx`, `frontend/src/pages/ProjectsPage.jsx`
- **Acceptance Criteria**: Renders formatted markdown headings, lists, and code blocks.
- **Suggested Branch**: `feature/dt-057-project-readme-modal`
- **Commit Message**: `feat(projects): add markdown documentation reader modal`
- **PR Title**: `feat(projects): project markdown reader modal`

### DT-058: Add Featured Project Pinning
- **Description**: Allow pinning 2 top portfolio projects to feature prominently on dashboard.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/Project.java`, `frontend/src/pages/ProjectsPage.jsx`
- **Acceptance Criteria**: Pinned projects appear first with gold border.
- **Suggested Branch**: `feature/dt-058-featured-project-pin`
- **Commit Message**: `feat(projects): allow pinning featured projects to top of portfolio`
- **PR Title**: `feat(projects): featured project pinning`

### DT-059: Add Project Filter by Technology Stack
- **Description**: Filter projects by clicking any technology tag (e.g. view only "Spring Boot" projects).
- **Files Likely to Change**: `frontend/src/pages/ProjectsPage.jsx`
- **Acceptance Criteria**: Clicking tech badge filters active project list instantly.
- **Suggested Branch**: `feature/dt-059-tech-tag-filter`
- **Commit Message**: `feat(projects): filter project portfolio by clicked tech stack tag`
- **PR Title**: `feat(projects): filter projects by technology tag`

### DT-060: Add ProjectService and Controller Unit Tests
- **Description**: MockMvc tests validating project creation, status transitions, and user isolation.
- **Files Likely to Change**: `backend/src/test/java/com/devtrack/service/ProjectServiceTest.java`
- **Acceptance Criteria**: Verifies pagination and sorting by start date and completion date.
- **Suggested Branch**: `test/dt-060-project-tests`
- **Commit Message**: `test(projects): add unit tests for ProjectService operations`
- **PR Title**: `test(projects): ProjectService test suite`

---

## Milestone 7: Daily Goals and Calendar (Tasks 61–70)

### DT-061: Add Recurring Goals Support (Daily, Weekdays, Weekly)
- **Description**: Allow goals to repeat automatically on selected weekdays.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/DailyGoal.java`, `frontend/src/pages/GoalsPage.jsx`
- **Acceptance Criteria**: Recurring goals populate automatically when viewing future dates.
- **Suggested Branch**: `feature/dt-061-recurring-goals`
- **Commit Message**: `feat(goals): implement recurring goal scheduler for daily habits`
- **PR Title**: `feat(goals): recurring daily goals scheduler`

### DT-062: Add Goal Time-to-Deadline Countdown
- **Description**: Live countdown timer badge ("2h 15m remaining") for goals with deadlines.
- **Files Likely to Change**: `frontend/src/pages/GoalsPage.jsx`
- **Acceptance Criteria**: Updates every minute and turns red when under 30 minutes remain.
- **Suggested Branch**: `feature/dt-062-deadline-countdown`
- **Commit Message**: `feat(goals): display dynamic countdown timer to goal deadline`
- **PR Title**: `feat(goals): goal deadline countdown timer`

### DT-063: Add Pomodoro Timer Integration
- **Description**: Built-in 25/5 Pomodoro timer linked to the active daily goal.
- **Files Likely to Change**: `frontend/src/components/goals/PomodoroTimer.jsx`, `frontend/src/pages/GoalsPage.jsx`
- **Acceptance Criteria**: Start, pause, reset buttons with audio notifications on interval end.
- **Suggested Branch**: `feature/dt-063-pomodoro-timer`
- **Commit Message**: `feat(goals): add built-in 25/5 pomodoro focus timer widget`
- **PR Title**: `feat(goals): Pomodoro focus timer integration`

### DT-064: Add Goal Reordering via Drag and Drop
- **Description**: Drag and drop goals to change priority sequence for the day.
- **Files Likely to Change**: `frontend/src/pages/GoalsPage.jsx`
- **Acceptance Criteria**: Reordered order persists in UI.
- **Suggested Branch**: `feature/dt-064-goal-reordering`
- **Commit Message**: `feat(goals): support drag-and-drop manual goal reordering`
- **PR Title**: `feat(goals): goal drag-and-drop reordering`

### DT-065: Add Carry-Over Unfinished Goals to Tomorrow
- **Description**: Button to push incomplete goals from yesterday to today's list.
- **Files Likely to Change**: `frontend/src/pages/GoalsPage.jsx`, `backend/src/main/java/com/devtrack/service/DailyGoalService.java`
- **Acceptance Criteria**: "Roll over 2 unfinished goals" button updates goalDate to today.
- **Suggested Branch**: `feature/dt-065-rollover-goals`
- **Commit Message**: `feat(goals): add rollover button to migrate unfinished goals to today`
- **PR Title**: `feat(goals): roll over unfinished goals`

### DT-066: Add Heatmap Month Labels and Day of Week Headers
- **Description**: Add Jan, Feb, Mar labels and Mon, Wed, Fri rows to contribution heatmap.
- **Files Likely to Change**: `frontend/src/pages/CalendarPage.jsx`
- **Acceptance Criteria**: Heatmap aligns with standard calendar week grid.
- **Suggested Branch**: `feature/dt-066-heatmap-labels`
- **Commit Message**: `feat(calendar): add month and day labels to contribution heatmap`
- **PR Title**: `feat(calendar): heatmap month and weekday labels`

### DT-067: Add Calendar Day Details Modal
- **Description**: Click any calendar square to view exact list of activities logged on that day.
- **Files Likely to Change**: `frontend/src/pages/CalendarPage.jsx`
- **Acceptance Criteria**: Modal lists timestamped activities for clicked date.
- **Suggested Branch**: `feature/dt-067-calendar-day-modal`
- **Commit Message**: `feat(calendar): open activity breakdown modal on day square click`
- **PR Title**: `feat(calendar): calendar day activity breakdown modal`

### DT-068: Add Streak Freeze Feature
- **Description**: Allow 1 streak freeze per month to maintain consistency despite emergency absence.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/User.java`, `frontend/src/pages/CalendarPage.jsx`
- **Acceptance Criteria**: Frozen days maintain unbroken streak calculation.
- **Suggested Branch**: `feature/dt-068-streak-freeze`
- **Commit Message**: `feat(calendar): implement monthly streak freeze protection`
- **PR Title**: `feat(calendar): monthly streak freeze protection`

### DT-069: Add Weekly Goal Summary Email Digest Template
- **Description**: HTML email template generating weekly performance recap.
- **Files Likely to Change**: `backend/src/main/resources/templates/weekly-digest.html`, `backend/src/main/java/com/devtrack/service/EmailService.java`
- **Acceptance Criteria**: Renders goals completed, problems solved, and streak status cleanly.
- **Suggested Branch**: `feature/dt-069-weekly-digest-template`
- **Commit Message**: `feat(email): add HTML weekly developer progress digest template`
- **PR Title**: `feat(email): weekly digest email template`

### DT-070: Add DailyGoalService and Calendar Unit Tests
- **Description**: Mockito tests verifying completion toggle, date querying, and activity logging.
- **Files Likely to Change**: `backend/src/test/java/com/devtrack/service/DailyGoalServiceTest.java`
- **Acceptance Criteria**: Tests verify activity log is generated when goal is marked completed.
- **Suggested Branch**: `test/dt-070-goal-service-tests`
- **Commit Message**: `test(goals): add unit tests for DailyGoalService and activity triggers`
- **PR Title**: `test(goals): DailyGoalService test suite`

---

## Milestone 8: Reports and Analytics (Tasks 71–80)

### DT-071: Add Weekly Learning Hours Tracker
- **Description**: Log hours spent learning with weekly target progress bar.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/entity/LearningHourLog.java`, `frontend/src/pages/ReportsPage.jsx`
- **Acceptance Criteria**: Records study sessions and calculates weekly total.
- **Suggested Branch**: `feature/dt-071-learning-hours-tracker`
- **Commit Message**: `feat(reports): add weekly learning hours log and target tracker`
- **PR Title**: `feat(reports): learning hours tracker`

### DT-072: Add Application-to-Interview Conversion Rate Metric
- **Description**: Calculate funnel conversion percentage: Applied -> Assessment -> Interview -> Offer.
- **Files Likely to Change**: `frontend/src/pages/ReportsPage.jsx`
- **Acceptance Criteria**: Visual funnel chart showing drop-off percentages at each hiring stage.
- **Suggested Branch**: `feature/dt-072-hiring-funnel-metric`
- **Commit Message**: `feat(reports): add hiring pipeline conversion funnel visualization`
- **PR Title**: `feat(reports): hiring funnel conversion analytics`

### DT-073: Add PDF Progress Report Generation
- **Description**: Download full executive monthly progress report as print-ready styled PDF.
- **Files Likely to Change**: `frontend/src/pages/ReportsPage.jsx`, `frontend/src/utils/pdfExport.js`
- **Acceptance Criteria**: Uses print styles to generate clean PDF with graphs and tables.
- **Suggested Branch**: `feature/dt-073-pdf-report-export`
- **Commit Message**: `feat(reports): add printable PDF monthly career progress report`
- **PR Title**: `feat(reports): PDF career report generator`

### DT-074: Add Most Productive Day of Week Analytics
- **Description**: Bar chart showing activity count by Monday, Tuesday, Wednesday, etc.
- **Files Likely to Change**: `frontend/src/pages/ReportsPage.jsx`
- **Acceptance Criteria**: Highlights peak productivity day based on historical activity timestamps.
- **Suggested Branch**: `feature/dt-074-productive-day-chart`
- **Commit Message**: `feat(reports): display productivity breakdown by day of week`
- **PR Title**: `feat(reports): day-of-week productivity analytics`

### DT-075: Add Topic Mastery Matrix Heatmap
- **Description**: Grid showing problem solve counts across topics (Dynamic Programming, Trees, Graphs).
- **Files Likely to Change**: `frontend/src/pages/ReportsPage.jsx`
- **Acceptance Criteria**: Color intensity reflects number of problems solved in each category.
- **Suggested Branch**: `feature/dt-075-topic-mastery-matrix`
- **Commit Message**: `feat(reports): add topic mastery matrix heatmap`
- **PR Title**: `feat(reports): topic mastery matrix`

### DT-076: Add JSON Complete Account Backup Export
- **Description**: Single-click export of complete account data as formatted JSON.
- **Files Likely to Change**: `frontend/src/pages/ReportsPage.jsx`, `backend/src/main/java/com/devtrack/controller/ExportController.java`
- **Acceptance Criteria**: Downloads `devtrack_backup_{date}.json` containing all tables.
- **Suggested Branch**: `feature/dt-076-json-backup-export`
- **Commit Message**: `feat(reports): implement complete user data export to JSON`
- **PR Title**: `feat(reports): full JSON account data export`

### DT-077: Add Monthly Goal Completion Rate Trend Chart
- **Description**: Recharts AreaChart showing monthly goal success percentage over past 6 months.
- **Files Likely to Change**: `frontend/src/pages/ReportsPage.jsx`
- **Acceptance Criteria**: Displays upward or downward goal consistency trajectory.
- **Suggested Branch**: `feature/dt-077-goal-trend-chart`
- **Commit Message**: `feat(reports): add 6-month goal completion rate area chart`
- **PR Title**: `feat(reports): goal completion trend chart`

### DT-078: Add Salary Range Histogram
- **Description**: Histogram of applied job salary offerings to identify compensation sweet spot.
- **Files Likely to Change**: `frontend/src/pages/ReportsPage.jsx`
- **Acceptance Criteria**: Bins salaries into $20k brackets and charts frequency.
- **Suggested Branch**: `feature/dt-078-salary-histogram`
- **Commit Message**: `feat(reports): render salary bracket frequency histogram`
- **PR Title**: `feat(reports): salary distribution histogram`

### DT-079: Add Productivity Score Algorithm
- **Description**: Weighted daily index combining goals, solved problems, and job touches (0-100 score).
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/service/ScoreService.java`, `frontend/src/pages/ReportsPage.jsx`
- **Acceptance Criteria**: Computes daily index and displays grade (A+, A, B, etc.).
- **Suggested Branch**: `feature/dt-079-productivity-score`
- **Commit Message**: `feat(reports): calculate composite developer productivity score`
- **PR Title**: `feat(reports): composite productivity score index`

### DT-080: Add Automated Export Endpoints Controller Test
- **Description**: Integration test verifying JSON and CSV export endpoints return valid status and headers.
- **Files Likely to Change**: `backend/src/test/java/com/devtrack/controller/ExportControllerTest.java`
- **Acceptance Criteria**: Validates `Content-Disposition` attachment headers and serialization.
- **Suggested Branch**: `test/dt-080-export-tests`
- **Commit Message**: `test(reports): add tests for export controllers and CSV formatting`
- **PR Title**: `test(reports): export endpoints integration tests`

---

## Milestone 9: Security and Performance (Tasks 81–90)

### DT-081: Implement Rate Limiting with Bucket4j
- **Description**: Rate limit `/api/auth/**` to 10 requests per minute to prevent brute force attacks.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/security/RateLimitingFilter.java`, `backend/pom.xml`
- **Acceptance Criteria**: Exceeding threshold returns HTTP 429 Too Many Requests with retry header.
- **Suggested Branch**: `feature/dt-081-rate-limiting`
- **Commit Message**: `feat(security): implement IP rate limiting on authentication routes`
- **PR Title**: `feat(security): rate limiting filter with Bucket4j`

### DT-082: Add Content Security Policy and Security Headers
- **Description**: Configure Spring Security HTTP headers: CSP, HSTS, X-Content-Type-Options, X-Frame-Options.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/config/SecurityConfig.java`
- **Acceptance Criteria**: Response headers include standard OWASP-recommended security parameters.
- **Suggested Branch**: `feature/dt-082-security-headers`
- **Commit Message**: `feat(security): configure OWASP security headers in Spring Security`
- **PR Title**: `feat(security): OWASP security headers`

### DT-083: Add JPA Database Query Logging in Dev Profile
- **Description**: Enable SQL query and execution time logging in `application-dev.yml` to identify slow N+1 queries.
- **Files Likely to Change**: `backend/src/main/resources/application-dev.yml`
- **Acceptance Criteria**: Logs show parameterized SQL and bind parameters during dev runs.
- **Suggested Branch**: `feature/dt-083-sql-logging`
- **Commit Message**: `feat(perf): configure JPA query execution profiling in dev profile`
- **PR Title**: `feat(perf): SQL query execution logging`

### DT-084: Add Database Composite Indexes for Filtering
- **Description**: Add composite index on `(user_id, status)` and `(user_id, goal_date)`.
- **Files Likely to Change**: `database/init.sql`, `backend/src/main/java/com/devtrack/entity/JobApplication.java`
- **Acceptance Criteria**: `EXPLAIN ANALYZE` confirms index scan instead of sequential scan.
- **Suggested Branch**: `feature/dt-084-database-indexes`
- **Commit Message**: `perf(db): add composite indexes for user-scoped filtering queries`
- **PR Title**: `perf(db): composite database indexes for queries`

### DT-085: Add Frontend Route Code Splitting with React.lazy
- **Description**: Lazy-load all dashboard page components using `React.lazy` and `Suspense`.
- **Files Likely to Change**: `frontend/src/App.jsx`
- **Acceptance Criteria**: Initial bundle size decreases significantly below 300 kB.
- **Suggested Branch**: `feature/dt-085-route-code-splitting`
- **Commit Message**: `perf(frontend): lazy load routes using React.lazy and Suspense`
- **PR Title**: `perf(frontend): route-level code splitting`

### DT-086: Add XSS Sanitization Filter for User Input
- **Description**: Sanitize HTML tags in job descriptions, problem notes, and project descriptions.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/security/XssSanitizer.java`
- **Acceptance Criteria**: `<script>` tags are neutralized before database persistence.
- **Suggested Branch**: `feature/dt-086-xss-sanitizer`
- **Commit Message**: `feat(security): add input sanitization for user-generated text fields`
- **PR Title**: `feat(security): XSS input sanitization filter`

### DT-087: Add Entity Audit Logging for Updates
- **Description**: Log `created_by` and `modified_by` user principal in audit listener.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/config/JpaConfig.java`, `backend/src/main/java/com/devtrack/security/SpringSecurityAuditorAware.java`
- **Acceptance Criteria**: Automatically tracks which authenticated user modified any entity.
- **Suggested Branch**: `feature/dt-087-audit-logging`
- **Commit Message**: `feat(audit): implement Spring Security AuditorAware for JPA`
- **PR Title**: `feat(audit): Spring Security AuditorAware integration`

### DT-088: Add Frontend Offline Network Reconnection Detection
- **Description**: Display subtle banner when browser loses internet connection.
- **Files Likely to Change**: `frontend/src/hooks/useNetworkStatus.js`, `frontend/src/components/layout/Layout.jsx`
- **Acceptance Criteria**: "You are offline" notification banner appears when network disconnects.
- **Suggested Branch**: `feature/dt-088-offline-detector`
- **Commit Message**: `feat(ui): add network connectivity hook and offline alert banner`
- **PR Title**: `feat(ui): offline network detection banner`

### DT-089: Add Strict CORS Configuration with Environment Variables
- **Description**: Externalize allowed CORS domains to `.env` / `application.yml` properties.
- **Files Likely to Change**: `backend/src/main/java/com/devtrack/config/SecurityConfig.java`
- **Acceptance Criteria**: Rejects origin requests from non-whitelisted domains.
- **Suggested Branch**: `feature/dt-089-strict-cors`
- **Commit Message**: `feat(security): externalize CORS origins to environment properties`
- **PR Title**: `feat(security): environment-driven strict CORS configuration`

### DT-090: Add Security Filter Chain Test Suite
- **Description**: Spring Security integration tests verifying unauthorized access returns HTTP 401/403.
- **Files Likely to Change**: `backend/src/test/java/com/devtrack/security/SecurityFilterChainTest.java`
- **Acceptance Criteria**: Verifies protected endpoints block requests missing valid Bearer token.
- **Suggested Branch**: `test/dt-090-security-tests`
- **Commit Message**: `test(security): add tests verifying JWT authentication filter chain`
- **PR Title**: `test(security): security filter chain test suite`

---

## Milestone 10: Testing, Deployment and Documentation (Tasks 91–100)

### DT-091: Add GitHub Actions CI Workflow for Backend
- **Description**: GitHub Actions YAML running `mvn test` on every push and pull request.
- **Files Likely to Change**: `.github/workflows/backend-ci.yml`
- **Acceptance Criteria**: Automated pipeline spins up PostgreSQL service and executes test suite.
- **Suggested Branch**: `ci/dt-091-backend-github-action`
- **Commit Message**: `ci(backend): add GitHub Actions workflow for maven build and test`
- **PR Title**: `ci(backend): GitHub Actions workflow`

### DT-092: Add GitHub Actions CI Workflow for Frontend
- **Description**: GitHub Actions pipeline checking frontend linting and `vite build`.
- **Files Likely to Change**: `.github/workflows/frontend-ci.yml`
- **Acceptance Criteria**: Workflow verifies zero build errors and reports bundle stats.
- **Suggested Branch**: `ci/dt-092-frontend-github-action`
- **Commit Message**: `ci(frontend): add GitHub Actions workflow for vite build validation`
- **PR Title**: `ci(frontend): GitHub Actions frontend build pipeline`

### DT-093: Add Multi-Stage Dockerfile for Spring Boot Backend
- **Description**: Efficient 2-stage Docker build separating Maven packaging and lightweight JRE runtime.
- **Files Likely to Change**: `backend/Dockerfile`, `.dockerignore`
- **Acceptance Criteria**: Produces slim distroless or alpine Docker image under 200MB.
- **Suggested Branch**: `feature/dt-093-backend-dockerfile`
- **Commit Message**: `ci(docker): add multi-stage Dockerfile for spring boot backend`
- **PR Title**: `ci(docker): multi-stage backend Dockerfile`

### DT-094: Add Multi-Stage Dockerfile with Nginx for Frontend
- **Description**: Containerize React Vite app with Nginx Alpine for production serving.
- **Files Likely to Change**: `frontend/Dockerfile`, `frontend/nginx.conf`
- **Acceptance Criteria**: Serves static assets with Gzip compression and client-side route fallback.
- **Suggested Branch**: `feature/dt-094-frontend-dockerfile`
- **Commit Message**: `ci(docker): add nginx production Dockerfile for react frontend`
- **PR Title**: `ci(docker): frontend Dockerfile with Nginx`

### DT-095: Update Docker Compose for Full Stack Local Deployment
- **Description**: Run Postgres, Backend, and Frontend simultaneously with a single `docker compose up`.
- **Files Likely to Change**: `docker-compose.yml`
- **Acceptance Criteria**: All 3 containers boot with health checks and network bridging.
- **Suggested Branch**: `feature/dt-095-fullstack-docker-compose`
- **Commit Message**: `ci(docker): configure full-stack multi-container docker compose setup`
- **PR Title**: `ci(docker): full-stack Docker Compose configuration`

### DT-096: Add OpenSearch / Database Healthcheck Endpoint
- **Description**: Spring Boot Actuator health endpoint exposing database connection status.
- **Files Likely to Change**: `backend/pom.xml`, `backend/src/main/resources/application.yml`
- **Acceptance Criteria**: `/actuator/health` returns `{"status":"UP"}` with database ping.
- **Suggested Branch**: `feature/dt-096-actuator-health`
- **Commit Message**: `feat(ops): add spring boot actuator health endpoint`
- **PR Title**: `feat(ops): Spring Boot Actuator health check`

### DT-097: Add React Component Test Suite with Vitest
- **Description**: Component tests for UI buttons, badges, modals, and input components.
- **Files Likely to Change**: `frontend/src/components/__tests__/Button.test.jsx`, `frontend/package.json`
- **Acceptance Criteria**: Vitest executes component render and click interaction tests.
- **Suggested Branch**: `test/dt-097-frontend-component-tests`
- **Commit Message**: `test(frontend): add vitest component tests for UI buttons and cards`
- **PR Title**: `test(frontend): Vitest UI component test suite`

### DT-098: Create Postman / Insomnia API Collection
- **Description**: Exportable JSON collection with preconfigured authentication header and environment variables.
- **Files Likely to Change**: `docs/DevTrack_Postman_Collection.json`
- **Acceptance Criteria**: Imports seamlessly into Postman with sample request bodies for every endpoint.
- **Suggested Branch**: `docs/dt-098-postman-collection`
- **Commit Message**: `docs(api): add exportable Postman API collection for all endpoints`
- **PR Title**: `docs(api): exportable Postman collection`

### DT-099: Write CONTRIBUTING.md Guidelines
- **Description**: Contribution standards, branching conventions, pull request checklist, and code style guide.
- **Files Likely to Change**: `CONTRIBUTING.md`
- **Acceptance Criteria**: Detailed guide for forks, PR format, commit conventions, and local review.
- **Suggested Branch**: `docs/dt-099-contributing-guide`
- **Commit Message**: `docs: add comprehensive CONTRIBUTING.md guide for developers`
- **PR Title**: `docs: developer contributing guidelines`

### DT-100: Create Milestone Release v1.0.0 Tag and Release Notes
- **Description**: Compile changelog of all completed modules, mark v1.0.0 tag, and document next cycle.
- **Files Likely to Change**: `CHANGELOG.md`, `README.md`
- **Acceptance Criteria**: Complete semantic versioned release document detailing features and architecture.
- **Suggested Branch**: `release/v1.0.0`
- **Commit Message**: `chore(release): prepare v1.0.0 release notes and documentation`
- **PR Title**: `chore(release): DevTrack v1.0.0 official release`

---
*Roadmap generated for DevTrack. Track progress in `docs/CONTRIBUTION_LOG.md`.*
