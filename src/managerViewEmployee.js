// Function for all tables
const inquirer = require('inquirer');

const viewEmployeeByManager = (connection) => {

  // Get all managers
  connection.query("SELECT CONCAT(id,':',first_name, ' ', last_name) AS manager FROM employee where manager_id is NULL ORDER BY id", (err, res) => {
    if (err) throw err;
    let managers = [];
    
    for(i=0; i<res.length; i++) {
      managers.push(res[i].manager);
    }

    // Prompt for one manager
    inquirer.prompt(
      questions = [{
        type: "list",
        name: "manager_id",
        message: "Please a manager to view his/her employee(s): ",
        choices: managers
      }]
    )

    // Display selected manager's employee(s)
    .then((data) => {
      query = `SELECT first_name, last_name, title, salary FROM employee as e LEFT JOIN role as r on e.role_id = r.id WHERE manager_id = ${data.manager_id.split(':')[0]}`;
      connection.query(query, (err1, res1) => {
        const bonus = require('./bonus');
        if (err1) throw err1;

        // Log the list of that manager's employee(s) in console
        console.log(`Employee List for: ${data.manager_id.split(':')[1]}`);
        console.table(res1);
        bonus(connection);
      });
    });

  });
}

module.exports = viewEmployeeByManager;