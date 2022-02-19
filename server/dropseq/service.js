export class Service {
  constructor({ db }) {
    this.db = db;
  }

  async list({ limit, page, keyword }) {
    // db calls should not be in service
    return this.db.Scrna.list({ limit, page, keyword });
  }
}

export default Service;
