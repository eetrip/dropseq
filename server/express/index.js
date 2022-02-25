import express from 'express';
import http from 'http';
import { routes } from '../dropseq/index.js';

import Config from './config.js';

export class Server {
  constructor() {
    this.app = express();
    this.router = express.Router();
    this.http = http.Server(this.app);
  }

  appConfig() {
    new Config(this.app).includeConfig();
  }

  includeRoutes() {
    this.app.use('/api', routes);
  }

  appExecute() {
    this.appConfig();
    this.includeRoutes();

    const port = process.env.PORT;
    const host = process.env.HOST;

    this.http.listen(port, host, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

export default Server;
