const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./config/connection');
const { removeListener } = require('./config/connection');

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
};

//Option: view all departments, then display table showing deparment names and department ids

//Option: view all roles, then display job title, role id, role department, role salary

//Option: view all employees, then display a formatted table showing employee ids, first names, last names, job titles, departments, salaries, and managers that the employee reports to

//Option: add a department, display prompt to enter the name of the department and update the department in the database

//Option: add a role, display prompts to enter name, salary, department for the role and that role is added to the database

//Option: add an employee, display prompts to enter first name, last name, role, manager, and that employee is added to the database

//Option: update an employee role, display prompts to select an employee to update and their new role and it's updated in the database