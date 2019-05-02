var express = require('express');
var router = express.Router();
const {checkfieldSignUp} = require('../middlewares')
const usercontroller = require('../controllers/user')
/* GET users listing. */
router.post('/signup',checkfieldSignUp,usercontroller.signUp)

module.exports = router;
