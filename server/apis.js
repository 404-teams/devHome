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

