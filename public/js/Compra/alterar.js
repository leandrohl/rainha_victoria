
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnAlterar").addEventListener('click', gravarCompra);


    

    function gravarCompra() {

        let codigo = document.getElementById("compraCodigo");
        let cnpj = document.getElementById("compraCnpj");
        let valor = document.getElementById("compraValor");
        let quantidade = document.getElementById("compraQuantidade");

        if(validarCampos(cnpj, valor, quantidade)) {
           
            var compra = {
                codigo: codigo.value,
                cnpj: cnpj.value,
                valor: valor.value,
                quantidade: quantidade.value
            }

            fetch('/compra/alterar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(compra)
            })
            .then(function(resposta1) {
                return resposta1.json()
            })
            .then(function(resposta2) {
                if(resposta2.ok) {
                    alert(resposta2.msg);
                    codigo.value = "";
                    cnpj.value = "";
                    valor.value = "";
                    quantidade.value = "";              
                }
                else{
                    alert(resposta2.msg);
                }
            })
        }
        else{
            alert("Preencha os campos destacados corretamente!");
        }
    }

    function validarCampos(cnpj, valor, quantidade) {

        //limpa a estilização antes
        cnpj.style["border-color"] = "unset";
        valor.style["border-color"] = "unset";
        quantidade.style["border-color"] = "unset";

        let erros = [];
        if(cnpj.value == "")
            erros.push(cnpj);
        if(valor.value == "")
            erros.push(valor);
        if(quantidade.value == 0)
            erros.push(quantidade);

        if(erros.length > 0) {
            for(let i = 0; i<erros.length; i++){
                erros[i].style["border-color"] = "red";
            }

            return false;
        }
        else {

            return true;
        }
    }

    function limparCampos() {

    }
})