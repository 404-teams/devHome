'use strict';
require('dotenv').config();
const DB = {};
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
DB.client = client;
/// this function will check if the user is in DB adn return his data if his exicts
DB.checkIfUserInDatabase = function (userInput) {
  let { email } = userInput;
  let SQL = 'SELECT * FROM users WHERE email=$1';
  let safeValues = [email];
  return DB.client.query(SQL, safeValues);
};

/// this function will add new user to the DB and retun his data
DB.addUser = function (userInput) {
  let { username, email, password, img, status, rank } = userInput;
  let SQL =
    'INSERT INTO users (name,email,password,image,status,rank) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
  let safeValues = [username, email, password, img, status, rank];
  return DB.client.query(SQL, safeValues);
};

//********************************************CDN*******************************************

// this function will add CDN to the DB -------------------------
DB.sendDataToDataBase = function (data) {
  let { name, latest, version, description, author, filename, user_id } = data;
  let SQL =
    'INSERT INTO cdns (name,latest,version,description,author,filename,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7);';
  let safeValues = [
    name,
    latest,
    version,
    description,
    author,
    filename,
    Number(user_id),
  ];
  return client.query(SQL, safeValues);
};

// this function will get CDN from DB for each user -------------------------
DB.eachUserCdnData = function (data, id) {
  // let {name,latest,version,description,author,filename} = data;
  let SQL = 'SELECT * FROM cdns  WHERE user_id=$1;';
  let safeValues = [Number(id)];
  return client.query(SQL, safeValues);
};
//**********************************************END******************************************

// function to add the jobs to database
DB.addJobsToDataBase = function (data, user_id) {
  let {
    type,
    company,
    company_url,
    location,
    title,
    description,
    company_logo,
  } = data;
  let SQL =
    'INSERT INTO jobs (type,company,company_url,location,title,description,company_logo,user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);';

  let safeValues = [
    type,
    company,
    company_url,
    location,
    title,
    description,
    company_logo,
    Number(user_id),
  ];
  return client.query(SQL, safeValues);
};

// function to get the saved jobs for each user
DB.getEachUserJobFromDb = function (id) {
  let SQL = 'SELECT * FROM jobs  WHERE user_id=$1;';
  let safeValues = [Number(id)];
  return client.query(SQL, safeValues);
};

DB.addBlog = function (safeValues) {
  let SQL =
    'INSERT INTO blogs (tittle,blog,img,user_id,des) VALUES ($1,$2,$3,$4,$5) RETURNING id';
  return client.query(SQL, safeValues).then((data) => data.rows);
};

DB.showBlog = function (safeValues) {
  let SQL = 'SELECT * FROM blogs WHERE id=$1';
  return client.query(SQL, safeValues);
};

DB.showBlogs = function () {
  let SQL =
    'SELECT b.des, b.tittle,b.img,b.id,u.id as userid,u.name FROM blogs b INNER JOIN users u ON u.id=b.user_id ORDER BY b.id DESC';
  return client.query(SQL);
};

client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error(err.stack));

module.exports = DB;
