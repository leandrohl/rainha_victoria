// const Database = require('../utils/database')

// const conexao = new Database();

class ProdutoModel {

    #proCodigo;
    #proDescricao;
    #proPreco;
    #proQuantidade;

    get proCodigo() {
        return this.#proCodigo;
    }
    set proCodigo(proCodigo){
        this.#proCodigo = proCodigo;
    }

    get proDescricao() {
        return this.#proDescricao;
    }
    set proDescricao(proDescricao){
        this.#proDescricao = proDescricao;
    }

    get proPreco() {
        return this.#proPreco;
    }
    
    set proPreco(proPreco){
        this.#proPreco = proPreco;
    }

    get proQuantidade() {
        return this.#proQuantidade;
    }
    set proQuantidade(proQuantidade){
        this.#proQuantidade = proQuantidade;
    }

    constructor(proCodigo, proDescricao, proPreco, proQuantidade){
        this.#proCodigo = proCodigo;
        this.#proDescricao = proDescricao;
        this.#proPreco = proPreco;
        this.#proQuantidade = proQuantidade;
    }

    async obterProdutoPorId(id, conexao) {
        let sql = "select * from tb_produto where prod_Cod = ?";
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let produto = new ProdutoModel();
            produto.proCodigo = rows[0]["prod_Cod"];
            produto.proDescricao = rows[0]["prod_Desc"];
            produto.proPreco = rows[0]["prod_Preco"];
            produto.proQuantidade = rows[0]["prod_Quant"];

            return produto;
        }

        return null;
    }

    async salvarProduto(conexao) {
        let sql = `insert into tb_produto
                    (prod_Cod, prod_Desc, prod_Preco, prod_Quant)
                    values (?, ?, ?, ?)`;
        let valores = [this.#proCodigo, this.#proDescricao, this.#proPreco, this.#proQuantidade];
        let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    async editarProduto(conexao) {
            let sql = `update tb_produto set prod_Desc = ?, prod_Preco = ?, 
                        prod_Quant = ? where prod_Cod = ?`;
            let valores = [this.#proDescricao, this.#proPreco, this.#proQuantidade, this.#proCodigo];

            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

            return resultado;
    }

    async listarProdutos(conexao) {
        let lista = [];
        
        let sql = "select * from tb_produto"

        let rows = await conexao.ExecutaComando(sql)

        for(let i=0; i<rows.length; i++){
            let row = rows[i];
            
            let produto = new ProdutoModel(row["prod_Cod"], row["prod_Desc"], 
            row["prod_Preco"], row["prod_Quant"]);

            lista.push(produto);
        }

        return lista;
    }

    async deletarProduto(id, conexao) {
        
        let sql = "delete from tb_produto where prod_Cod = ?";
        let valores = [id];

        let result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}


module.exports = ProdutoModel;