package com.devtrack;

import com.devtrack.entity.*;
import com.devtrack.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class DevTrackApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private CodingProblemRepository codingProblemRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private DailyGoalRepository dailyGoalRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void contextLoads() {
        assertThat(userRepository).isNotNull();
    }

    @Test
    void testUserCreation() {
        User user = User.builder()
                .username("testuser")
                .email("test@example.com")
                .password(passwordEncoder.encode("password123"))
                .fullName("Test User")
                .role(User.Role.USER)
                .isActive(true)
                .build();

        User saved = userRepository.save(user);
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getUsername()).isEqualTo("testuser");
        assertThat(saved.getEmail()).isEqualTo("test@example.com");
    }

    @Test
    void testJobApplicationCreation() {
        User user = userRepository.save(User.builder()
                .username("jobuser").email("jobuser@test.com")
                .password(passwordEncoder.encode("pass")).role(User.Role.USER).isActive(true).build());

        JobApplication job = JobApplication.builder()
                .user(user)
                .companyName("Google")
                .jobRole("Software Engineer")
                .status(JobApplication.Status.APPLIED)
                .applicationDate(LocalDate.now())
                .build();

        JobApplication saved = jobApplicationRepository.save(job);
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getCompanyName()).isEqualTo("Google");
        assertThat(jobApplicationRepository.countByUserId(user.getId())).isEqualTo(1);
    }

    @Test
    void testCodingProblemCreation() {
        User user = userRepository.save(User.builder()
                .username("coder").email("coder@test.com")
                .password(passwordEncoder.encode("pass")).role(User.Role.USER).isActive(true).build());

        CodingProblem problem = CodingProblem.builder()
                .user(user)
                .problemName("Two Sum")
                .platform("LeetCode")
                .difficulty(CodingProblem.Difficulty.EASY)
                .status(CodingProblem.Status.SOLVED)
                .solvedDate(LocalDate.now())
                .build();

        CodingProblem saved = codingProblemRepository.save(problem);
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getProblemName()).isEqualTo("Two Sum");
        assertThat(codingProblemRepository.countByUserIdAndStatus(user.getId(), CodingProblem.Status.SOLVED)).isEqualTo(1);
    }

    @Test
    void testSkillCreation() {
        User user = userRepository.save(User.builder()
                .username("skilled").email("skilled@test.com")
                .password(passwordEncoder.encode("pass")).role(User.Role.USER).isActive(true).build());

        Skill skill = Skill.builder()
                .user(user)
                .skillName("Java")
                .category("Backend")
                .proficiencyLevel(80)
                .isPrimary(true)
                .build();

        Skill saved = skillRepository.save(skill);
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getSkillName()).isEqualTo("Java");
        assertThat(skillRepository.existsByUserIdAndSkillName(user.getId(), "Java")).isTrue();
    }

    @Test
    void testProjectCreation() {
        User user = userRepository.save(User.builder()
                .username("builder").email("builder@test.com")
                .password(passwordEncoder.encode("pass")).role(User.Role.USER).isActive(true).build());

        Project project = Project.builder()
                .user(user)
                .projectName("DevTrack")
                .description("Developer productivity tracker")
                .status(Project.Status.IN_PROGRESS)
                .startDate(LocalDate.now())
                .build();

        Project saved = projectRepository.save(project);
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getProjectName()).isEqualTo("DevTrack");
    }

    @Test
    void testDailyGoalCreation() {
        User user = userRepository.save(User.builder()
                .username("goaler").email("goaler@test.com")
                .password(passwordEncoder.encode("pass")).role(User.Role.USER).isActive(true).build());

        DailyGoal goal = DailyGoal.builder()
                .user(user)
                .title("Study Spring Boot")
                .goalDate(LocalDate.now())
                .priority(DailyGoal.Priority.HIGH)
                .isCompleted(false)
                .build();

        DailyGoal saved = dailyGoalRepository.save(goal);
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getIsCompleted()).isFalse();
        assertThat(dailyGoalRepository.countByUserIdAndIsCompleted(user.getId(), false)).isEqualTo(1);
    }
}
