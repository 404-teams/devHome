
'use strict';
const DB = require('./database');
const Obj = require('./constructor');
const Auth = require('./authorization');
const jwt = require('jsonwebtoken');
const superagent = require('superagent')


const API = {};

// this function to signup the new users
API.signup = function (req, res) {
  let userInput = new Obj.user(req.body);
  /// will check if the user is alrady in DB
  DB.checkIfUserInDatabase(userInput).then((data) => {
    if (data.rows.length > 0) {
      return res.send('this user is here');
    } else {
      /// if the user not in DB will create new user and send his data
      DB.addUser(userInput).then((data) => {
        res.send(data);
      });
    }
  });
};

//// this function to login the user
API.login = function (req, res) {
  /// ask for the data of the user depende on the email from DB
  DB.checkIfUserInDatabase(req.body).then((data) => {
    //// check if the uer is in the DB or not
    if (data.rows.length !== 0) {
      let { id, email } = data.rows[0];
      /// check if the user have the right password or not
      if (req.body.password === data.rows[0].password) {
        /// create a token for the uer with expires in 1 min and send it back to the clinet side
        let token = jwt.sign(
          { id, email },
          'devhome',{ expiresIn: 60 }
        );
        return res.send(token);
        //// if the user input the wrong password 
      } else {
        return res.send('wrong password');
      }
    } else {
      //// if the user not signup or input the wrong email
      return res.send('this email is not signup please signup');
    }
  });
};

API.error = (req, res, next) => {
  res.status(404).send("Sorry can't find that!");
};


API.cdnFunction = function(req,res) {
getCdn()
.then( results => {
    res.send({cdns:results});
    // res.render('views/cdns', {cdns:results});
})
}
function getCdn(){
    let url = `https://api.cdnjs.com/libraries?fields=version,description,author,filename,keywords`;
    return superagent.get(url)
.then(cdnData => {
    return cdnData.body.results.map( val =>{
    return new Obj.Cdn(val) ;
    })
})}

API.searchOfCdn = function(req,res){
    const search = req.query.search_query;
    searchResult(search)
    .then(results => {
        res.send({searchCdn:results});
    })
}

function searchResult(search){
    let url = `https://api.cdnjs.com/libraries?search=${search}&fields=version,description,author,keywords`;
    return superagent.get(url)
.then(searchData => {
    return searchData.body.results.map( val =>{
    return new Obj.Cdn(val) ;
    })
})
}

API.saveDataForCdnToDataBase = function(req,res){
    DB.sendDataToDataBase(req.body)
   .then (res.send('all good'));
  }

  API.getEachUserCdnData = function(req,res){
    DB.eachUserCdnData(req.query, req.params.user_id)
    .then (res.send('all good'));
  }



// function to render home page 
API.homePage=function(req,res){
  res.render('index');
}

// function to go to the search page 
API.goToSearchPage=function(req,res){
  res.render('jobs/search.ejs');
}

// function to show the result of the jobs
API.searchJobResult = function (req, res) {
  // console.log('rrrrrrrrrrrr',req.body);
  // let url = `https://jobs.github.com/positions.json?description=${req.body.description}&location=${req.body.location}&full_time=`;
  // console.log('ssssssssssss',url);

  // if (req.body.type === 'on') {
  //   url += `true`;

  // }
  let url = `https://jobs.github.com/positions.json`;
  superagent.get(url)
    .then(data => {
      let result = data.body.map(val => {
        return new Obj.Job(val);
      })
      // console.log('rrrrrrrrrrrrrrrrrrr',result);
      // res.render('jobs/job.ejs', { job: result });
      res.send(result );


    })

};
// function to  save specific job
API.savedJobs=function(req,res){

  DB.addJobsToDataBase(req.body)
  
    .then((data) => {
        res.send(data);
    })
}

// function to show the saved jibs for each user 
API.eachUserJob =function(req,res){
  DB.getEachUserJobFromDb( req.params.user_id)
    .then((data) => {
        res.send(data);
    }) 
}


  module.exports = API;

