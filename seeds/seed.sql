USE employee_trackerDB;

----- DEPARTMENT SEEDS -----

INSERT INTO department (id, department_name)
VALUES (1, 'Operations');

INSERT INTO department (id, department_name)
VALUES (2, 'Finance & Administration');

INSERT INTO department (id, department_name)
VALUES (3, 'Development');

----- ROLE SEEDS -----

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Executive Director', 200000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, 'Director of Operations', 150000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, 'Director of F&A', 150000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, 'Director of Development', 150000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, 'Programming Manager', 100000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, 'IT Manager', 100000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, 'Finance Manager', 100000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, 'Volunteer Manager', 100000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, 'Grants Manager', 60000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (10, 'Individual Giving Manager', 100000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (11, 'Corporate Gifts Manager', 100000, 3);

----- EMPLOYEE SEEDS -----

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Imani', 'Williams', 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, 'Darius', 'Hernandez', 2, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, 'Amy', 'Choi', 3, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, 'Dara', 'Sok', 4, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, 'Melissa', 'Brown', 5, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, 'Amira', 'Ali', 6, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, 'Alexus', 'Cole', 7, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, 'Lianne', 'Soon', 8, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, 'Jamal', 'Jones', 9, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, 'Pedro', 'Rodriguez',10, 4);
