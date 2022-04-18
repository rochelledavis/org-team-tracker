const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./config/connection');

//Present options to take an action

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

//Option: view all departments, then display table showing department names and department ids
viewDepartments = () => {
    db.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        selectAction();
    })
}

//Option: view all roles, then display job title, role id, role department, role salary
viewRoles = () => {
    db.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        selectAction();
    })
}
//Option: view all employees, then display a formatted table showing employee ids, first names, last names, job titles, departments, salaries, and managers that the employee reports to
viewEmployees = () => {
    db.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        selectAction();
    })
}
//Option: add a department, display prompt to enter the name of the department and update the department in the database
addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department that you would like to add?',
            validate: department => {
                if (department) {
                    return true;
                } else {
                    console.log(`Please enter department name!`);
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const sql = "INSERT INTO department (dept_name) VALUES ?";
        db.query(sql, answer.department, (err, res) => {
            if (err) throw err;
            console.log('Department added');
            viewDepartments();
            selectAction();
        })
    })
    // .then((res) => {
    //     db.query("INSERT INTO department (dept_name) SET ?", {
    //         dept_name: res.department,
    //     },
    //     (err, res) => {
    //         if (err) throw err;
    //         console.log('Department added');
    //         viewDepartments();
    //         selectAction();
    //     });
    // });
};
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
    db.end();
}

selectAction();