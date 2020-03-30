var express = require("express");
var router = express.Router();
var tokenVerfier = require("../controllers/tokenController");

const usersController = require("../controllers/usersController");

//get all users
router.get("/", usersController.getAllUsers);

//insert new user
router.post("/", usersController.insertUser);

//add vacation to favortie 
router.post("/add", usersController.addToFavorite)

//remove from favorite
router.post("/delete", usersController.removeFromFavorite)

module.exports = router;
