var db = require("../util/db/db");
var jwt = require("jsonwebtoken");
var pool = db.getPool(); // re-uses existing if already created or creates new one
const usersController = require("../controllers/usersController");
/**
 *
 * Will need toclean up request and response
 */


//login
exports.verifyUser = (req, res) => {
  let oResponse = {
    result: "failure",
    reason: "",
    payload: "",
    token: ""
  };
  let loginInfo = req.body.oLoginUser;
  //check if anything send
  if (!loginInfo.UserName) {
    oResponse.reason = "nothing sent"
    res.json(oResponse);
    return;
  }
  try {
    pool.getConnection(function (err, connection) {
      if (err) {
        res.json(err);
        return;
      }
      // don't forget to check error
      connection.query(
        "SELECT * FROM users WHERE user_name=?",
        [loginInfo.UserName],
        function (err, qResult) {
          //if user name DOES NOT exist
          if (qResult.length < 1) {
            oResponse.reason = "Bad user name or password"
            res.json(oResponse);
            return;
          }
          if (qResult[0].password == loginInfo.Password) {
            var token = jwt.sign(loginInfo, "secretkey");
            oResponse.result = "success"
            oResponse.token = token
            res.json(oResponse);
          } else {
            // res.send(qResult);
            oResponse.reason = "Bad user name or password"
            res.json(oResponse);
          }
        }
      );
    });
  } catch (err) {
    res.json(err);
  }
};


//signup
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
    pool.getConnection(function (err, connection) {
      if (err) {
        oResponse.reason = err;
        res.json(oResponse);
        return;
      }
      connection.query(
        "SELECT * FROM users WHERE user_name=?",
        [signUpInfo.user_name],
        function (err, qResult) {
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
