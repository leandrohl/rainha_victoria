
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnGravar").addEventListener('click', gravarFornecedor);

    

    function gravarFornecedor() {

        let Nome = document.getElementById("nome");
        let Cnpj = document.getElementById("cnpj");
        let Email = document.getElementById("email");
        let Endereco = document.getElementById("endereco");
        let Cep = document.getElementById("cep");

        if(validarCampos(Cnpj, Nome, Email, Endereco, Cep)) {
           
            var fornecedor = {
                nome: Nome.value,
                cnpj: Cnpj.value,
                email: Email.value,
                endereco: Endereco.value,
                cep: Cep.value
            }

            fetch('/fornecedor/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fornecedor)
            })
            .then(function(resposta1) {
                return resposta1.json()
            })
            .then(function(resposta2) {
                if(resposta2.ok) {
                    alert(resposta2.msg);
                    Nome.value = "";
                    Cnpj.value = "";     
                    Email.value = "";
                    Endereco.value = "";  
                    Cep.value = "";  
                    window.location.href = '/fornecedor';
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

    function validarCampos(Cnpj, Nome, Email, Endereco, Cep) {

        //limpa a estilização antes
        Nome.style["border-color"] = "";
        Cnpj.style["border-color"] = "";
        Email.style["border-color"] = "";
        Endereco.style["border-color"] = "";
        Cep.style["border-color"] = "";

        let erros = [];
        if(Nome.value == "")
            erros.push(Nome);
        if(Cnpj.value == "")
            erros.push(Cnpj);
        if(Email.value == "")
            erros.push(Email);
        if(Endereco.value == "")
            erros.push(Endereco);
        if(Cep.value == "")
            erros.push(Cep);

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