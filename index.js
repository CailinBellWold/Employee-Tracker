//TO DO: Figure out how to push to the screen the employee/role basic info, but return into the variable the ID for those items.

// NPM Packages
const mysql = require('mysql');
const inquirer = require('inquirer');
const colors = require('colors');

// Dependencies
const createConnection = require('./config/connection');

// Arrays
const employeeArr = () => {
  const employeeArr = [];
  results.forEach(({ first_name }) => {
    choiceArray.push(first_name + last_name);
  });
  return employeeArr;
};

const roleArr = () => {
  const roleArr = [];
  results.forEach(({ title }) => {
    choiceArray.push(title);
  });
  return roleArr;
},

// Colorized Fonts and Other Default Language
const welcomeMsg = `* * * * WELCOME TO EMPLOYEE TRACKER. * * * *\n`.underline.green;
const error = `\r\n>> ERR: `.red.bold;
const noInfoEntered = `No information was entered.`;

// Welcome and Instructions
const welcome = () => {
  return inquirer.prompt([
      {
          type: 'input',
          name: 'welcome',
          message: welcomeMsg + '\nYou will have the opportunity to access and edit information about employees, roles and departments. \nLet\'s begin. Press ENTER to continue.\n',
      },
      
  ])
  .then(startPrompts)
};

const startPrompts = () => {
  inquirer
    .prompt({
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
    })

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
  })
};

// READ (View)
const viewEmployees = () => {
  connection.query('SELECT * FROM employees', (err, res) => {
    if (err) throw err;
    console.table(res);
    connection.end;
  }),
  startPrompts()
}

const viewDepartments = () => {
  connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    console.table(res);
    connection.end;
  }),
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