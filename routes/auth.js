const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
require('dotenv').config();

const router = express.Router();

const chaveSecretaJWT = process.env.JWT_SECRET;

// Rota de cadastro
router.post("/registrar", async (req, res) => {
    const { email, senha } = req.body;

    try 
    {
        const usuarioExistente = await Usuario.findOne({ where: { email } });

        if (usuarioExistente) 
        {
            return res.status(400).json({ erro: "Usuário existente!" });
        }

        await Usuario.create({ email, senha });

        res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
    } 
    catch (error) 
    {
        res.status(500).json({ erro: error.message });
    }
});

// Rota de login
router.post("/login", async (req, res) => { 
    const { email, senha } = req.body;

    try 
    {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) 
        {
            return res.status(404).json({ erro: "Usuário não encontrado!" });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) 
        {
            return res.status(401).json({ erro: "Senha inválida!" });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, chaveSecretaJWT, { expiresIn: "1h" });
        
        res.status(200).json({ mensagem: "Login efetuado!", token });
    } 
    catch (error) 
    {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;