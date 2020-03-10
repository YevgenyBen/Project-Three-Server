var db = require("../util/db/db");
var pool = db.getPool(); // re-uses existing if already created or creates new one

exports.getAllUsers = (req, res) => {
  try {
    pool.getConnection(function(err, connection) {
      // don't forget to check error
      connection.query("SELECT * FROM users", function(err, result) {
        // don't forget to check error

        res.send(result);
      });
    });
  } catch (err) {
    res.send("error" + err);
  }
};

exports.insertUser = (req, res) => {
  let oUser = req.body.oUser;
  //console.log(oUser);
  try {
    pool.getConnection(function(err, connection) {
      // don't forget to check error
      connection.query(
        "INSERT INTO users (`first_name`, `last_name`, `user_name`, `password`) VALUES (?,?,?,?)",
        [oUser.first_name, oUser.last_name, oUser.user_name, oUser.password],
        function(err, result) {
          // don't forget to check error
          res.send(result);
        }
      );
    });
  } catch (err) {
    res.send("error" + err);
  }
};
