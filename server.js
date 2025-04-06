const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senhadeteste',
    database: 'lista-telefonica'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados');
});

// POST para adicionar um novo contato
app.post('/add', (req, res) => {
    const { nome, telefone } = req.body;
    const sql = 'INSERT INTO contatos (nome, telefone) VALUES (?, ?)';
    db.query(sql, [nome, telefone], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Contato adicionado!' });
    });
});

// GET para listar todos os contatos
app.get('/contatos', (req, res) => {
    const sql = 'SELECT * FROM contatos ORDER BY id DESC';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erro ao buscar contatos:', err);
        return res.status(500).json({ error: 'Erro ao buscar contatos' });
      }
      res.json(results);
    });
});


app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
