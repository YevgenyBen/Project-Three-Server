var express = require("express");
var router = express.Router();
var tokenVerfier = require("../controllers/tokenController");

const usersController = require("../controllers/usersController");

//get all users
router.get("/", tokenVerfier.verifyToken, usersController.getAllUsers);

//insert new user
router.post("/", tokenVerfier.verifyToken, usersController.insertUser);

module.exports = router;
