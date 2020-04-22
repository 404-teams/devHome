const jwt = require('jsonwebtoken');

/// this function to verify the user token
module.exports = (req, res, next) => {
  try {
    // take the baerer auth from the header
    const bearerHeader = req.headers.authorization;
    // check if there is a value
console.log(bearerHeader)
    if (bearerHeader !== 'bearer undefined') {

      /// take the token from the header
      let decodedToken = bearerHeader.split(' ');
      let token = decodedToken[1];
      ///// verify the token that its not expired and take the id user from it


      const userData = jwt.verify(token, 'devhome');
      //// check if the user is the same for the request
      console.log('inside')

      if (userData.id === Number(req.params.id)) {
        //// allow the process

        next();
      } else {
        
        res.send('not the same user');
      }
    } else {
      res.send('please login or singup');

      //       jwt.verify(token, 'devhome', (error,data) =>{
      //         if(error){
      //           res.status(404).send('token is end');
      //         }
      //         req.body.id = data.id;
      //         return next();
      //       });
    }
  } catch {
    
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
