CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  language VARCHAR(100),
  stars INT DEFAULT 0,
  forks INT DEFAULT 0,
  topics VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  proficiency INT DEFAULT 0
);


CREATE TABLE IF NOT EXISTS experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  start_date DATE,
  end_date DATE,
  description TEXT
);


CREATE TABLE IF NOT EXISTS site_visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  page VARCHAR(255),
  visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  experience VARCHAR(100),
  focus VARCHAR(255),
  availability VARCHAR(100)
);

INSERT INTO profile (name) VALUES
('Rohit Kumar');

UPDATE profile SET
  location = 'Gurugram',
  experience = '4 years',
  focus = 'DevOps / SRE / Cloud',
  availability = 'Open to work'
WHERE id = 1;

CREATE TABLE IF NOT EXISTS certifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  issuer VARCHAR(255),
  year VARCHAR(10),
  url VARCHAR(500)
);

INSERT INTO certifications (name, issuer, year, url) VALUES
('AWS Certified Solutions Architect – Associate', 'AWS', '2024', ''),
('Certified Kubernetes Administrator (CKA)', 'CNCF', '2024', ''),
('HashiCorp Certified: Terraform Associate', 'HashiCorp', '2023', '');