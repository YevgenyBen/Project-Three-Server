var express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController');

//send login data
router.post('/', loginController.verifyUser);

module.exports = router;
