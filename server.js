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
        const sql = "INSERT INTO department (dept_name) VALUES (?)";
        db.query(sql, answer.department, (err, res) => {
            if (err) throw err;
            console.log('Department added');
            viewDepartments();
            selectAction();
        })
    });
};
//Option: add a role, display prompts to enter name, salary, department for the role and that role is added to the database
addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Enter the name of the role you would like to add.',
            validate: role => {
                if (role) {
                    return true;
                } else {
                    console.log(`Please enter a role name!`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?',
            validate: salary => {
                if (salary) {
                    return true;
                } else {
                    console.log(`Please enter a salary!`);
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const params = [answer.role, answer.salary];
        const addRoleSQL = 'SELECT * FROM department';
        db.query(addRoleSQL, (err, data) => {
            if (err) throw err;

            const department = data.map(({ dept_name, id }) => ({ dept_name: dept_name, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'What department is this role is in?',
                    choices: department
                }
            ])
            .then(deptAnswer => {
                const dept = deptAnswer.dept;
                params.push(dept);

                const sql = 'INSERT INTO role (job_title, role_salary, dept_id) VALUES (?, ?, ?)';

                db.query(sql, params, (err, res) => {
                    if (err) throw err;
                    console.log('Role added!');
                    selectAction();
                })
            });
        });
    });
};
//Option: add an employee, display prompts to enter first name, last name, role, manager, and that employee is added to the database
addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee',
            validate: first_name => {
                if (first_name) {
                    return true;
                } else {
                    console.log(`Please enter a first name!`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee',
            validate: last_name => {
                if (last_name) {
                    return true;
                } else {
                    console.log(`Please enter a last name!`);
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const params = [answer.first_name, answer.last_name];
        const addRoleSQL = 'SELECT * FROM role';
        db.query(addRoleSQL, (err, data) => {
            if (err) throw err;

            const role = data.map(({ id, job_title }) => ({ job_title: job_title, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'What role of this employee?',
                    choices: role
                }
            ])
            .then(roleAnswer => {
                const roles = roleAnswer.role;
                params.push(roles);

                const managerSQL = 'SELECT * FROM employee';

                db.query(managerSQL, (err, data) => {
                    if (err) throw err;
                    const managersList = data.map(({ id, first_name, last_name}) => ({ first_name: first_name, last_name: last_name, value: id }));
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: `Select the employee's manager`,
                            choices: managersList
                        }
                    ])
                    .then(managerAnswer => {
                        const manager = managerAnswer.manager;
                        params.push(manager);

                        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';

                        db.query(sql, params, (err, res) => {
                            if (err) throw err;
                            console.log('Employee added!')
                            selectAction();
                        })
                    });
                });
            });
        });
    });
};
//Option: update an employee role, display prompts to select an employee to update and their new role and it's updated in the database
updateEmployee = () => {
    const getEmployees = 'SELECT'
}
//Option:quit
quit = () => {
    db.end();
}

selectAction();