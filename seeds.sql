USE employee_db;

INSERT INTO department (name)
VALUES ('Accounting'), ('Sales'), ('Engineering'), ('Human Resources'), ('R&D');

INSERT INTO role (title, salary, department_id)
VALUES ('Accounting Manager', 250000, 1), ('Sales Manager', 250000, 2), ('Engineering Manager', 250000, 3), ('HR Manager', 250000, 4), ('R&D Manager', 250000, 5), ('Accountant', 1000000, 1), ('Salesperson', 50000, 2), ('Engineer', 85000, 3), ('HR Associate', 40000, 4), ('Scientist', 120000, 5), ('Product Tester', 65000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Humbracht', 1, 1), ('Anthony', 'Cooper', 2, 2), ('Sasha', 'Peters', 3, 3), ('Jed', 'Kendal', 4, 4), ('Zach', 'Moscow', 5, 5), ('Nick', 'Cox', 6, 1), ('Austin', 'Williams', 7, 2), ('Zach', 'Talley', 7, 2), ('Jason', 'Hill', 8, 3), ('Zach', 'White', 8, 3), ('Eric', 'Simmons', 9, 4), ('Paul', 'Payton', 10, 5), ('Mario', 'Cortes', 10, 5), ('Michael', 'Robil', 11, 5);


SELECT * FROM employee LEFT JOIN role on employee.id WHERE role.id = role_id;