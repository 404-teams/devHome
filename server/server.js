'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const app = express();
const DB = require('./database');
const API = require('./apis')
const Obj = require('./constructor')
const Auth = require('./authorization')
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

app.get('/cdns',API.cdnFunction);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
app.listen(PORT, () => console.log('hear from port: ' + PORT));
