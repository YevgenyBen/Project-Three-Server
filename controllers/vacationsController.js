//Database
var db = require("../util/db/db");
var pool = db.getPool(); // re-uses existing if already created or creates new one

//Fileupload
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Project-Three-Client/src/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage }).single('file')

//Socket
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', function (socket) {
  console.log("A user is connected");
  socket.on('status added', function (status) {
    io.emit('refresh feed', status);
  });
});



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

exports.updateVacation = (req, res) => {
  let oVacation = req.body;
  console.log(oVacation);
  try {
    pool.getConnection(function (err, connection) {
      if (err) {
        res.send("error" + err);
        return;
      }
      connection.query(
        "UPDATE vacations SET description=?,destination=?,picture=?,from_date=?,to_date=?,price=? WHERE id=?",
        [
          oVacation.description,
          oVacation.destination,
          oVacation.fileName,
          oVacation.fromDate,
          oVacation.toDate,
          oVacation.price,
          oVacation.id
        ],
        function (err, result) {
          if (err) {
            res.send("error" + err);
            return;
          }

          res.send(result);
        }
      );
      connection.release();
    });
  } catch (err) {
    res.send("error" + err);
  }
}

exports.insertVacation = (req, res) => {
  let oVacation = req.body;
  console.log(oVacation);
  try {
    pool.getConnection(function (err, connection) {
      if (err) {
        res.send("error" + err);
        return;
      }
      connection.query(
        "INSERT INTO `vacations`(`description`, `destination`, `picture`, `from_date`, `to_date`, `price`) VALUES (?,?,?,?,?,?)",
        [
          oVacation.description,
          oVacation.destination,
          oVacation.fileName,
          oVacation.fromDate,
          oVacation.toDate,
          oVacation.price
        ],
        function (err, result) {
          if (err) {
            res.send("error" + err);
            return;
          }

          res.send(result);
        }
      );
      connection.release();
    });
  } catch (err) {
    res.send("error" + err);
  }
};

exports.getAllFavoriteVacations = (req, res) => {
  let oResponse = {
    result: "failure",
    reason: "",
    payload: {},
    token: "",
    role: "",
    AllFavoriteVacations: [],
  };

  try {
    pool.getConnection(function (err, connection) {
      // don't forget to check error
      connection.query(

        //SELECT v_id,COUNT(*),v.destination FROM user_vacation uv INNER JOIN vacations v ON uv.v_id = v.id GROUP BY v_id
        "SELECT v_id,COUNT(*) as Favorited,v.destination FROM user_vacation uv INNER JOIN vacations v ON uv.v_id = v.id GROUP BY v_id",
        [],
        function (err, result) {
          if (err) {
            res.send("error" + err);
            return;
          }
          oResponse.result = "success"
          oResponse.payload = result
          res.json(oResponse);
        }
      );
      connection.release();
    });
  } catch (err) {
    res.send("error" + err);
  }
}

exports.uploadFile = function (req, res) {

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)

  })

};

exports.deleteVacation = (req, res) => {
  let oResponse = {
    result: "failure",
    reason: "",
    payload: "",
    token: ""
  };

  let vacationId = req.body.id;

  try {
    pool.getConnection(function (err, connection) {
      if (err) {
        oResponse.reason = err;
        res.send(oResponse);
        return;
      }
      connection.query(
        "DELETE FROM vacations WHERE id=?",
        [vacationId],
        function (err, result) {
          if (err) {
            oResponse.reason = err;
            res.send(oResponse);
            return;
          }
          connection.query("DELETE FROM user_vacation WHERE v_id=?",
            [vacationId],
            function (err, result) {
              if (err) {
                oResponse.reason = err;
                res.send(oResponse);
                return;
              }
              oResponse.result = "success"
              res.json(oResponse)
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
