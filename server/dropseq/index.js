import express from 'express';

import { MongoDB } from '../db/mongo/index.js';
import { Routes } from './routes.js';
import { Controller } from './controller.js';
import { Service } from './service.js';

export const routes = express.Router();

const db = new MongoDB();

const scrna = new Routes({
  controller: new Controller({
    service: new Service({ db }),
  }),
});

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));
routes.use(express.text());
routes.use('/seq', scrna.Router);

export default { routes };
