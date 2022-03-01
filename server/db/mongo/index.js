import MongoDbDriver from 'mongodb';
import { DB } from '../index.js';
import { Scrna } from './scrna.js';
import { Matrix } from './matrix.js';

const uri = process.env.MONGODB_URL || 'mongodb+srv://vaibhav:9999888777@cluster0.3u5rr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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
      matrix: new Matrix({ db }),
    });
  }
}

export default MongoDB;
