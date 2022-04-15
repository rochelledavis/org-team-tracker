const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./config/connection');

//Present options to view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const selectAction = () =>{
    return inquirer.prompt([
        {
            type: 'list',
            name: 'actions',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']

        }
    ])
    .then((answers) => {
        const { actions } = answers;

        if (actions === "View all departments") {
            viewDepartments();
        } if (actions === "View all roles") {
            viewRoles();
        } if (actions === "View all employees") {
            viewEmployees();
        } if (actions === "Add a department") {
            addDepartment();
        } if (actions === "Add a role") {
            addRole();
        } if (actions === "Add an employee") {
            addEmployee();
        } if (actions === "Update an employee role") {
            updateEmployee();
        } if (actions === "Quit") {
            quit();
        };
    });
};

//Option: view all departments, then display table showing deparment names and department ids
viewDepartments = () => {
    console.log('Display departments table')
    selectAction();
}

//Option: view all roles, then display job title, role id, role department, role salary
viewRoles = () => {
    console.log('Display roles table')
    selectAction();
}
//Option: view all employees, then display a formatted table showing employee ids, first names, last names, job titles, departments, salaries, and managers that the employee reports to
viewEmployees = () => {
    console.log('Display employees table')
    selectAction();
}
//Option: add a department, display prompt to enter the name of the department and update the department in the database
addDepartment = () => {
    console.log('Display departments questions')
    selectAction();
}
//Option: add a role, display prompts to enter name, salary, department for the role and that role is added to the database
addRole = () => {
    console.log('Display new role questions')
    selectAction();
}
//Option: add an employee, display prompts to enter first name, last name, role, manager, and that employee is added to the database
addEmployee = () => {
    console.log('Display new employee questions')
    selectAction();
}
//Option: update an employee role, display prompts to select an employee to update and their new role and it's updated in the database
updateEmployee = () => {
    console.log('Display update employee questions')
    selectAction();
}
//Option:quit
quit = () => {
    selectAction();
}

selectAction();