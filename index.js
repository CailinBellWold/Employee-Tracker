// TO DO: Figure out how to push to the screen the employee/role basic info, but return into the variable the ID for those items.
// Validate Employees, Roles and Departments against existing.
// Validate salary as a number

// NPM Packages
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table')
const colors = require('colors');

// Dependencies
const connection = require('./config/connection');

// Arrays
const employeeArr = () => {
  connection.query('SELECT * from employee', function(err, res) {
    if (err) throw err;
    const employeeArr = [];
    res.forEach(({ first_name }) => employeeArr.push(first_name + last_name));
    connection.end();
    return employeeArr;
  })
};

const roleArr = () => {
  connection.query('SELECT * FROM role', function(err, res) {
    if (err) throw err;
    const roleArr = [];
    res.forEach(({ title }) => roleArr.push(title));
  connection.end();
  return roleArr;
  })
};

const departmentArr = () => {
  connection.query('SELECT * from department', function(err, res) {
    if (err) throw err;
    const departmentArr = [];
    res.forEach(({ department_name }) => departmentArr.push(department_name));
  return departmentArr;
  })
};

// Colorized Fonts and Other Default Language
const welcomeMsg = `* * * * WELCOME TO EMPLOYEE TRACKER. * * * *\n`.underline.green;
const error = `\r\n>> ERR: `.red.bold;
const noInfoEntered = `No information was entered.`;

// Welcome and Instructions
const welcome = () => {
  return inquirer
  .prompt([
    {
      type: 'input',
      name: 'welcome',
      message: welcomeMsg + '\nYou will have the opportunity to access and edit information about employees, roles and departments. \nLet\'s begin. Press ENTER to continue.\n',
    },
  ])
  .then(startPrompts)
};

const startPrompts = () => {
  return inquirer
    .prompt([
      {
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
          'EMPLOYEES: View all',
          'EMPLOYEES: Add',
          'EMPLOYEES: Update role',

          'ROLES: View all',
          'ROLES: Add',

          'DEPARTMENTS: View all',
          'DEPARTMENTS: Add',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'EMPLOYEES: View all':
          viewEmployees();
          break;

        case 'EMPLOYEES: Add':
          addEmployee();
          break;

        case 'EMPLOYEES: Update role':
          updateEmployeeRole();
          break;

        case 'ROLES: View all':
          viewRoles();
          break;

        case 'ROLES: Add':
          addRole();
          break;

        case 'DEPARTMENTS: View all':
          viewDepartments();
          break;

        case 'DEPARTMENTS: Add':
          addDepartment();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

// CRUD Functions

// CREATE (Add)
const addEmployee = () => {
  return inquirer
  .prompt([
    {
      name: 'first_name',  
      type: 'input',
      message: 'Input Employee\'s FIRST NAME.',
      validate: first_name => {
        if (first_name) {
          return true;
          } else {
            console.log (error + noInfoEntered + `Please enter the Employee\'s FIRST NAME.`);
            return false; 
          }
      },
    },
    {
      name: 'last_name',  
      type: 'input',
      message: ({ first_name }) => `Input ${first_name}\'s LAST NAME.`,
      validate: last_name => {
        if (last_name) {
          return true;
        } else {
          ({ first_name }) => console.log (error + noInfoEntered + `Please enter ${first_name}\'s LAST NAME.`);
          return false; 
        }
      },
    },
    {
      name: 'role',  
      type: 'input',
      message: ({ first_name, last_name }) => `Input ${first_name + last_name}\'s ROLE by scrolling through the menu below.`,
      choices: roleArr()
    },
    {
      name: 'manager',  
      type: 'input',
      message: ({ first_name, last_name }) => `Input ${first_name + last_name}\'s MANAGER by scrolling through the menu below.`,
      choices: employeeArr()
    },
  ])
  .then((answers) => {
    let roleID = roleArr().indexOf(val.role) +1
    let managerID = employeeArr().indexOf(val.employee) + 1
    let query = 'INSERT INTO employees SET ?';
    connection.query(query,
      {
        first_name: answers.first_name,
        last_name: answers.last_name,
        role_id: roleID,
        manager_id: managerID
      },
      (err, res) => {
        if (err) throw err;
        console.log(`${answer.first_name} ${answer.last_name} was successfully added. \n`);
        startPrompts();
      }
    );
    connection.end;
  })
};

const addRole = () => {
  return inquirer
  .prompt([
    {
      name: 'title',  
      type: 'input',
      message: 'Input new ROLE (title).',
      validate: title => {
        if (title) {
          return true;
          } else {
            console.log (error + noInfoEntered + `Please enter a new ROLE (title).`);
            return false; 
          }
      },
    },
    {
      name: 'salary',  
      type: 'input',
      message: ({ title }) => `Input the ${title}\'s SALARY.`,
      validate: salary => {
        if (salary) {
          return true;
        } else {
          ({ title }) => console.log (error + noInfoEntered + `Please enter the ${title}\'s SALARY.`);
          return false; 
        }
      },
    },
    {
      name: 'department',  
      type: 'input',
      message: ({ title }) => `Input ${title}\'s DEPARTMENT by scrolling through the menu below.`,
      choices: departmentArr()
    },
  ])
  .then((answers) => {
    let departmentID = departmentArr().indexOf(val.department) +1
    let query = 
    connection.query(
      'INSERT INTO role SET ?',
      {
        title: answers.title,
        salary: answers.salary,
        department_id: departmentID
      },
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} The Role has been added.\n`);
        startPrompts();
      }
    );
    connection.end;
  })
};

const addDepartment = () => {
  return inquirer
    .prompt([
    {
      name: 'departmentName',  
      type: 'input',
      message: 'Input new DEPARTMENT NAME.',
      validate: departmentName => {
        if (departmentName) {
          return true;
          } else {
            console.log (error + noInfoEntered + `Please enter a new DEPARTMENT NAME.`);
            return false; 
          }
      },
    },
  ])
  .then((answers) => {
    const query = 'INSERT INTO department SET ?';
    connection.query(query, [
      {
        department_name: answers.departmentName,
      },
    ],
    (err, res) => {
      if (err) throw err;
    },
    console.log(`${res.affectedRows} The Department has been added.\n`)
    );
    connection.end;
  }
};

// READ (View)
function viewEmployees() {
  let query = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name `;
  query += `CONCAT (e.first_name, ' ', e.last_name) AS Manager `
  query += `FROM employee `
  query += `INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id `;
  query += `LEFT JOIN employee e ON employee.manager_id = e.id `
  query += `ORDER BY last_name ASC`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    connection.end;
  })
  startPrompts()
}

const viewRoles = () => {
  let query = `SELECT * FROM roles`;
  query += `INNER JOIN department ON role.department_id = department.id`;
  query += `ORDER BY title`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    connection.end;
  })
  startPrompts()
}

const viewDepartments = () => {
  let query = `SELECT * FROM departments `;
  query += `ORDER BY department_name`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    connection.end;
  })
  startPrompts()
}

// UPDATE 
const updateEmployeeRole = () => {
  return inquirer
    .prompt([
      {
        name: 'employee',  
        type: 'input',
        message: `Select the employee whose ROLE you would like to UPDATE by scrolling through the menu below.`,
        choices: employeeArr()
      },
    {
      name: 'role',  
      type: 'input',
      message: ({ employee }) => `Input ${employee}\'s ROLE by scrolling through the menu below.`,
      choices: roleArr()
    },
  ])
  .then(answers => {
    const roleID = roleArr().indexOf(val.role) +1
    const managerID = employeeArr().indexOf(val.employee) + 1
    connection.query(
      'INSERT INTO employees SET ?',
      {
        first_name: answers.first_name,
        last_name: answers.last_name,
        manager_id: managerID,
        role_id: roleID
      },
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} The Employee has been added.\n`);
      }
    );
    connection.end;
  }),
  startPrompts()
};

// DELETE (currently empty)

// Function to Initialize App
const init = () => welcome()

// Initialize App
init();