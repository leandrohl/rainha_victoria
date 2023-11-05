const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const HomeRoute = require('./routes/homeRoute');
const ProdutoRoute = require('./routes/produtoRoute');
const FornecedorRoute = require('./routes/fornecedorRoute');
const QuartoRoute = require('./routes/quartoRoute');
const ReservaRoute = require('./routes/reservaRoute');
const BlogRoute = require('./routes/blogRoute');
const ContatoRoute = require('./routes/contatoRoute');

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
let quartoRota = new QuartoRoute();
app.use('/quartos', quartoRota.router);
let reservaRota = new ReservaRoute();
app.use('/reservas', reservaRota.router);
let blogRota = new BlogRoute();
app.use('/blog', blogRota.router);
let contatoRota = new ContatoRoute();
app.use('/contato', contatoRota.router);

app.listen('5000', function () {
    console.log("servidor web iniciado no link: localhost:5000");
})