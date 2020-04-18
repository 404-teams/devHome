const DB = require('./database')
const Obj = require('./constructor')
const Auth = require('./authorization')
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
  module.exports = API;