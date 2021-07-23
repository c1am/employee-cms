const inquirer = require('inquirer');
const actions = require('./actions');

const bonusFunctions = (connection) => {
  inquirer.prompt(

      // Bonus menu items
      questions = [{
          type: "list",
          name: "selection",
          message: `Please select bonus menu option: `,
          choices: ["Update Employee Role", "Update Employee Manager", "View Employees by Manager", "Department Budget", "Return to Main Menu"]
        }]        
  )
  .then((data) => {
      const main = require('./main');
      switch(data.selection) {
          case "Return to Main Menu":
              main(connection);
              break;
          default:
              actions(connection, data.selection, '');
              break;
      };
  });
}

module.exports = bonusFunctions;