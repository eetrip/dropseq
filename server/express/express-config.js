/* eslint-disable import/no-import-module-exports */
import path from 'path';
import express from 'express';

export class ExpressConfig {
  constructor(app) {
    // Setting .html as the default template extension
    app.set('view engine', 'html');

    // Files
    app.use(express.static(path.join('public')));
  }
}

export default ExpressConfig;
