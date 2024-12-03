const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definição do modelo Produto
const Produto = sequelize.define("Produto", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    estoque: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
}, {
    tableName: "produtos", // Nome da tabela no banco
    timestamps: false,     // Desativa colunas automáticas createdAt e updatedAt
});

module.exports = Produto;
