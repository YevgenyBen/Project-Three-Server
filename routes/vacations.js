var express = require("express");
var tokenVerfier = require("../controllers/tokenController");
var router = express.Router();


const vacationsController = require("../controllers/vacationsController");

//get all vacations
router.get("/:user", tokenVerfier.verifyToken, vacationsController.getAllVacations);

//get all favorties for admin
router.get("/", tokenVerfier.verifyToken, vacationsController.getAllFavoriteVacations);

//insert new vacation
router.post("/", tokenVerfier.verifyToken, vacationsController.insertVacation);

//upload file
router.post("/upload", tokenVerfier.verifyToken, vacationsController.uploadFile);

//delete vacation
router.post("/delete", tokenVerfier.verifyToken, vacationsController.deleteVacation);

//update vacation
router.post("/update", tokenVerfier.verifyToken, vacationsController.updateVacation);

module.exports = router;
