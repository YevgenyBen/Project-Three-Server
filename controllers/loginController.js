var db = require("../util/db/db");
var jwt = require("jsonwebtoken");
var pool = db.getPool(); // re-uses existing if already created or creates new one
const usersController = require("../controllers/usersController");
/**
 *
 * Will need toclean up request and response
 */

exports.verifyUser = (req, res) => {
  let loginInfo = req.body;
  //check if anything send
  if (!loginInfo.user_name) {
    res.end("nothing sent");
    return;
  }
  try {
    pool.getConnection(function(err, connection) {
      // don't forget to check error
      connection.query(
        "SELECT * FROM users WHERE user_name=?",
        [loginInfo.user_name],
        function(err, qResult) {
          //if user name DOES NOT exist
          if (qResult.length < 1) {
            res.json("no such username");
            return;
          }
          if (qResult[0].password == loginInfo.password) {
            // res.send(qResult);
            var token = jwt.sign(loginInfo, "secretkey");
            // jwt.sign(loginInfo, "secretkey", (err, token) => {
            //   res.send({ token });
            // });
          } else {
            // res.send(qResult);
            res.json("Bad user name or password");
          }
        }
      );
    });
  } catch (err) {
    res.json(err);
  }
};

exports.signUp = (req, res) => {
  let oResponse = {
    result: "failure",
    reason: "",
    payload: "",
    token: ""
  };

  let signUpInfo = req.body.oUser;
  //check if anything send
  if (!signUpInfo.user_name) {
    oResponse.reason = "nothing sent";
    res.json(oResponse);
    return;
  }
  try {
    pool.getConnection(function(err, connection) {
      if (err) {
        oResponse.reason = err;
        res.json(oResponse);
        return;
      }
      connection.query(
        "SELECT * FROM users WHERE user_name=?",
        [signUpInfo.user_name],
        function(err, qResult) {
          if (err) {
            oResponse.reason = err;
            res.json(oResponse);
            return;
          }
          //if username DOES exist
          if (qResult.length > 0) {
            oResponse.reason = "user name taken";
            res.json(oResponse);
            return;
          } else {
            usersController.insertUser(req, res);
          }
        }
      );
    });
  } catch (err) {
    res.json(err);
  }
};
