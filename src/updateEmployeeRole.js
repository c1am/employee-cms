// Function for all tables
const inquirer = require('inquirer');

const updateEmployeeRole = (connection) => {

  // Get all employees
  connection.query("SELECT CONCAT(id,':',first_name, ' ', last_name) AS empl FROM employee where manager_id is not NULL ORDER BY id", (err, res) => {
    if (err) throw err;
    let employees = [];

    for(i=0; i<res.length; i++) {
      employees.push(res[i].empl);
    }

    // Prompt user to select one employee
    inquirer.prompt(
      questions = [{
        type: "list",
        name: "empl_id",
        message: "Please select an employee to update his/her role: ",
        choices: employees
      }]
    )

    .then((data) => {
      const employee_id = data.empl_id.split(':')[0];
      const employee_name = data.empl_id.split(':')[1];

      // Get all roles
      connection.query("SELECT CONCAT(id,':',title) AS title FROM role ORDER BY id", (err1, res1) => {
        if (err1) throw err1;
        let roles = [];

        for(i=0; i<res1.length; i++) {
          roles.push(res1[i].title);
        } 

        // Prompt user to select one role
        inquirer.prompt(
          questions = [{
            type: "list",
            name: "role_id",
            message: "Please select role: ",
            choices: roles
          }]
        )

        .then((data) => {
          const role_id = data.role_id.split(':')[0];
          const role_name = data.role_id.split(':')[1];
          
          // Get employees' previous role
          query = `select title from role where id = ${role_id}`;
          connection.query(query, (err2, res2) => {
            if (err1) throw err1;
            console.log(`${employee_name}'s previous role: ${res2[0].title}`);

            // Update old employee role with newly selected role
            query = `UPDATE employee SET role_id = ${role_id} where id = ${employee_id}`;
            connection.query(query, (err3, res3) => {
              if (err3) throw err3;

              // Display data for this employee for updated role
              query = `SELECT e.first_name, e.last_name, title, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee as e LEFT JOIN employee AS m ON m.id = e.manager_id LEFT JOIN role as r on e.role_id = r.id WHERE e.id = ${employee_id}`;
              connection.query(query, (err4, res4) => {
                const bonus = require('./bonus');
                if (err4) throw err4;
                console.table(res4);
                bonus(connection);
              });
            });
          });
        });
      });
    });
  });
}

module.exports = updateEmployeeRole;