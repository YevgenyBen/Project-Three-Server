var db = require("../util/db/db");
var pool = db.getPool(); // re-uses existing if already created or creates new one

exports.getAllVacations = (req, res) => {
  let oResponse = {
    result: "failure",
    reason: "",
    payload: {},
    token: "",
    role: "",
    favoriteVacations: [],
    allVacations: []

  };

  try {
    pool.getConnection(function (err, connection) {
      if (err) {
        res.send("error" + err);
        return;
      }
      let userName = req.params.user
      connection.query("SELECT id FROM users WHERE user_name=?", [userName], (err, result) => {
        if (err) {
          res.send("error" + err);
          return;
        }
        let userId = result[0].id;

        connection.query("SELECT * FROM user_vacation WHERE u_id=?", [userId], function (err, result) {
          // don't forget to check error
          if (err) {
            res.send("error" + err);
            return;
          }
          let favoriteVacations = result;

          connection.query("SELECT * FROM vacations", function (err, result) {
            // don't forget to check error
            if (err) {
              res.send("error" + err);
              return;
            }
            let allVacations = result;
            oResponse.payload.favoriteVacations = favoriteVacations;
            oResponse.payload.allVacations = allVacations
            oResponse.result = "success"
            res.json(oResponse);
          });

        });
      })
      connection.release();
    });
  } catch (err) {
    res.json(oResponse);
  }
};

exports.insertVacation = (req, res) => {
  let oVacation = req.body;
  console.log(oVacation);
  try {
    pool.getConnection(function (err, connection) {
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
        function (err, result) {
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
