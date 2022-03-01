import express from 'express';

export class Routes {
  get Router() { return this.router; }

  constructor({ controller }) {
    this.router = express.Router();
    this.router.get('/check', controller.healthCheck);
    this.router.post('/', controller.list);
    this.router.post('/dropDown', controller.dropDown);
    this.router.post('/checkBox', controller.checkBox);
    this.router.post('/listSequence', controller.listSequence);
    this.router.post('/series', controller.series);
  }
}

export default Routes;
