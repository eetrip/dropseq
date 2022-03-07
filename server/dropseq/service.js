export class Service {
  constructor({ db }) {
    this.db = db;
  }

  async list({ limit, page, keyword }) {
    // db calls should not be in service
    return this.db.Scrna.list({ limit, page, keyword });
  }

  async dropDown({ limit, page, keyword }) {
    // db calls should not be in service
    return this.db.Scrna.dropDown({ limit, page, keyword });
  }

  async checkBox() {
    // db calls should not be in service
    return this.db.Scrna.checkBox();
  }

  async listSequence({ gene, cell }) {
    // db calls should not be in service
    return this.db.Scrna.listSequence({ gene, cell });
  }

  async series(gene, cells) {
    return this.db.Matrix.series(gene, cells);
  }
}

export default Service;
