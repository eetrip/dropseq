import mongodb from 'mongodb';
import { Matrix as BaseMatrix } from '../matrix.js';

const { ObjectId } = mongodb;

export class Matrix extends BaseMatrix {
  constructor({ db }) {
    super();
    this.name = 'matrix';
    this.db = db;
  }

  get Collection() {
    return this.db.collection(this.name);
  }

  async list({ limit = 10, page = 1, keyword }) {
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

  async series(gene) {
    if (gene.length) {
      return this.Collection.find({ name: { $in: gene } })
        .limit(10)
        .toArray();
    }
    return this.Collection.find().limit(10).toArray();
  }

  findOneById(id) {
    return this.Collection.findOne({ _id: new ObjectId(id) });
  }
}

export default Matrix;
