const inquirer = require('inquirer');

const addRecord = (connection, action, table) => {
  switch(table) {
      case "Employee":

        // Get all managers
        connection.query("SELECT CONCAT(id,':',first_name, ' ', last_name) AS manager FROM employee where manager_id is NULL ORDER BY id", (err, res) => {
          if (err) throw err;
          let managers = [];

          managers.push('0:None');
          for(i=1; i<res.length; i++) {
            managers.push(res[i].manager);
          }

          // Get all roles
          connection.query("SELECT CONCAT(id,':',title) AS title FROM role ORDER BY id", (err1, res1) => {
            if (err1) throw err1;
            let roles = [];

            for(i=0; i<res1.length; i++) {
              roles.push(res1[i].title);
            } 

            // Prompt user for input data
            inquirer.prompt(
              questions = [{
                type: "input",
                name: "first",
                message: "Please enter employee first name: "
              },
              {
                type: "input",
                name: "last",
                message: "Please enter employee last name: "
              },
              {
                type: "list",
                name: "role_id",
                message: "Please select role: ",
                choices: roles
              },
              {
                type: "list",
                name: "manager_id",
                message: "Please select manager: ",
                choices: managers
              }]
            )

            // Add new employee
            .then((data) => {
              let manager_id = data.manager_id.split(':')[0];
              if (manager_id === '0') {
                query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${data.first}', '${data.last}', ${data.role_id.split(':')[0]})`;
              }
              else {
                query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.first}', '${data.last}', ${data.role_id.split(':')[0]}, ${manager_id})`;
              }        

              connection.query(query, (err2, res2) => {
                if (err2) throw err2;
                const viewTable = require('./viewTable');

                // Display data to show new employee
                viewTable(connection, "Add", "Employee");
              });
            });
          });
        });
        break;

      case "Role":

        // Get all departments
        connection.query("SELECT CONCAT(id,':',name) AS ID_NAME FROM department ORDER BY id", (err, res) => {
          if (err) throw err;
          let depts = [];
          
          for(i=0; i<res.length; i++) {
            depts.push(res[i].ID_NAME);
          }

          // Prompt user for input data
          inquirer.prompt(
            questions = [{
              type: "input",
              name: "title",
              message: "Please enter Role name: "
            },
            {
              type: "input",
              name: "salary",
              message: "Please enter Role salary: "
            },
            {
              type: "list",
              name: "dept_id",
              message: "Please select department: ",
              choices: depts
            }]
          )

          // Add role to table
          .then((data) => {
            query = `INSERT INTO role (title, salary, department_id) VALUES ('${data.title}', ${data.salary}, ${data.dept_id.split(':')[0]})`;
            connection.query(query, (err1, res1) => {
              if (err1) throw err1;

              // Display data to show new role
              const viewTable = require('./viewTable');
              viewTable(connection, "Add", "Role");
            });
          }); 
        });     
        break;

      case "Department":

          // Prompt user for input data
          inquirer.prompt(
            questions = [{
              type: "input",
              name: "dept_name",
              message: "Please enter name of Department: "
            }]
          )

          .then((data) => {
            query = `INSERT INTO department (name) VALUES ('${data.dept_name}')`;
            connection.query(query, (err, res) => {
              if (err) throw err;
              const viewTable = require('./viewTable');

              // Display data to show new department
              viewTable(connection, "Add", "Department");
            });
          });
          break;
  }
}

module.exports = addRecord;