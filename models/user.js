const Sequelize = require("sequelize");
const sequelize = new Sequelize("rf_e_commerce", "root", "Adarsh@28", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("Users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
});

sequelize.sync().then(() => {
  console.log('User table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = User;
