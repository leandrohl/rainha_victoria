const Database = require('../utils/database')

const conexao = new Database();

class CompraModel {

    #compCod;
    #compCodigoPessoa;
    #compValor;
    #compData;

    get compCod() {
        return this.#compCod;
    }
    set compCod(compCod){
        this.#compCod = compCod;
    }

    get compCodigoPessoa() {
        return this.#compCodigoPessoa;
    }
    set compCodigoPessoa(compCodigoPessoa){
        this.#compCodigoPessoa = compCodigoPessoa;
    }

    get compValor() {
        return this.#compValor;
    }
    
    set compValor(compValor){
        this.#compValor = compValor;
    }

    get compData() {
        return this.#compData;
    }
    set compData(compData){
        this.#compData = compData;
    }

    constructor(compCod, compCodigoPessoa, compValor, compData){
        this.#compCod = compCod;
        this.#compCodigoPessoa = compCodigoPessoa;
        this.#compValor = compValor;
        this.#compData = compData;
    }

    async obterCompraPorId(id) {
        let sql = "select * from tb_compra where comp_Cod = ?";
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let compra = new compraModel();
            compra.compCod = rows[0]["comp_Cod"];
            compra.compCodigoPessoa = rows[0]["Pessoa_cod_pessoa"];
            compra.compValor = rows[0]["comp_Valor"];
            compra.compData = rows[0]["comp_Data"];

            return compra;
        }

        return null;
    }

    async salvarCompra() {
        let sql = `insert into tb_compra
                    (comp_Cod, Pessoa_cod_pessoa, comp_Valor, comp_Data)
                    values (?, ?, ?, ?)`;
        let valores = [this.#compCod, this.#compCodigoPessoa, this.#compValor, this.#compData];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async editarCompra() {
            let sql = `update tb_compra set Pessoa_cod_pessoa = ?, comp_Valor = ?, 
                comp_Data = ? where comp_Cod = ?`;
            let valores = [this.#compCodigoPessoa, this.#compValor, this.#compData, this.#compCod];

            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

            return resultado;
    }

    async listarCompras() {
        let lista = [];
        
        let sql = "select * from tb_compra"

        let rows = await conexao.ExecutaComando(sql)

        for(let i=0; i<rows.length; i++){
            let row = rows[i];
            
            let compra = new CompraModel(row["comp_Cod"], row["Pessoa_cod_pessoa"], 
            row["comp_Valor"], row["comp_Data"]);

            lista.push(compra);
        }

        return lista;
    }

    async deletarCompra(id) {
        
        let sql = "delete from tb_compra where comp_Cod = ?";
        let valores = [id];

        let result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}


module.exports = CompraModel;