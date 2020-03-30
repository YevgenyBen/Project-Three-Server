var db = require("../util/db/db");
var jwt = require("jsonwebtoken");
var pool = db.getPool(); // re-uses existing if already created or creates new one

exports.getAllUsers = (req, res) => {
  try {
    pool.getConnection(function (err, connection) {
      // don't forget to check error
      connection.query("SELECT * FROM users", function (err, result) {
        // don't forget to check error

        res.send(result);
      });
      connection.release();
    });
    connection.release();
  } catch (err) {
    res.send("error" + err);
  }
};

exports.insertUser = (req, res) => {
  let oResponse = {
    result: "failure",
    reason: "",
    payload: "",
    token: ""
  };
  let oUser = req.body.oUser;
  //console.log(oUser);
  try {
    pool.getConnection(function (err, connection) {
      // don't forget to check error

      connection.query(
        "INSERT INTO users (`first_name`, `last_name`, `user_name`, `password`) VALUES (?,?,?,?)",
        [oUser.first_name, oUser.last_name, oUser.user_name, oUser.password],
        function (err, result) {
          if (err) {
            oResponse.reason = err;
            res.send(oResponse);
            return;
          }
          var signedToken = jwt.sign(oUser, "secretkey");
          oResponse.result = "success";
          oResponse.payload = result;
          oResponse.token = signedToken;
          res.send(oResponse);
        }
      );
      connection.release();
    });
  } catch (err) {
    oResponse.reason = err;
    res.send(oResponse);
    return;
  }
};

exports.removeFromFavorite = (req, res) => {
  let oResponse = {
    result: "failure",
    reason: "",
    payload: "",
    token: ""
  };
  let details = req.body;

  try {
    pool.getConnection(function (err, connection) {
      if (err) {
        oResponse.reason = err;
        res.send(oResponse);
        return;
      }
      connection.query(
        "SELECT * FROM users WHERE user_name=?",
        [details.user_name],
        function (err, result) {
          if (err) {
            oResponse.reason = err;
            res.send(oResponse);
            return;
          }
          let userId = result[0].id;
          connection.query("DELETE FROM user_vacation WHERE u_id='?' AND v_id=?", [userId, details.vacationId], function (err, result) {
            if (err) {
              oResponse.reason = err;
              res.send(oResponse);
              return;
            }
            oResponse.result = "success";
            res.send(oResponse);
          })
        }
      );
      connection.release();
    });
  } catch (err) {
    oResponse.reason = err;
    res.send(oResponse);
    return;
  }

}

exports.addToFavorite = (req, res) => {
  let oResponse = {
    result: "failure",
    reason: "",
    payload: "",
    token: ""
  };
  let details = req.body;
  try {
    pool.getConnection(function (err, connection) {
      if (err) {
        oResponse.reason = err;
        res.send(oResponse);
        return;
      }

      connection.query(
        "SELECT * FROM users WHERE user_name=?",
        [details.user_name],
        function (err, result) {
          if (err) {
            oResponse.reason = err;
            res.send(oResponse);
            return;
          }
          let userId = result[0].id;
          connection.query("INSERT INTO user_vacation (`u_id`,`v_id`) VALUES ('?',?)", [userId, details.vacationId], function (err, result) {
            if (err) {
              oResponse.reason = err;
              res.send(oResponse);
              return;
            }
            oResponse.result = "success";
            res.send(oResponse);
          })
        }
      );
      connection.release();
    });
  } catch (err) {
    oResponse.reason = err;
    res.send(oResponse);
    return;
  }


};
