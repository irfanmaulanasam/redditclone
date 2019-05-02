var express = require('express');
var router = express.Router();
const {checkfieldSignUp} = require('../middlewares')
/* GET users listing. */
router.post('/signup',checkfieldSignUp,usercontroller.signup)

module.exports = router;
