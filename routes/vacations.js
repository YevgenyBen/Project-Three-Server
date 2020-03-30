var express = require("express");
var tokenVerfier = require("../controllers/tokenController");
var router = express.Router();

const vacationsController = require("../controllers/vacationsController");

//get all vacations
router.get("/:user", tokenVerfier.verifyToken, vacationsController.getAllVacations);

//insert new vacation
router.post("/", tokenVerfier.verifyToken, vacationsController.insertVacation);

module.exports = router;
