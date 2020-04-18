const DB = require('./database')
const Obj = require('./constructor')
const Auth = require('./authorization')
const superagent = require('superagent')
const API = {};
module.exports = API;

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
