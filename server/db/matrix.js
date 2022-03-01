export class Matrix {
  constructor() {
    if (this.constructor === Matrix) {
      throw new Error(`Abstract class ${this.constructor.name} cannot be instantiated`);
    }
  }
}

export default Matrix;
