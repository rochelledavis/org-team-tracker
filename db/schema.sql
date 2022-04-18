DROP DATABASE IF EXISTS org_team_tracker;
CREATE DATABASE org_team_tracker;
USE org_team_tracker;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTO_INCREMENT, 
    job_title VARCHAR(30) NOT NULL,
    role_salary DECIMAL,
    dept_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (dept_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INTEGER,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
);