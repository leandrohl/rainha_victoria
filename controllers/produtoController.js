const ProdutoModel = require("../models/produtoModel");
const Database = require('../utils/database')

const conexao = new Database();

class ProdutoController {

    async listarView(req, res) {
        let produto = new ProdutoModel();
        let listaProduto = await produto.listarProdutos(conexao)
        res.render('produto/listar', {lista: listaProduto, layout: 'layoutADM'});
    }

    cadastrarView(req, res) {
        res.render('produto/cadastrar', { layout: 'layoutADM' });
    }

    async alterarView(req, res) {
        if(req.params.id != undefined){
            let produto = new ProdutoModel();
            produto = await produto.obterProdutoPorId(req.params.id, conexao);
            res.render('produto/alterar', {produto: produto, layout: 'layoutADM'});
        }
        else
            res.redirect("/")
        
    }

    async excluir(req, res) {
        if (req.body.id != "") {
            
            const confirmacao = req.body.confirmacao === 'true';
           
            if (confirmacao == true){
                let produto = new ProdutoModel();
                let result = await produto.deletarProduto(req.body.id, conexao);

                if (result == true)
                    res.send({ ok: true, msg: "Exclusão efetuada com sucesso!" });  
                else
                   res.send({ ok: false, msg: "Erro ao excluir produto!" });
            }
            else
                res.send({ ok: true, msg: "Exclusão cancelada!" });
                
        }
        else
            res.send({ ok: false, msg: "Dados inválidos!" });
    }

    async cadastrar(req, res) {
        if(req.body.codigo && req.body.descricao != '' && req.body.preco != '' && req.body.quantidade != ''){
            let produto = new ProdutoModel(req.body.codigo, req.body.descricao, req.body.preco, req.body.quantidade);
            let resultado = await produto.salvarProduto(conexao);

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
        if(req.body.codigo > 0 && req.body.descricao != ''  && req.body.preco != '' 
        && req.body.quantidade != '') {
            
            let produto = new ProdutoModel(req.body.codigo, req.body.descricao, 
            req.body.preco, req.body.quantidade)
            
            let resultado = await produto.editarProduto(conexao);

            if(resultado == true)
                res.send({ok: true, msg: "Produto alterado"})
            else
                res.send({ok: false, msg: "Erro ao alterar produto"})
        }
        else{
            res.send({ok: false, msg: "Dados inválidos"})
        }
    }

    async obterProduto(req, res) {
        if(req.params.id != undefined){
            let produto = new ProdutoModel();
            produto = await produto.obterProdutoPorId(req.params.id, conexao);

            if (produto != null) {
                let produtoJson = {
                    id: produto.proCodigo,
                    descricao: produto.proDescricao,
                    preco: produto.proPreco,
                    quantidade: produto.proQuantidade
                }
                
                res.send({ok: true, produto: produtoJson});
            } else {
                res.send({ok: false, msg: "Produto nao encontrado"});
            }
        }
        else
        res.send({ok: false, msg: "Parametros inválidos"});
    }
}

module.exports = ProdutoController;