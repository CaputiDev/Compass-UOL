const {Router} = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const routes = new Router();
const upload = multer(uploadConfig)

const SessionController = require('./controllers/SessionController');
const HouseController = require('./controllers/HouseController');
const DashboardController = require('./controllers/DashboardController');
const ReserveController = require('./controllers/ReserveController');

routes.post('/sessions', SessionController.store);

routes.post('/houses',upload.single('thumbnail'), HouseController.store);

routes.get('/houses', HouseController.index);

routes.put('/houses/:house_id',upload.single('thumbnail'), HouseController.update)

routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard', DashboardController.show);

routes.post('/houses/:house_id/reserve', ReserveController.store);

routes.get('/reserves/', ReserveController.index);

routes.delete('/reserves/', ReserveController.destroy)

module.exports = routes;