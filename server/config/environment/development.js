'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connecton opions
  sequelize: {
    uri: '',
    options: {
      logging: console.log,
      define: {
        timestamps: false
      },
      dialect: "postgres",
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true
        }
      }
    }
  },

  // Seed database on startup
  seedDB: true

};