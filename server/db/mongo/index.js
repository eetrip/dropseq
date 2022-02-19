import MongoDbDriver from 'mongodb';
import { DB } from '../index.js';
import { Scrna } from './scrna.js';

const uri = process.env.MONGODB_URL || 'mongodb://localhost:27017/';
const dataBase = process.env.MONGODB_DB || 'dropseq';
const { MongoClient } = MongoDbDriver;

const mongoDb = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

await mongoDb.connect();

const db = mongoDb.db(dataBase);

export class MongoDB extends DB {
  constructor() {
    super({
      scrna: new Scrna({ db }),
    });
  }
}

export default MongoDB;
