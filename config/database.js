const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

//serve per esportare il modello sequelize in modo che possa essere importato e utilizzato in altri file del progetto.
module.exports = sequelize;
