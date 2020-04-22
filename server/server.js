'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const superagent =require('superagent')
const cors = require('cors');
const methodOverride = require('method-override');
const app = express();

//------------------ Import ------------------
const DB = require('./database');
const API = require('./apis')
const Obj = require('./constructor')
const Auth = require('./authorization')
const abdAuth = require('./abdAuth')
const queFunctions = require('./queFunctions')
//------------------ End of Import ------------------


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

app.get('/', API.homePage);
app.get('/jobs/search', API.goToSearchPage); ///////////// rework on it
app.get('/jobs', API.searchJobResult);
app.post('/jobs/save/:id', Auth, API.savedJobs);
app.get('/jobs/user/:id',Auth, API.eachUserJob);


// -------------end of jobs route------------------


// -------------Ask/Solve routes------------------
app.get('/',API.homePage);
app.get('/questions',queFunctions.getAllQue)
app.get('/question',queFunctions.getQue)
app.get('/myQue',abdAuth,queFunctions.myQue)
app.get('/userPofile',queFunctions.getUser)
app.post('/addNewQ',abdAuth,queFunctions.addNewQ)
app.post('/addAns:id',abdAuth,queFunctions.addAns)
app.post('/addRep:id',abdAuth,queFunctions.addRep)
app.put('/rankAns',queFunctions.rankAns)
app.put('/ans_approved',abdAuth,queFunctions.ans_approved)

// -------------endAsk/Solve routes------------------


//------------------ CDN route ------------------

app.get('/cdns/search' , API.searchOfCdn);
app.post('/cdns/save/:id',Auth , API.saveDataForCdnToDataBase);
app.get('/cdns/user/:id' , Auth,API.getEachUserCdnData);
app.get('/cdns',API.cdnFunction);
app.post('/signup',API.signup);
app.get('/signupNewUser', API.creatNewUser);

// -------------end of CDN route------------------

app.post('/login/create',API.login)


app.get('/blogs',API.showBlogs)
app.get('/blog/create/:id',Auth,API.blog)
app.get('/login',API.logintest)

app.get('/blog/create',API.addblog)
app.post('/blog/create/save',API.addBlog)
app.get('/blog',API.showBlog)

app.use(API.error);

app.listen(PORT, () => console.log('hear from port: ' + PORT));
 