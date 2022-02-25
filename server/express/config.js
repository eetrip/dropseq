import { json } from 'express';
import cors from 'cors';
import Express from './express-config.js';

const express = (app) => new Express(app);

export class AppConfig {
  constructor(app) {
    this.app = app;
  }

  includeConfig() {
    this.app.use(json());
    this.app.use(cors());
    express(this.app);
  }
}

export default AppConfig;
