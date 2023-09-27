'use strict';

const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"))
      .map((item) => {
        item.createdAt = item.updatedAt = new Date()
        return item
      })

    return queryInterface.bulkInsert("Products", data)
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products", null, {})
  }
};
