const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Cliente = require('./models/cliente');

app.use (bodyParser.json());

const clientes = [
  {
    id: '1',
    nome: 'Gil',
    fone: '12345678',
    email: 'gil@email.com'
  },
  {
    id: '2',
    nome: 'Ana',
    fone: '98765432',
    email: 'ana@email.com'
  }
]

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})


app.use('/api/clientes', (req, res, next) => {
  res.status(200).json({
      mensagem: "Tudo certo",
      clientes: clientes
  });
});

app.post('/api/clientes', (req, res, next) => {
  //const cliente = req.body;

  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });

  console.log(cliente);
  res.status(201).json({mensagem: 'Cliente inserido com sucesso!'});
});

module.exports = app;
