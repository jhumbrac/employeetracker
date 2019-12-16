const introQ = [
    {
        type: 'rawlist',
        name: 'intro',
        message: 'Hello! How can I help you today?',
        choices: ['Employees', 'Departments', 'Roles']
    }
];
exports.module = introQ;
const questions = [
    {
        type: 'rawlist',
        name: 'functions',
        message: 'Choose a function',
        choices: ['addDepartments', 'addRoles', 'addEmployees', 'viewDepartments', 'viewRoles', 'viewEmployees', 'updateRoles', 'updateManagers', 'viewByMngr', 'deleteDept', 'deleteRole', 'deleteEmployee','endProgram'],
        filter: function(val){
            return val;
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'input id',
        when: function(answers){
            return answers.functions === 'deleteDept' || answers.functions === 'deleteRole' || answers.functions === 'deleteEmployee';
        }
    }
];
exports.module = questions;

const employeeQ = [
    {
        type: 'rawlist',
        name: 'employeeOptions',
        message: 'What would you like to do?',
        choices: ['viewEmployees', 'addEmployees', 'deleteEmployee']
    }
];
exports.module = employeeQ;

switch (response.functions) {
    case 'addDepartments':
        addDepartments();
        break;
    case 'addRoles':
        addRoles();
        break;
    case 'addEmployees':
        addEmployees();
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