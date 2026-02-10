CREATE DATABASE bugtracker;
USE bugtracker;

-- Users Table
CREATE TABLE users(
 id INT PRIMARY KEY AUTO_INCREMENT,
 full_name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 password_hash VARCHAR(255),
 role ENUM('ADMIN','DEVELOPER','TESTER','BA'),
 is_active BOOLEAN DEFAULT true
);

-- Projects Table
CREATE TABLE projects(
 id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(150),
 description TEXT
);

-- Project Assignments
CREATE TABLE project_users(
 project_id INT,
 user_id INT,
 FOREIGN KEY(project_id) REFERENCES projects(id),
 FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Bugs Table
CREATE TABLE bugs(
 id INT PRIMARY KEY AUTO_INCREMENT,
 title VARCHAR(200),
 description TEXT,
 priority ENUM('LOW','MEDIUM','HIGH','CRITICAL'),
 status ENUM('OPEN','IN_PROGRESS','RESOLVED','CLOSED') DEFAULT 'OPEN',
 screenshot VARCHAR(255),
 project_id INT,
 created_by INT,
 assigned_to INT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 FOREIGN KEY(project_id) REFERENCES projects(id),
 FOREIGN KEY(created_by) REFERENCES users(id),
 FOREIGN KEY(assigned_to) REFERENCES users(id)
);

-- Business Analyst Section
CREATE TABLE bug_business(
 bug_id INT PRIMARY KEY,
 user_story TEXT,
 acceptance_criteria TEXT,
 business_priority ENUM('LOW','MEDIUM','HIGH'),
 impact_analysis TEXT,
 FOREIGN KEY(bug_id) REFERENCES bugs(id)
);

-- Comments Table
CREATE TABLE comments(
 id INT PRIMARY KEY AUTO_INCREMENT,
 bug_id INT,
 user_id INT,
 comment TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY(bug_id) REFERENCES bugs(id),
 FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Activity Logs
CREATE TABLE activity_logs(
 id INT PRIMARY KEY AUTO_INCREMENT,
 bug_id INT,
 user_id INT,
 action VARCHAR(255),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
