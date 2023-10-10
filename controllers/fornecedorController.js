const FornecedorModel = require("../models/fornecedorModel");


class fornecedorController{
    
    async listarView(req, res) {
        let fornecedor = new FornecedorModel();
        let listaFornecedor = await fornecedor.listarFornecedor()
        res.render('fornecedor/listar', {lista: listaFornecedor});
    }

    cadastrarView(req, res) {
        res.render('fornecedor/cadastrarForn');
    }

    async fornecedorView(req, res){
       
    res.render('fornecedor/listarForn');

    }

    

    async cadastrar(req, res) 
    {
       console.log(req.body) 
        if(req.body.nome != '' && req.body.cnpj != '' ){
            let fornecedor = new FornecedorModel(req.body.cnpj, req.body.nome,req.body.email, req.body.endereco, req.body.cep);
            let resultado = await fornecedor.salvarFornecedor();

            if(resultado == true){
                res.send({ok: true, msg: "Fornecedor cadastrado!"})
            }
            else
                res.send({ok: false, msg: "Erro ao inserir fornecedor!"})
        }
        else
            res.send({ok: false, msg: "Dados inválidos!"})
        }
 

}

module.exports = fornecedorController;