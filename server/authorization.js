const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      let decodedToken = bearerHeader.split(' ');
      let token = decodedToken[1];
      const userData = jwt.verify(token, 'devhome');
      res.send({ userData, key: 'jfdslkj' });
    }
    //   const userId = decodedToken.userId;
    //   if (req.body.userId && req.body.userId !== userId) {
    //     throw 'Invalid user ID';
    //   } else {
    //     next();
    //   }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
      jkdlsjf: 'kdsjfkj',
    });
  }
};

// module.exports = Auth;
