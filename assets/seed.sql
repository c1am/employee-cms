-- Use database
USE employeeDB;


-- Populate department table
DELETE FROM department;
INSERT INTO department (name) VALUES
('Sales'),
('Telecommunications'),
('Field Services'),
('Human Resources');


-- Populate role table
DELETE FROM role;
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 150000, 1),
('Sales Person', 100000, 1),
('Telecom Manager', 180000, 2),
('Telecom Supervisor', 180000, 2),
('Telecom Technician', 120000, 2),
('Field Service Manager', 120000, 3),
('Field Service Technician', 100000, 3),
('Project Technician', 75000, 3),
('Human Resources Manager', 70000, 4),
('Human Resources Supervisor', 70000, 4);


-- Populate employee table
DELETE FROM employee;
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Anne', 'Greyburg', 1, NULL),
('Patrick', 'Thomas', 2, 1),
('Katelyn', 'Mullen', 3, NULL),
('Matthew', 'Pewter', 4, 3),
('Bill', 'Thompson', 5, 4),
('Erik', 'Copper', 6, NULL),
('Jun', 'Kim', 7, 6),
('Beatrice', 'Duncan', 8, 7),
('Yunat', 'Pesha', 9, NULL),
('Lucas', 'Howard', 10, 9);