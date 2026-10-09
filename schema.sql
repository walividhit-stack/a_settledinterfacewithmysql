CREATE DATABASE IF NOT EXISTS scholarship_db;
USE scholarship_db;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS allocations (
    allocation_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    task_id INT,
    proof_hash VARCHAR(64),
    status VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
INSERT INTO users (name, email) VALUES ('Vidhit', 'vidhit@example.com');