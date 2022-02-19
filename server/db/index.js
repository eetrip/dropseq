import { Scrna } from './scrna.js';

export class DB {
  get Scrna() {
    return this.scrna;
  }

  constructor({
    scrna = new Scrna(),
  } = {}) {
    if (this.constructor === DB) {
      throw new Error(`Abstract class ${this.constructor.name} cannot be instantiated`);
    }
    this.scrna = scrna;
  }
}

export default DB;
