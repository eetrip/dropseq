export class Scrna {
  constructor() {
    if (this.constructor === Scrna) {
      throw new Error(`Abstract class ${this.constructor.name} cannot be instantiated`);
    }
  }
}

export default Scrna;
