const { Sequelize } = require("sequelize");

// Configuração do Sequelize
const sequelize = new Sequelize("produtos_api", "postgres", "12345", {
    host: "localhost",
    dialect: "postgres", // Especifica o tipo de banco
    logging: false,      // Desativa os logs
});

module.exports = sequelize;