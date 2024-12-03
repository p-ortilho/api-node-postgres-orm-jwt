const express = require("express");
const sequelize = require("./config/database");
const produtosRoutes = require("./routes/produtos");
const authRoutes = require("./routes/auth"); // Adicione esta linha
require('dotenv').config(); // Adicione esta linha para carregar variáveis de ambiente

const app = express();
const port = 6000;

app.use(express.json());

async function sincronizarBancoDeDados() {
    try {
        await sequelize.sync();
        console.log("Banco de dados sincronizado");
    } 
    catch (error) 
    {
        console.log("Erro ao sincronizar banco de dados:", error);
    }
}

sincronizarBancoDeDados();

// Adicione as rotas de autenticação
app.use('/auth', authRoutes);
app.use('/produtos', produtosRoutes);

app.listen(port, () => console.log(`Servidor rodando na porta http://localhost:${port}`));