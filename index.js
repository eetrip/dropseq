import 'dotenv/config.js';
import InitiateServer from './server/express/index.js';

const app = new InitiateServer();
app.appExecute();
