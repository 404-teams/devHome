'use strict';
require('dotenv').config();
const DB = {};
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
DB.client =client

DB.sendDataToDataBase = function(data){
    let {name,latest,version,description,author,filename,user_id} = data;
    let SQL='INSERT INTO cdns (name,latest,version,description,author,filename,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7);';
    let safeValues = [name,latest,version,description,author,filename,user_id];
  return client.query(SQL,safeValues);
}



client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error(err.stack));

 



module.exports = DB;
