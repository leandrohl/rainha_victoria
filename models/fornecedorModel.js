const Database = require('../utils/database')

const conexao = new Database();

class FornecedorModel {
    #fornId;
    #fornCnpj;
    #fornNome;
    #fornTelefone;
    #fornEmail;
    #fornEndereco;
    #fornCep;

    get fornId() {
        return this.#fornId;
    }

    set fornId(fornId){
        this.#fornId = fornId;
    }

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

    
    get fornTelefone() {
        return this.#fornTelefone;
    }
    set fornTelefone(fornTelefone){
        this.#fornTelefone = fornTelefone;
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

    constructor(fornId, fornCnpj, fornNome, fornEmail, fornTelefone, fornEndereco,fornCep){
        this.#fornId = fornId;
        this.#fornCnpj = fornCnpj;
        this.#fornNome = fornNome;
        this.#fornTelefone = fornTelefone;
        this.#fornEmail = fornEmail;
        this.#fornEndereco = fornEndereco;
        this.#fornCep = fornCep;
    }


    async obterFornecedorPorId(id) {
        let sql = "select * from tb_pessoa p inner join tb_juridica j on p.pes_codigo = j.cod_pessoa where pes_codigo = ?";
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let fornecedor = new FornecedorModel();
            fornecedor.#fornNome = rows[0]["pes_nome"];
            fornecedor.fornCnpj = rows[0]["jur_cnpj"];
            fornecedor.fornEmail = rows[0]["pes_email"];   
            fornecedor.fornTelefone = rows[0]["pes_telefone"];   
            fornecedor.fornEndereco = rows[0]["pes_endereco"];   
            fornecedor.fornCep = rows[0]["pes_cep"];   

            return fornecedor;
        }

        return null;
    }


    async salvarFornecedor() {
        let sql = `insert into tb_pessoa (pes_email, pes_nome, pes_telefone, pes_endereco, pes_cep)
        VALUES (? ,?, ?, ?, ?)`;
                        
        let valores = [this.#fornEmail, this.#fornNome, this.#fornTelefone ,this.#fornEndereco, this.#fornCep];

        let id = await conexao.ExecutaComandoLastInserted(sql, valores);

        if (id) {
            sql = `insert into tb_juridica (jur_cnpj, cod_pessoa) 
                         VALUES (?,?)`;
            let valores = [this.#fornCnpj, id];
            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
            
            return resultado;
        } else return false;
    }

    async editarFornecedor() {
        let sql = `insert into tb_pessoa (pes_email, pes_nome, pes_telefone, pes_endereco, pes_cep)
        VALUES (? ,?, ?, ?, ?)`;
                        
        let valores = [this.#fornEmail, this.#fornNome, this.#fornTelefone ,this.#fornEndereco, this.#fornCep];

        let id = await conexao.ExecutaComandoLastInserted(sql, valores);

        if (id) {
            sql = `insert into tb_juridica (jur_cnpj, cod_pessoa) 
                         VALUES (?,?)`;
            let valores = [this.#fornCnpj, id];
            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
            
            return resultado;
        } else return false;
    }



    async listarFornecedor() {
        let lista = [];

        let sql = "select * from tb_pessoa p inner join tb_juridica j on p.pes_codigo = j.cod_pessoa"

        let rows = await conexao.ExecutaComando(sql)

        for(let i=0; i<rows.length; i++){
            let row = rows[i];
        
            
            let fornecedor = new FornecedorModel(row["pes_codigo"], row["jur_cnpj"], 
            row["pes_nome"],row["pes_email"], row["pes_telefone"], row["pes_endereco"], row["pes_cep"]);
            lista.push(fornecedor);
        }

        return lista;
    }

    
}


module.exports = FornecedorModel;