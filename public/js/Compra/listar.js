document.addEventListener("DOMContentLoaded", function() {

    let datas = document.querySelectorAll('.dataFormatada');
    datas.forEach(function(value, index) {
        value.innerText = formatarData(value.innerText)
     })

    function formatarData(data) {
        var dataCompleta = new Date(data);
        var dia = dataCompleta.getDate();
        var mes = dataCompleta.getMonth() + 1;
        var ano = dataCompleta.getFullYear();
        return dia + '/' + mes + '/' + ano;
    }

    function montarFornecedores(lista) {
        let htmlBody = "<tbody>";
      

        lista.forEach(function(value, index) {
            htmlBody += `<tr> 
                <td>  </td>
            </tr>`
        })

        htmlBody += "</tbody>";

        document.querySelector("#tabela > tbody").innerHTML = htmlBody;
    }
    

    function filtrarFornecedores() {
        fetch('/fornecedor/filtrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cnpjBusca })
        })
        .then(r => {
            return r.json()
        })
        .then(r => {
            if (r.lista.length > 0) {
                montarFornecedores(r.lista)
            } else {
                alert("Nenhum pedido encontrado para a filtragem")
            }
        })
        .catch(e => {
            console.log(e)
        })
    }

    let botoes = document.querySelectorAll(".btnExclusao");

    for(let i = 0; i<botoes.length; i++){
        botoes[i].onclick = excluirCompra;
    }

    function excluirCompra() {
        let idExclusao = this.dataset.id;
        if(idExclusao != undefined && idExclusao != ""){

            fetch('/compras/excluir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: idExclusao})
            })
            .then(function(r) {
                return r.json();
            })
            .then(function(r) {
                if(r.ok){
                    alert(r.msg);
                    window.location.reload();
                }
                else{
                    alert(r.msg);
                }
            })
        }
        else{
            alert("Dados inválidos!")
        }
    }
})