const CompraModel = require("../models/compraModel");


class CompraController {

    async listarView(req, res) {
        let compra = new CompraModel();
        let listaCompra = await compra.listarCompras()
        res.render('compra/listar', {lista: listaCompra, layout: 'layoutADM'});
    }

    cadastrarView(req, res) {
        res.render('compra/cadastrar', { layout: 'layoutADM' });
    }

    async alterarView(req, res) {
        if(req.params.id != undefined){
            let compra = new CompraModel();
            compra = await compra.obterCompraPorId(req.params.id);
            res.render('compra/alterar', {compra: compra, layout: 'layoutADM'});
        }
        else
            res.redirect("/")
        
    }

    async excluir(req, res) {
        if(req.body.id != ""){
            let compra = new CompraModel();
            let result = await compra.deletarCompra(req.body.id);
            if(result == true)
                res.send({ok: true, msg: "Compra excluído!"});
            else
                res.send({ok: false, msg: "Erro ao excluir compra!"});
        }
        else{
            res.send({ok: false, msg: "Dados inválidos!"});
        }
    }

    async cadastrar(req, res) {
        if(req.body.codigo && req.body.codigoPessoa != '' && req.body.valor != '' && req.body.data != ''){
            let compra = new CompraModel(req.body.codigo, req.body.codigoPessoa, req.body.valor, req.body.data);
            let resultado = await compra.salvarCompra();

            if(resultado == true){
                res.send({ok: true, msg: "Compra adicionado!"})
            }
            else
                res.send({ok: false, msg: "Erro ao inserir compra!"})
        }
        else
            res.send({ok: false, msg: "Dados inválidos!"})
    }

    async alterar(req, res) {
        if(req.body.codigo > 0 && req.body.codigoPessoa != ''  && req.body.valor != '' 
        && req.body.data != '') {
            
            let compra = new CompraModel(req.body.codigo, req.body.codigoPessoa, 
            req.body.valor, req.body.data)
            
            let resultado = await compra.editarCompra();

            if(resultado == true)
                res.send({ok: true, msg: "Compra alterado"})
            else
                res.send({ok: false, msg: "Erro ao alterar compra"})
        }
        else{
            res.send({ok: false, msg: "Dados inválidos"})
        }
    }
}

module.exports = CompraController;