const DB = require('./database');
const Obj = require('./constructor');
const Auth = require('./authorization');
const jwt = require('jsonwebtoken');

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
        /// create a token for the uer and send it back to the clinet side
        let token = jwt.sign(
          { user: { id, email }, expiresIn: '30s' },
          'devhome'
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
module.exports = API;
