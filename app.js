const consoleTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');
const questions = require('./questions');

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
    const query = connection.query("SELECT * FROM employee", (err, res)=>{
        if (err) throw err;
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
function startQ() {
    inquirer.prompt(questions.module).then( response => {
        switch (response.functions) {
            case 'addDepartments':
                addDepartments('example');
                break;
            case 'addRoles':
                addRoles('coder', 50000, 3);
                break;
            case 'addEmployees':
                addEmployees('Humbracht', 'John', 2, 3);
                break;
            case 'viewDepartments':
                viewDepartments();
                break;
            case 'viewRoles':
                viewRoles();
                break;
            case 'viewEmployees':
                viewEmployees();
                break;
            case 'updateRoles':
                updateRoles();
                break;
            case 'updateManagers':
                updateManagers();
                break;
            case 'viewByMngr':
                viewByMngr();
                break;
            case 'deleteDept':
                deleteDept(response);
                break;
            case 'deleteRole':
                deleteRole(response);
                break;
            case 'deleteEmployee':
                deleteEmployee(response);
                break;
            case 'endProgram':
                endProgram();
                break;
            default: console.log('default switch');
        }
        startQ();
    });
} startQ();