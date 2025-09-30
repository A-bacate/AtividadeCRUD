/*
Desenvolver uma aplicação web que permita realizar operações CRUD em um sistema de livraria, com os seguintes dados:
    Título
    Autor
    Ano de Publicação
    Gênero
    Idioma
    Preço
Funcionalidades obrigatórias:
    Cadastrar Livro – Um formulário que permita inserir os dados de um novo livro.
    Listar Livros – Exibir todos os livros cadastrados em uma tabela.
    Listar Livro - Exibir livro selecionado.
    Editar Livro – Permitir modificar os dados de um livro já cadastrado.
    Excluir Livro – Remover um livro da lista e do banco de dados.
*/

/*
titulo
autor
anoPublicacao
genero
idioma
preco

titulo, autor, anoPublicacao, genero, idioma, preco
*/
const express = require('express')
const sqlite3 = require('sqlite3')
const cors = require('cors')

// server
const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())

const db = new sqlite3.Database('./database.db')

db.run(`CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    autor TEXT,
    anoPublicacao INTEGER,
    genero TEXT,
    idioma TEXT,
    preco REAL
)`)

// app.get("/", (req,res) => {
//     res.json({

//     })
// })

// CADASTRAR
app.post("/livros", async (req, res)=>{
    
    let titulo = req.body.titulo
    let autor = req.body.autor
    let anoPublicacao = req.body.anoPublicacao
    let genero = req.body.genero
    let idioma = req.body. idioma
    let preco = req.body.preco

    db.run(`INSERT INTO usuarios (titulo, autor, anoPublicacao, genero, idioma, preco)
        VALUES (?, ?, ?, ?, ?, ?)`, 
        [/*VARIAVEIS FODAS*/],
    function(){
        res.json({
            id: this.lastID,
            titulo,
            autor,
            anoPublicacao,
            genero,
            idioma,
            preco
        })
    })
})