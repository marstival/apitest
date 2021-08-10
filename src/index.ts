import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { accountRouter } from './routes/account';
const bodyParser = require('body-parser');

const app = express();

module.exports = app;

app.use(bodyParser.json());

app.use(accountRouter);

app.all('*', async (req, res, next) => {
  //requires express-async-errors use throw new Error with async functions
  throw new Error('not found');
});

const start = async () => {
  try {
    console.log('Starting ...');
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log('Listening on port 3000!!');
});

start();
