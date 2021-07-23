// actions
const viewTable = require('./viewTable');
const addRec = require('./addRecord');
const deleteRecord = require('./deleteRecord');
const budget = require('./budget');
const managerViewEmployee = require('./managerViewEmployee');
const updateManager = require('./updateManager');
const updateEmployeeRole = require('./updateEmployeeRole');

// all these actions are based on whatever menu item user chose
const actions = (connection, action, table) => {
    // console.log(action);
    switch(action) {
        case "View":
            viewTable(connection, action, table);
            break;
        case "Add":
            addRec(connection, action, table);
            break;
        case "Delete":
            deleteRecord(connection, action, table);
            break;
        case "Update Employee Role":
            updateEmployeeRole(connection, action, table);
            break;
        case "Update Employee Manager":
            updateManager(connection, action, table);
            break;
        case "View Employees by Manager":
            managerViewEmployee(connection, action, table);
            break;
        case "Department Budget":
            budget(connection);
            break;
        }
}

// export 
module.exports = actions;