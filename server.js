const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const HomeRoute = require('./routes/homeRoute');
const ProdutoRoute = require('./routes/produtoRoute');
const FornecedorRoute = require('./routes/fornecedorRoute');

const app = express()

app.set('views', './views');
app.set('view engine', 'ejs');
app.set('layout', './layout2')


app.use(express.static("public/"))
app.use(ejsLayout);

app.use(express.urlencoded())
app.use(express.json());

let homeRota = new HomeRoute();
app.use('/', homeRota.router);
let produtoRota = new ProdutoRoute();
app.use('/produtos', produtoRota.router);
let fornecedorRota = new FornecedorRoute();
app.use('/fornecedor', fornecedorRota.router);
app.listen('5000', function () {
    console.log("servidor web iniciado no link: localhost:5000");
})