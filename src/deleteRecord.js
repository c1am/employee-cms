const inquirer = require('inquirer');

const deleteRecord = (connection, action, table) => {
  switch(table) {
      case "Employee":

          // Get all employees
          connection.query("SELECT CONCAT(id,':',first_name, ' ', last_name) AS empl FROM employee ORDER BY id", (err, res) => {
            if (err) throw err;
            let employees = [];

            for(i=0; i<res.length; i++) {
              employees.push(res[i].empl);
            }

            // Prompt user to select an employee to delete
            inquirer.prompt(
              questions = [{
                type: "list",
                name: "empl",
                message: "Please select an employee to delete: ",
                choices: employees
              }]
            )

            .then((data) => {
              query = `DELETE FROM employee WHERE id = ${data.empl.split(':')[0]}`;
              connection.query(query, (err1, res1) => {
                if (err1) throw err1;
                const viewTable = require('./viewTable');

                // Display employees to show updated employee list
                viewTable(connection, "Delete", "Employee");
              });
            });
          });
          break;

      case "Role":

          // Get all roles
          connection.query("SELECT title FROM role ORDER BY id", (err, res) => {
            if (err) throw err;
            let roles = [];
            
            for(i=0; i<res.length; i++) {
              roles.push(res[i].title);
            }

            // Prompt user to select a role to delete
            inquirer.prompt(
              questions = [{
                type: "list",
                name: "title",
                message: "Please select a role to delete: ",
                choices: roles
              }]
            )

            .then((data) => {
              query = `DELETE FROM role WHERE title = '${data.title}'`;
              connection.query(query, (err1, res1) => {
                if (err1) throw err1;
                const viewTable = require('./viewTable');

                // Display roles to show updated role list
                viewTable(connection, "Delete", "Role");
              });
            });
          });
          break;

      case "Department":

          // Get all departments
          connection.query("SELECT NAME FROM department ORDER BY NAME", (err, res) => {
            if (err) throw err;
            let dept_names = [];
            
            for(i=0; i<res.length; i++) {
              dept_names.push(res[i].NAME);
            }

            // Prompt user to select depratment to delete
            inquirer.prompt(
              questions = [{
                type: "list",
                name: "dept_name",
                message: "Please select a department to delete: ",
                choices: dept_names
              }]
            )

            .then((data) => {
              query = `DELETE FROM department WHERE name = '${data.dept_name}'`;
              connection.query(query, (err1, res1) => {
                if (err1) throw err1;
                const viewTable = require('./viewTable');

                // Display departments to show updated department list
                viewTable(connection, "Delete", "Department");
              });
            });
          });
          break;
  }
}

module.exports = deleteRecord;