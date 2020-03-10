var jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(bearerToken, "secretkey", (err, authData) => {
      if (err) {
        res.status(403).send("Forbidden");
      } else {
        next();
      }
    });
  } else {
    //forbidden
    res.status(403).send("Forbidden");
  }
};
