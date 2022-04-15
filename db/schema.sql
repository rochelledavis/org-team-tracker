DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    dept_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    role_id INTEGER PRIMARY KEY AUTO_INCREMENT, 
    job_title VARCHAR(30) NOT NULL,
    role_salary INTEGER,
);

CREATE TABLE employee(
    employee_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_name VARCHAR(30) NOT NULL,
);