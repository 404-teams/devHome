const jwt = require('jsonwebtoken');

/// this function to verify the user token
module.exports = (req, res, next) => {
  try {
    // take the baerer auth from the header
    const bearerHeader = req.headers.authorization;
    // check if there is a value
    if (bearerHeader !== undefined) {
      /// take the token from the header
      let decodedToken = bearerHeader.split(' ');
      let token = decodedToken[1];
      ///// verify the token that its not expired and take the id user from it
      jwt.verify(token, 'devhome', (error,data) =>{
        if(error){
          res.status(404).send('token is end');
        }
        req.body.id = data.id;
        return next();
      });
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};