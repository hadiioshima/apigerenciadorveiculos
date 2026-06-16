require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const Veiculo = require("./models/veiculos");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("Página Inicial.");
});

app.post("/veiculos", async (req, res) => {
    try {
        const { placa, modelo, ano, cor, preco, linkImagem } = req.body;
        const veiculo = await Veiculo.create({
            placa, modelo, ano, cor, preco, linkImagem
        });
        res.status(201).json({
            mensagem: "Veiculo inserido com sucesso",
            veiculo
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar o veiculo",
            erro: error.message
        });
    }
});

app.get("/veiculos", async (req, res) => {
    try {
        const veiculos = await Veiculo.findAll();
        res.status(200).json(veiculos);
    } catch (error) {
        // CORRIGIDO: Agora usa .status(500) e error.message corretamente
        res.status(500).json({
            mensagem: "Erro ao buscar veiculos",
            erro: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
console.log("Tentando conectar com o banco de dados...");

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });
}).catch(err => {
    console.log("Erro ao conectar: ", err);
});