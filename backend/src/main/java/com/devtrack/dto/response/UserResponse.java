package com.devtrack.dto.response;

import com.devtrack.entity.User;
import java.time.LocalDateTime;

public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String bio;
    private String avatarUrl;
    private String githubUrl;
    private String linkedinUrl;
    private String websiteUrl;
    private User.Role role;
    private LocalDateTime createdAt;

    public UserResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getWebsiteUrl() { return websiteUrl; }
    public void setWebsiteUrl(String websiteUrl) { this.websiteUrl = websiteUrl; }

    public User.Role getRole() { return role; }
    public void setRole(User.Role role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static UserResponse from(User user) {
        UserResponse resp = new UserResponse();
        resp.setId(user.getId());
        resp.setUsername(user.getUsername());
        resp.setEmail(user.getEmail());
        resp.setFullName(user.getFullName());
        resp.setBio(user.getBio());
        resp.setAvatarUrl(user.getAvatarUrl());
        resp.setGithubUrl(user.getGithubUrl());
        resp.setLinkedinUrl(user.getLinkedinUrl());
        resp.setWebsiteUrl(user.getWebsiteUrl());
        resp.setRole(user.getRole());
        resp.setCreatedAt(user.getCreatedAt());
        return resp;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final UserResponse resp = new UserResponse();
        public Builder id(Long id) { resp.setId(id); return this; }
        public Builder username(String username) { resp.setUsername(username); return this; }
        public Builder email(String email) { resp.setEmail(email); return this; }
        public Builder fullName(String fullName) { resp.setFullName(fullName); return this; }
        public Builder bio(String bio) { resp.setBio(bio); return this; }
        public Builder avatarUrl(String avatarUrl) { resp.setAvatarUrl(avatarUrl); return this; }
        public Builder githubUrl(String githubUrl) { resp.setGithubUrl(githubUrl); return this; }
        public Builder linkedinUrl(String linkedinUrl) { resp.setLinkedinUrl(linkedinUrl); return this; }
        public Builder websiteUrl(String websiteUrl) { resp.setWebsiteUrl(websiteUrl); return this; }
        public Builder role(User.Role role) { resp.setRole(role); return this; }
        public Builder createdAt(LocalDateTime createdAt) { resp.setCreatedAt(createdAt); return this; }
        public UserResponse build() { return resp; }
    }
}
