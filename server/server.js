'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const superagent =require('superagent')
const cors = require('cors');
const methodOverride = require('method-override');
const app = express();
const DB = require('./database');
const API = require('./apis')
const Obj = require('./constructor')
const Auth = require('./authorization')
const queFunctions = require('./queFunctions')
const PORT = process.env.PORT || 3030;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static('./public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

// routs :-
app.get('/questions',queFunctions.getAllQue)
app.get('/question',queFunctions.getQue)
app.get('/addQue',queFunctions.addQue)
app.post('/addNewQ',queFunctions.addNewQ)
app.post('/addAns:id',queFunctions.addAns)
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
app.listen(PORT, () => console.log('hear from port: ' + PORT));
