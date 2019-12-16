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
]
exports.module = questions;