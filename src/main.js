const inquirer = require('inquirer');
const subMenu = require('./subMenu');
const bonus = require('./bonusFunctions');

// Main menu items
const main = (connection) => 
    inquirer.prompt(
        questions = [{
          type: "list",
          name: "selection",
          message: "Please select menu option: ",
          choices: ["View", "Add", "Delete", "Other (bonus) Functions", "Exit"]
        }]
      )

      .then((data) => {
        switch(data.selection) {
            case "Exit":
                connection.end();
                break;
            case "Other (bonus) Functions":
                bonus(connection);
                break;
            default:
                subMenu(connection, data.selection);
                break;
        }
      });

module.exports = main;