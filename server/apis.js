const DB = require('./database');
const Obj = require('./constructor');
const Auth = require('./authorization');
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
module.exports = API;
