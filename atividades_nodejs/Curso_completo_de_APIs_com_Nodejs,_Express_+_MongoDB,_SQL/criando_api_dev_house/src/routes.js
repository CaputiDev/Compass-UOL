const {Router} = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = new Router();
const upload = multer(uploadConfig)

const SessionController = require('./controllers/SessionController');
const HouseController = require('./controllers/HouseController');

routes.post('/sessions', SessionController.store);

routes.post('/houses',upload.single('thumbnail'), HouseController.store);

routes.get('/houses', HouseController.index);

routes.put('/houses/:house_id',upload.single('thumbnail'), HouseController.update)

routes.delete('/houses/:house_id', HouseController.destroy);

module.exports = routes;