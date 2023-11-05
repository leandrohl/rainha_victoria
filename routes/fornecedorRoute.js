const express = require('express');
const fornecedorController = require('../controllers/fornecedorController');
class fornecedorRoute{

    #router;

    get router(){
        return this.#router;
    }

    constructor(){

        this.#router = express.Router();

        let ctrl = new fornecedorController();
        this.#router.get('/', ctrl.listarView);
        this.#router.get('/cadastrar', ctrl.cadastrarView);
        this.#router.post('/cadastrar', ctrl.cadastrar);
    }

}

module.exports = fornecedorRoute;