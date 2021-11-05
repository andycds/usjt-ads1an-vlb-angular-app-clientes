const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cliente = require('./models/cliente');

mongoose.connect('mongodb+srv://user_base:outrasenha@cluster0.skf8n.mongodb.net/app-mean?retryWrites=true&w=majority')
  .then(() => {
    console.log("Conexão OK")
  }).catch(() => {
    console.log("Conexão MongoDB com problemas")
  });

app.use(bodyParser.json());

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


app.get('/api/clientes', (req, res, next) => {
  //  console.log("GET!!!");
  //  res.status(200).json({
  //      mensagem: "Tudo certo",
  //      clientes: clientes
  //  });
  Cliente.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo Ok",
      clientes: documents
    });
  })
});

app.post('/api/clientes', (req, res, next) => {
  console.log("POST!!!");
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });
  cliente.save().
  then(clienteInserido => {
    res.status(201).json({
      mensagem: 'cliente inserido',
      id: clienteInserido._id
    })
  });
  console.log(cliente);
  res.status(201).json({mensagem: 'Cliente inserido com sucesso!'});
});

app.delete('/api/clientes/:id', (req, res, next) => {
  Cliente.deleteOne({_id: req.params.id}).then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Cliente Removido"});
  });
});


module.exports = app;
