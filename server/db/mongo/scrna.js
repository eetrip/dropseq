import mongodb from 'mongodb';
import { Scrna as BaseScrna } from '../scrna.js';

const { ObjectId } = mongodb;

export class Scrna extends BaseScrna {
  constructor({ db }) {
    super();
    this.name = 'scrnaMatrix';
    this.db = db;
  }

  get Collection() {
    return this.db.collection(this.name);
  }

  async list({ limit, page, keyword }) {
    const {
      indexSizes: { gene_1: geneIndex },
    } = await this.Collection.stats();
    if (!geneIndex) {
      // creating indexes on genes to reduce search times
      await this.Collection.createIndex({ gene: 1 });
    }
    return this.Collection.aggregate([
      {
        $match: {
          gene: {
            $regex: `${keyword}`,
            $options: 'i',
          },
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]).toArray();
  }

  findOneById(id) {
    return this.Collection.findOne({ _id: new ObjectId(id) });
  }
}

export default Scrna;
