const {Router} = require('express');

const routes = Router();

const multer = require('multer');



routes.get('/hello',(req,res) => {
    res.send('API do Mini Banco Central funcionando!');
});

module.exports = routes;