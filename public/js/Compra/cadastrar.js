
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnGravar").addEventListener('click', gravarCompra);

    let codigo = document.getElementById("compraCodigo");
    let cnpj = document.getElementById("compraCnpj");
    let valor = document.getElementById("compraValor");
    let data = document.getElementById("compraData");

    function gravarCompra() {
        
        if(validarCampos(codigo, cnpj, valor, data)) {
           
            var compra = {
                codigo: codigo.value,
                codigoPessoa: 5,
                valor: valor.value,
                data: data.value
            }

            console.log(compra)

            fetch('/compras/cadastrar', {
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
                    cnpj.value = "";
                    valor.value = "";
                    data.value = "";              
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

    function validarCampos(codigo, cnpj, valor, data) {
        
        //limpa a estilização antes
        codigo.style.borderColor = "";
        cnpj.style.borderColor = "";
        valor.style.borderColor = "";
        data.style.borderColor = "";

        let erros = [];
        if(codigo.value == "")
        erros.push(codigo);
        if(cnpj.value == "")
            erros.push(cnpj);
        if(valor.value == "")
            erros.push(valor);
        if(data.value == 0)
            erros.push(data);

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