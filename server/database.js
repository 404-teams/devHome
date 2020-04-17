'use strict';
require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);


client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error(err.stack));

module.exports = client;