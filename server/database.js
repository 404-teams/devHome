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

DB.sendDataToDataBase = function(data){
    let {name,latest,version,description,author,filename,user_id} = data;
    let SQL='INSERT INTO cdns (name,latest,version,description,author,filename,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7);';
    let safeValues = [name,latest,version,description,author,filename,Number(user_id)];
  return client.query(SQL,safeValues);
}


DB.eachUserCdnData = function(data,id){
  let {name,latest,version,description,author,filename} = data;
  let SQL='SELECT * FROM cdns SET name=$1 ,latest=$2 ,version=$3 ,description=$4,author=$5,filename=$6 WHERE user_id=$7;';
  let safeValues = [name,latest,version,description,author,filename,Number(id)];
  return client.query(SQL,safeValues);
}

client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error(err.stack));

 



module.exports = DB;
