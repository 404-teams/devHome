'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const app = express();
const client = require('./database');
const PORT = process.env.PORT || 3030;

app.use(express.static('./public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
function x(req,res,next){
  console.log(req.query,'dsfds')
  next()
}
app.get('/', x,(req, res) => {
  console.log(req.query.token)
  res.render('layout/header',{data:JSON.stringify([{'h':1},{'h':1}])});
});





app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
app.listen(PORT, () => console.log('hear from port: ' + PORT));
