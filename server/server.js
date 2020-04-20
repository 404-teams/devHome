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

//------------------ jobs route ------------------
app.get('/',API.homePage);
app.get('/jobs/search',API.goToSearchPage); ///////////// rework on it
app.get('/jobs',API.searchJobResult);
app.post('/jobs/save',API.savedJobs);
app.get('/jobs/user/:id',API.eachUserJob);

// -------------end of jobs route------------------

// routs :-
app.get('/',API.homePage);
app.get('/questions',queFunctions.getAllQue)
app.get('/question',queFunctions.getQue)
app.get('/addQue',queFunctions.addQue)
app.post('/addNewQ',queFunctions.addNewQ)
app.post('/addAns:id',queFunctions.addAns)

//------------------ CDN route ------------------

app.get('/cdns/search' , API.searchOfCdn);
app.post('/cdns/save' , API.saveDataForCdnToDataBase);
app.get('/cdns/user/:id' , API.getEachUserCdnData);
app.get('/cdns',API.cdnFunction);
app.post('/signup',API.signup);
app.get('/signupNewUser', API.creatNewUser);

// -------------end of CDN route------------------

app.post('/login/create',API.login)


app.get('/blog',API.blog)

app.get('/login',API.logintest)



app.use(API.error);

app.listen(PORT, () => console.log('hear from port: ' + PORT));
