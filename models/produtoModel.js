const Database = require('../utils/database')

const conexao = new Database();

class ProdutoModel {

    #proId;
    #proDescricao;
    #proPreco;
    #proQuantidade;

    get proId() {
        return this.#proId;
    }
    set proId(proId){
        this.#proId = proId;
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

    constructor(proId, proDescricao, proPreco, proQuantidade){
        
        this.#proId = proId;
        this.#proDescricao = proDescricao;
        this.#proPreco = proPreco;
        this.#proQuantidade = proQuantidade;
    }

    async obterProdutoPorId(id) {
        let sql = "select * from tb_produto where pro_id = ?";
        let valores = [id];

        let rows = await conexao.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let produto = new ProdutoModel();
            produto.proId = rows[0]["pro_id"];
            produto.proDescricao = rows[0]["pro_descricao"];
            produto.proPreco = rows[0]["pro_preco"];
            produto.proQuantidade = rows[0]["pro_quant"];

            return produto;
        }

        return null;
    }

    async salvarProduto() {
        if(this.#proId == 0){
            let sql = `insert into tb_produto
                        (pro_descricao, pro_preco, pro_quant)
                        values (?, ?, ?)`;
            let valores = [this.#proDescricao, this.#proPreco, this.#proQuantidade];

            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

            return resultado;
        }
        else{
            let sql = `update tb_produto set pro_descricao = ?, pro_preco = ?, 
                        pro_quant = ? where pro_id = ?`;
            let valores = [this.#proDescricao, this.#proPreco, this.#proQuantidade, this.#proId];

            let resultado = await conexao.ExecutaComandoNonQuery(sql, valores);

            return resultado;
        }
    }

    async listarProdutos() {
        let lista = [];
        
        let sql = "select * from tb_produto"

        let rows = await conexao.ExecutaComando(sql)

        for(let i=0; i<rows.length; i++){
            let row = rows[i];
            
            let produto = new ProdutoModel(row["pro_id"], row["pro_descricao"], 
            row["pro_preco"], row["pro_quant"]);

            lista.push(produto);
        }

        return lista;
    }

    async deletarProduto(id) {
        
        let sql = "delete from tb_produto where pro_id = ?";
        let valores = [id];

        let result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}


module.exports = ProdutoModel;