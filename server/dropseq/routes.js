import express from 'express';

export class Routes {
  get Router() { return this.router; }

  constructor({ controller }) {
    this.router = express.Router();
    this.router.post('/', controller.list);
  }
}

export default Routes;
