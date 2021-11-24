const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const clienteRoutes = require('./rotas/clientes');

const mongo_anderson = "mongodb+srv://andycds:minhasenha@cluster0.yx57p.mongodb.net/app-mean?retryWrites=true&w=majority"
const mongo_andreia = "mongodb+srv://user_base:outrasenha@cluster0.skf8n.mongodb.net/app-mean?retryWrites=true&w=majority"

mongoose.connect(mongo_anderson)
  .then(() => {
    console.log("Conexão OK")
  }).catch(() => {
    console.log("Conexão MongoDB com problemas")
  });

app.use(bodyParser.json());
app.use('/imagens', express.static(path.join("backend/imagens")));

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/clientes', clienteRoutes);

module.exports = app;
