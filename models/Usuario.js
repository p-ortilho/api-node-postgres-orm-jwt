const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const Usuario = sequelize.define("Usuario", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }}, 
    {
        tableName: "usuarios",
        timestamps: false,

});

Usuario.beforeCreate(async (usuario) => {usuario.senha = await bcrypt.hash(usuario.senha, 10)});

module.exports = Usuario;