'use strict';
require('dotenv').config();
const DB = {};
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
DB.client =client
/// this function will check if the user is in DB adn return his data if his exicts
DB.checkIfUserInDatabase = function(userInput){
  let { email} = userInput;
  let SQL = 'SELECT * FROM users WHERE email=$1';
  let safeValues = [email];
 return DB.client.query(SQL, safeValues)
}

/// this function will add new user to the DB and retun his data
DB.addUser = function(userInput){
  let { username, email, password, img, status, rank } = userInput;
  let SQL = 'INSERT INTO users (name,email,password,image,status,rank) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *'
      let safeValues = [username,email,password,img,status,rank]
     return DB.client.query(SQL,safeValues)
      
}



























client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error(err.stack));

module.exports = DB;
