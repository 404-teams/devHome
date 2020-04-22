'use strict';
const DB = require('./database');
const Obj = require('./constructor');
const Auth = require('./authorization');
const jwt = require('jsonwebtoken');
const superagent = require('superagent');

const API = {};

API.creatNewUser = function (req, res) {
  res.render('signup');
};

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
        let token = jwt.sign({ id, email }, 'devhome', { expiresIn: 1000000 });
        return res.send({ token, userInfo: data.rows[0] });
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

// the function that return the data from API server -------------------------------
API.cdnFunction = function (req, res) {
  getCdn().then((results) => {
    res.render('CDN/cdn', { cdns:JSON.stringify(results.slice(0, 200)) });
    // res.render('views/cdns', {cdns:results});
  });
};

// function to get data from API server ----------------------------------------------
function getCdn() {
  let url = `https://api.cdnjs.com/libraries?fields=version,description,author,filename,keywords`;
  return superagent.get(url).then((cdnData) => {
    return cdnData.body.results.map((val) => {
      return new Obj.Cdn(val);
    });
  });
}

API.searchOfCdn = function (req, res) {
  const search = req.query.search_query;
  searchResult(search).then((results) => {
    res.send(results.slice(0,200));
  });
};

function searchResult(search) {
  let url = `https://api.cdnjs.com/libraries?search=${search}&fields=version,description,author,keywords`;
  return superagent.get(url).then((searchData) => {
    return searchData.body.results.map((val) => {
      return new Obj.Cdn(val);
    });
  });
}

API.saveDataForCdnToDataBase = function (req, res) {
  console.log(req.body)
  DB.sendDataToDataBase(req.body,req.params.id).then(res.send('all good'));
};

API.getEachUserCdnData = function (req, res) {
  DB.eachUserCdnData(req.query, req.params.id).then(data=>res.send(data));
};

// function to render home page
API.homePage = function (req, res) {
  res.render('index');
};

// function to go to the search page
API.goToSearchPage = function (req, res) {
  let url = `https://jobs.github.com/positions.json`;
  superagent.get(url).then((data) => {
    let result = data.body.map((val) => {
      return new Obj.Job(val);
    });
    res.render('jobs/search.ejs', { job: JSON.stringify(result) });
  });
};

// function to show the result of the jobs
API.searchJobResult = function (req, res) {
  let url = `https://jobs.github.com/positions.json?description=${req.query.description}&location=${req.query.location}&full_time=`;
  if (req.query.type === 'on') {
    url += `true`;
  }
  superagent.get(url).then((data) => {
    let result = data.body.map((val) => {
      return new Obj.Job(val);
    });
    res.send(result);
  });
};
// function to  save specific job
API.savedJobs = function (req, res) {
  DB.addJobsToDataBase(req.body, req.params.id).then((data) => {
    res.send('done');
  });
};

// function to show the saved jobs for each user
API.eachUserJob = function (req, res) {
  DB.getEachUserJobFromDb(req.params.id).then((data) => {
    res.send(data);
  });
};

// function to render the login page
API.logintest = function (req, res) {
  res.render('login');
};

API.blog = function (req, res) {
  res.send(true);

  // res.render('pages/wirteblog')

  // res.location('/blog/create/true')
};
API.addblog = function (req, res) {
  // res.send(true)
  res.render('pages/wirteblog');
};

API.addBlog = function (req, res) {
  console.log(req.body)
  let { tittle, blog, img, id, des } = req.body;
  DB.addBlog([tittle, blog, img, id, des]).then((blog) => res.send(blog[0]));
};

API.showBlog = function (req, res) {
  DB.showBlog([req.query.id]).then((blog) =>
    res.render('pages/blog', { blog: blog.rows[0].blog })
  );
};

API.showBlogs = function (req, res) {
  DB.showBlogs().then((blogs) =>{
    console.log(blogs.rows,'sdfdsfsf')
    res.render('pages/blogs', { blogs: JSON.stringify(blogs.rows) })
  }
  );
};

API.error = (req, res, next) => {
  res.status(404).send("Sorry can't find that!");
};

module.exports = API;
