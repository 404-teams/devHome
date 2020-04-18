const superagent = require('superagent');

const DB = require('./database')
const Obj = require('./constructor')
const Auth = require('./authorization')
const API = {};

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

