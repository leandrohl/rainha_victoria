const ProdutoModel = require("../models/produtoModel");


class ProdutoController {

    async listarView(req, res) {
        let produto = new ProdutoModel();
        let listaProduto = await produto.listarProdutos()
        res.render('produto/listar', {lista: listaProduto});
    }

    cadastrarView(req, res) {
        res.render('produto/cadastrar');
    }

    async alterarView(req, res) {
        //console.log(req.params.id)
        if(req.params.id != undefined){
            let produto = new ProdutoModel();
            produto = await produto.obterProdutoPorId(req.params.id);
            res.render('produto/alterar', {produto: produto});
        }
        else
            res.redirect("/")
        
    }

    async excluir(req, res) {
        if(req.body.id != ""){
            let produto = new ProdutoModel();
            let result = await produto.deletarProduto(req.body.id);
            if(result == true)
                res.send({ok: true, msg: "Produto excluído!"});
            else
                res.send({ok: false, msg: "Erro ao excluir produto!"});
        }
        else{
            res.send({ok: false, msg: "Dados inválidos!"});
        }
    }

    async cadastrar(req, res) {
        if(req.body.descricao != '' && req.body.preco != '' && req.body.quantidade != ''){
            let produto = new ProdutoModel(0, req.body.descricao, req.body.preco, req.body.quantidade);
            let resultado = await produto.salvarProduto();

            if(resultado == true){
                res.send({ok: true, msg: "Produto adicionado!"})
            }
            else
                res.send({ok: false, msg: "Erro ao inserir produto!"})
        }
        else
            res.send({ok: false, msg: "Dados inválidos!"})
    }

    async alterar(req, res) {
        //console.log(req.body)
        if(req.body.id > 0 && req.body.descricao != ''  && req.body.preco != '' 
        && req.body.quantidade != '') {
            
            let produto = new ProdutoModel(req.body.id, req.body.descricao, 
            req.body.preco, req.body.quantidade)
            
            let resultado = await produto.salvarProduto();

            if(resultado == true)
                res.send({ok: true, msg: "Produto alterado"})
            else
                res.send({ok: false, msg: "Erro ao alterar produto"})
        }
        else{
            res.send({ok: false, msg: "Dados inválidos"})
        }
    }
}

module.exports = ProdutoController;