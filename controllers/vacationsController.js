var db = require("../util/db/db");
var pool = db.getPool(); // re-uses existing if already created or creates new one

exports.getAllVacations = (req, res) => {
  try {
    pool.getConnection(function(err, connection) {
      if (err){
        res.send("error" + err);
        return;
      }
      // don't forget to check error
      connection.query("SELECT * FROM vacations", function(err, result) {
        // don't forget to check error

        res.send(result);
      });
      connection.release();
    });
  } catch (err) {
    res.send("error" + err);
  }
};

exports.insertVacation = (req, res) => {
  let oVacation = req.body;
  console.log(oVacation);
  try {
    pool.getConnection(function(err, connection) {
      // don't forget to check error
      connection.query(
        "INSERT INTO `vacations`(`content`, `destination`, `picture`, `from_date`, `to_date`, `price`) VALUES (?,?,?,?,?,?)",
        [
          oVacation.content,
          oVacation.destination,
          oVacation.picture,
          oVacation.from_date,
          oVacation.to_date,
          oVacation.price
        ],
        function(err, result) {
          // don't forget to check error

          res.send(result);
        }
      );
      connection.release();
    });
  } catch (err) {
    res.send("error" + err);
  }
};
