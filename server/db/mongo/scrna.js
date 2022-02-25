import mongodb from 'mongodb';
import { Scrna as BaseScrna } from '../scrna.js';

const { ObjectId } = mongodb;

export class Scrna extends BaseScrna {
  constructor({ db }) {
    super();
    this.name = 'scrnamatrix';
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

  async dropDown({ limit = 10, page = 1, keyword }) {
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
      {
        $group: {
          _id: { gene: '$gene' },
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ])
      .toArray()
      .then((data) => data.map(({ _id: { gene } }) => gene));
  }

  async checkBox() {
    return this.Collection.aggregate([
      {
        $match: {},
      },
      {
        $group: {
          _id: { cell: '$cell.type' },
        },
      },
    ])
      .toArray()
      .then((data) => data.map(({ _id: { cell } }) => cell));
  }

  async listSequence({ gene, cell }) {
    const query = {};
    if (gene.length) {
      query.gene = { $in: gene };
    }
    if (cell.length) {
      return this.Collection.find({ ...query, 'cell.type': { $in: cell } }).toArray();
    }
    return this.Collection.find({ ...query }).toArray();
  }

  findOneById(id) {
    return this.Collection.findOne({ _id: new ObjectId(id) });
  }
}

export default Scrna;
