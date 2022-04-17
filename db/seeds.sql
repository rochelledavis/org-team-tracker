INSERT INTO department (dept_name)
VALUES
('Operations'),
('Customer Service'),
('Inventory'),
('Marketing');

INSERT INTO role(job_title, role_salary, dept_id)
VALUES
('CEO', 200000, 1),
('COO', 180000, 1),
('CFO', 160000, 1),
('Customer Service Manager', 100000, 2),
('Customer Service Rep', 50000, 2),
('Inventory Manager', 110000, 3),
('Marketing Manager', 110000, 4),
('Product Manager', 110000, 4),
('Content Creator', 50000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Chloe', 'Richards', 1, 1),
('Brielle', 'Richards', 2, 1),
('Kolten', 'Davis', 3, 1),
('Paislee', 'Richards', 4, 2),
('Owen', 'Richards', 5, 4),
('Adalyn', 'Davis', 6, 3),
('Kaydence', 'Richards', 7, 1),
('Devin', 'Davis', 8, 1),
('Dustin', 'Davis', 9, 7);
