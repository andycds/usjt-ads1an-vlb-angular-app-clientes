const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const clienteRoutes = require('./rotas/clientes');

// Mongo Anderson: mongodb+srv://andycds:minhasenha@cluster0.yx57p.mongodb.net/app-mean?retryWrites=true&w=majority
// Mongo Andreia: mongodb+srv://user_base:outrasenha@cluster0.skf8n.mongodb.net/app-mean?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://andycds:minhasenha@cluster0.yx57p.mongodb.net/app-mean?retryWrites=true&w=majority')
  .then(() => {
    console.log("Conexão OK")
  }).catch(() => {
    console.log("Conexão MongoDB com problemas")
  });

app.use(bodyParser.json());

/*const clientes = [
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
]*/

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/clientes', clienteRoutes);

module.exports = app;
