const jwt = require("jsonwebtoken");
require('dotenv').config();

const chaveSecretaJWT = process.env.JWT_SECRET;

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) 
    {
        return res.status(401).json({ erro: "Token não fornecido!" });
    }

    try 
    {
        const usuario = jwt.verify(token, chaveSecretaJWT);
        req.usuario = usuario;
        next();
    } 
    catch (error) 
    {
        res.status(403).json({ erro: "Token inválido ou expirado!" });
    }
};

module.exports = autenticarToken;