var jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  //postman version
  // const bearerHeader = req.headers["authorization"]
  //web version
  const bearerHeader = req.headers["header"]
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    //postman version
    // const bearerToken = bearer[1];
    //web version
    const bearerToken = bearer[2];
    req.token = bearerToken;

    jwt.verify(bearerToken, "secretkey", (err, authData) => {
      if (err) {
        res.status(403).send("Forbidden");
      } else {
        req.authData = authData
        next();
      }
    });
  } else {
    //forbidden
    res.status(403).send("Forbidden");
  }
};
