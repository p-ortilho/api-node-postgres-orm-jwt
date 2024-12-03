const express = require("express");
const Produto = require("../models/Produtos"); // Corrigido para Produto
const router = express.Router();
const autenticarToken = require("../middleware/auth");

// Listar todos os produtos
router.get("/", autenticarToken, async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Listar produto específico
router.get("/produto/:id", autenticarToken, async (req, res) => {
    try {
        const resultado = await Produto.findByPk(req.params.id);
        if (!resultado) {
            throw new Error("Produto não encontrado!");
        }
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Criar novo produto
router.post("/novo-produto", autenticarToken, async (req, res) => {
    const { nome, preco, estoque } = req.body;
    if (!nome || !preco || !estoque) {
        return res.status(400).json({ erro: "Campos obrigatórios: 'nome', 'preco', 'estoque'." });
    }
    try {
        const produto = await Produto.create({ nome, preco, estoque });
        res.status(201).json({ mensagem: "Produto adicionado com sucesso!", produto });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Atualizar produto
router.put("/atualizar/:id", autenticarToken, async (req, res) => {
    const { nome, preco, estoque } = req.body;
    const idProduto = parseInt(req.params.id, 10);
    try {
        const produto = await Produto.findByPk(idProduto);
        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado!" });
        }
        if (!nome && !preco && !estoque) {
            return res.status(400).json({ erro: "Informe os dados que deseja atualizar!" });
        }
        if (nome) produto.nome = nome;
        if (preco) produto.preco = preco;
        if (estoque) produto.estoque = estoque;
        await produto.save();
        res.status(200).json({ mensagem: "Produto atualizado com sucesso!", produto });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Deletar produto
router.delete("/deletar/:id", autenticarToken, async (req, res) => {
    const idProduto = parseInt(req.params.id, 10);
    try {
        const produto = await Produto.findByPk(idProduto);
        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado!" });
        }
        await produto.destroy();
        res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;