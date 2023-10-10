const Database = require('../utils/database')

const conexao = new Database();

class FornecedorModel {

    #fornCnpj;
    #fornNome;
    #fornEmail;
    #fornEndereco;
    #fornCep;

    get fornCnpj() {
        return this.#fornCnpj;
    }
    set fornCnpj(fornCnpj){
        this.#fornCnpj = fornCnpj;
    }

    get fornNome() {
        return this.#fornNome;
    }
    set fornNome(fornNome){
        this.#fornNome = fornNome;
    }

    get fornEmail() {
        return this.#fornEmail;
    }
    set fornEmail(fornEmail){
        this.#fornEmail = fornEmail;
    }

    get fornEndereco() {
        return this.#fornEndereco;
    }
    set fornEndereco(fornEndereco){
        this.#fornEndereco = fornEndereco;

    }

    get fornCep() {
        return this.#fornCep;
    }
    set fornCep(fornCep){
        this.#fornCep = fornCep;
    }




    constructor(fornCnpj, fornNome,fornEmail,fornEndereco,fornCep){

        this.#fornCnpj = fornCnpj;
        this.#fornNome = fornNome;
        this.#fornEmail = fornEmail;
        this.#fornEndereco = fornEndereco;
        this.#fornCep = fornCep;
    }





    async obterFornecedorPorCnpj(Cnpj) {
        let sql = "select * from tb_fornecedor where forn_cnpj = ?";
        let valores = [Cnpj];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let fornecedor = new FornecedorModel();
            fornecedor.fornCnpj = rows[0]["forn_cnpj"];
            fornecedor.fornNome = rows[0]["forn_nome"];
            fornecedor.fornEmail = rows[0]["forn_email"];   
            fornecedor.fornEndereco = rows[0]["forn_endereco"];   
            fornecedor.fornCep = rows[0]["forn_cep"];   

            return fornecedor;
        }

        return null;
    }


    async salvarFornecedor() {
            let sql = `insert into tb_fornecedor 
                        (forn_cnpj, forn_nome , forn_email, forn_endereco, forn_cep)
                        values(?,?,?,?,?)
                        `;
  
            let valores = [this.#fornCnpj, this.#fornNome, this.#fornEmail,this.#fornEndereco, this.#fornCep];

            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

            return resultado;
        
    }


    
    async listarFornecedor() {
        let lista = [];

        let sql = "select * from tb_fornecedor"

        let rows = await conexao.ExecutaComando(sql)

        for(let i=0; i<rows.length; i++){
            let row = rows[i];
            
            let fornecedor = new FornecedorModel(row["forn_cnpj"], row["forn_nome"], row["forn_email"], row["forn_endereco"], row["forn_cep"]);

            lista.push(fornecedor);
        }

        return lista;
    }

    

    
}


module.exports = FornecedorModel;