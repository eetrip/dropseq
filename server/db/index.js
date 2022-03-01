import { Scrna } from './scrna.js';
import { Matrix } from './matrix.js';

export class DB {
  get Scrna() {
    return this.scrna;
  }

  get Matrix() {
    return this.matrix;
  }

  constructor({
    scrna = new Scrna(),
    matrix = new Matrix(),
  } = {}) {
    if (this.constructor === DB) {
      throw new Error(`Abstract class ${this.constructor.name} cannot be instantiated`);
    }
    this.scrna = scrna;
    this.matrix = matrix;
  }
}

export default DB;
