import express from 'express';
import routes from './routes.js';
import dotenv from 'dotenv';
// import path from 'path';

class App {
    constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    }

    middlewares() {
    this.server.use(express.json());
    }

    routes() {
    this.server.use(routes);
    }
}
export default new App().server;