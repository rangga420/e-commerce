'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Balances", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users'
      }
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Balances", "UserId")
  }
};
