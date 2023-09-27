'use strict';

const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  const data = JSON.parse(fs.readFileSync("./data/products.json","utf-8"))
        .map((item) =>{
            item.createdAt = item.updatedAt = new Date()
          return item
        })

   return queryInterface.bulkInsert("Products", data )
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Products", null, {})
  }
};
