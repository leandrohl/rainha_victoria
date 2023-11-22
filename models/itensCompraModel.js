const Database = require('../utils/database')

const conexao = new Database();

class ItensCompraModel {

    #compraId;
    #produtoId;
    #compraItemQuantidade;
    #compraItemPrecoUnit;

    get compraId() {
        return this.#compraId;
    }
    set compraId(compraId){
        this.#compraId = compraId;
    }

    get produtoId() {
        return this.#produtoId;
    }
    set produtoId(produtoId){
        this.#produtoId = produtoId;
    }

    get compraItemQuantidade() {
        return this.#compraItemQuantidade;
    }

    set compraItemQuantidade(compraItemQuantidade){
        this.#compraItemQuantidade = compraItemQuantidade;
    }

    get compraItemPrecoUnit() {
        return this.#compraItemPrecoUnit;
    }

    set compraItemPrecoUnit(compraItemPrecoUnit){
        this.#compraItemPrecoUnit = compraItemPrecoUnit;
    }

    constructor(compraId, produtoId, compraItemQuantidade, compraItemPrecoUnit){
        this.#compraId = compraId;
        this.#produtoId = produtoId;
        this.#compraItemQuantidade = compraItemQuantidade;
        this.#compraItemPrecoUnit = compraItemPrecoUnit;
    }

    // async obterCompraPorId(id) {
    //     let sql = "select * from tb_compra where comp_Cod = ?";
    //     let valores = [id];

    //     let rows = await conexao.ExecutaComando(sql, valores);

    //     if(rows.length > 0) {
    //         let compra = new compraModel();
    //         compra.compCod = rows[0]["comp_Cod"];
    //         compra.compCodigoPessoa = rows[0]["Pessoa_cod_pessoa"];
    //         compra.compValor = rows[0]["comp_Valor"];
    //         compra.compData = rows[0]["comp_Data"];

    //         return compra;
    //     }

    //     return null;
    // }

    async gravar() {
        let sql = `insert into tb_itens_compra
                    (ic_Compra_Codcom, ic_Produto_Codigo, ic_Quantidade, ic_ValorUnit)
                    values (?, ?, ?, ?)`;
        let valores = [this.#compraId, this.#produtoId, this.#compraItemQuantidade, this.#compraItemPrecoUnit];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // async editarCompra() {
    //         let sql = `update tb_compra set Pessoa_cod_pessoa = ?, comp_Valor = ?, 
    //             comp_Data = ? where comp_Cod = ?`;
    //         let valores = [this.#compCodigoPessoa, this.#compValor, this.#compData, this.#compCod];

    //         let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

    //         return resultado;
    // }

    // async listarCompras() {
    //     let lista = [];
        
    //     let sql = "select * from tb_compra"

    //     let rows = await conexao.ExecutaComando(sql)

    //     for(let i=0; i<rows.length; i++){
    //         let row = rows[i];
            
    //         let compra = new CompraModel(row["comp_Cod"], row["Pessoa_cod_pessoa"], 
    //         row["comp_Valor"], row["comp_Data"]);

    //         lista.push(compra);
    //     }

    //     return lista;
    // }

    // async deletarCompra(id) {
        
    //     let sql = "delete from tb_compra where comp_Cod = ?";
    //     let valores = [id];

    //     let result = await conexao.ExecutaComandoNonQuery(sql, valores);

    //     return result;
    // }
}


module.exports = ItensCompraModel;