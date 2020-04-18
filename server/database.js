'use strict';
require('dotenv').config();
const DB = {};
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
DB.client =client

// function to add the jobs to database 
DB.addJobsToDataBase=function(data){
  let { type, company, company_url, location,title,description,company_logo,user_id }=data;
  let SQL = 'INSERT INTO jobs (type,company,company_url,location,title,description,company_logo,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);';
  
  let safeValues = [type,company,company_url,location,title,description,company_logo,Number(user_id)];
  return client.query(SQL, safeValues)
}

// function to get the saved jobs for each user
DB.getEachUserJobFromDb=function(id){
  let SQL = 'SELECT * FROM jobs  WHERE user_id=$1;';
  let safeValues = [Number(id)];
  return client.query(SQL, safeValues)

}

client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error(err.stack));

module.exports = DB;
