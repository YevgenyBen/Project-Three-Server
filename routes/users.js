var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController');

//get all users
router.get('/', usersController.getAllUsers);

//insert new user 
router.post('/',usersController.insertUser)

module.exports = router;
