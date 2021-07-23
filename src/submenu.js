const inquirer = require('inquirer');
const actions = require('./actions');

// Show tables
const subMenu = (connection, action) => {
  inquirer.prompt(

    // Submenu items
    questions = [{
        type: "list",
        name: "selection",
        message: `Please select ${action} menu option: `,
        choices: ["Employee", "Role", "Department", "Return to Main Menu"]
    }]        
  )

  .then((data) => {
      const main = require('./main');
      switch(data.selection) {
          case "Return to Main Menu":
              main(connection);
              break;
          default:
              actions(connection, action, data.selection);
              break;
      };
  });
}
 
module.exports = subMenu;