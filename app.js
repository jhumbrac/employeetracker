const consoleTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Lespaul2",
    database: "employee_db"
});

connection.connect(function(err){
    if (err) throw err;
    return;
});
function table(message, response) {
    return console.table(message, response, "press any key");
};
function joinTable() {
    connection.query('SELECT * FROM employee LEFT JOIN role on role.id = role_id', (req, res)=>{
        if (err) throw err;
        table('View Employees', res);
    });
};
// add departments
function addDepartments(name) {
    const query = connection.query(
        "INSERT INTO department SET ?",
        { name: name },
        function(err, res) {
            if (err) throw err;
            let message = "View Departments";
            table(message, res);
        }
    );
}
function addRoles(title, salary, department_id) {
    const query = connection.query(
        "INSERT INTO role SET ?",
        {
            title: title,
            salary: salary,
            department_id: department_id
        },
        function(err, res) {
            if (err) throw err;
            console.table("View Roles", res, "press any key");
        }
    )
}
// add employees
function addEmployees(first_name, last_name, role_id, manager_id) {
    const query = connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name: first_name,
            last_name: last_name,
            role_id: role_id,
            manager_id: manager_id
        },
        function(err, res) {
            if (err) throw err;
            console.table('View Employees', res, "press any key");
        }
    )
}
// view departments
function viewDepartments() {
    const query = connection.query( "SELECT * FROM department", (err, res)=>{
        if (err) throw err;
        console.table("View Departments", res, "press any key");
    });
};
// view roles
function viewRoles() {
    const query = connection.query("SELECT * FROM role", (err, res)=>{
        if (err) throw err;
        console.table("View Roles", res, "press any key");
    });
};
// view employees
function viewEmployees() {
    //"SELECT * FROM employee"
    const query = connection.query('SELECT * FROM employee LEFT JOIN role on role.id = role_id', (err, res)=>{
        if (err) throw err;
        //joinTable();
        console.table("View Employees", res, "press any key");
    });
};
// update employee roles
function updateRoles() {
    const query = connection.query("UPDATE role SET title (title) WHERE id= (?)", (err, res)=>{
        if (err) throw err;
        console.table("View Roles", res, "press any key");
    });
};
// update employee managers
function updateManagers() {
    const query = connection.query("UPDATE employee SET manager_id (manager_id) WHERE id= (?)", (err,res)=>{
        if (err) throw err;
        console.log(`updateMngr: ${res}`);
    });
};
// view employees by manager
function viewByMngr() {
    const query = connection.query("SELECT * FROM employee WHERE manager_id= ?", 3, (err, res)=>{
        if (err) throw err;
        console.table("View Employees By Manager", res, "press any key");
    });
};
// delete departments, roles, and employees - optional
function deleteDept (response) {
    const query = connection.query("DELETE FROM department WHERE id= ?", [response.id], (err, res)=>{
        if (err) throw err;
        console.table("View Departments", res, "press any key");
    });
};
function deleteRole(response) {
    const query = connection.query("DELETE FROM role WHERE id= ?", [response.id], (err, res)=>{
        if (err) throw err;
        console.table("View Roles", res, "press any key");
    });
};
function deleteEmployee(response){
    const query = connection.query("DELETE FROM employee WHERE id= ?", [response.id], (err, res)=>{
        if (err) throw err;
        console.table("View Employees", res, "press any key");
    });
};
// view total utilized budge of a department - combined salaries of all employees in that department

function endProgram(){
    connection.end();
}
function rolessQ() {
    const rolesQ = [
        {
            type: 'rawlist',
            name: 'roleOptions',
            message: 'What would you like to do?',
            choices: ['View Roles', 'View Roles', 'Delete Roles', 'Go Back']
        }
    ];
    inquirer.prompt(rolesQ).then(response =>{
        switch (response.roleOptions) {
            case 'View Roles':
                viewRoles();
                rolesQ();
                break;
            case 'Add Department':
                addRoles();
                rolesQ();
                break;
            case 'Delete Department':
                viewRoles();
                inquirer.prompt(
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Input Role id for deletion',
                        filter: function(val){
                            return val;
                        }
                    }
                ).then( response => {
                    deleteRole(response);
                    rolesQ();
                });
                break;
            case 'Go Back':
                startQ();
            default: console.log('default switch');
        }
    })
};
function departmentsQ() {
    const departmentsQ = [
        {
            type: 'rawlist',
            name: 'departmentOptions',
            message: 'What would you like to do?',
            choices: ['View Departments', 'Add Departments', 'Delete Departments', 'Go Back']
        }
    ];
    inquirer.prompt(departmentsQ).then(response =>{
        switch (response.departmentOptions) {
            case 'View Departments':
                viewDepartments();
                departmentsQ();
                break;
            case 'Add Department':
                addDepartments();
                departmentsQ();
                break;
            case 'Delete Department':
                viewDepartments();
                inquirer.prompt(
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Input Department id for deletion',
                        filter: function(val){
                            return val;
                        }
                    }
                ).then( response => {
                    deleteDepartment(response);
                    departmentsQ();
                });
                break;
            case 'Go Back':
                startQ();
            default: console.log('default switch');
        }
    })
};
function employeesQ() {
    const employeeQ = [
        {
            type: 'rawlist',
            name: 'employeeOptions',
            message: 'What would you like to do?',
            choices: ['View Employees', 'Add Employee', 'Delete Employee', 'Go Back']
        }
    ];
    inquirer.prompt(employeeQ).then( response =>{
        switch (response.employeeOptions) {
            case 'View Employees':
                viewEmployees();
                employeesQ();
                break;
            case 'Add Employee':
                addEmployees();
                employeesQ();
                break;
            case 'Delete Employee':
                viewEmployees();
                inquirer.prompt(
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Input Employee id for deletion',
                        filter: function(val){
                            return val;
                        }
                    }
                ).then( response => {
                    deleteEmployee(response);
                    employeesQ();
                });
                break;
            case 'Go Back':
                startQ();
            default: console.log('default switch');
        }
    })
}
function startQ() {
    const introQ = [
        {
            type: 'rawlist',
            name: 'intro',
            message: 'Hello! How can I help you today?',
            choices: ['Employees', 'Departments', 'Roles']
        }
    ];
    inquirer.prompt(introQ).then( response => {
        switch (response.intro) {
            case 'Employees':
                employeesQ();
                break;
            case 'Departments':
                departmentsQ();
                break;
            case 'Roles':
                rolesQ();
                break;
            default: console.log('default switch');
        }
    });
} startQ();