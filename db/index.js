const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'rf_e_commerce',
 'root',
 'Adarsh@28',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

module.exports = sequelize;