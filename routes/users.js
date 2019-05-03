var express = require('express');
var router = express.Router();
const {checkfieldSign, userAuthentication} = require('../middlewares')
const usercontroller = require('../controllers/user')
/* GET users listing. */
router.post('/signup',checkfieldSign, usercontroller.signUp)
router.post('/signin',checkfieldSign, userAuthentication, usercontroller.signIn)
router.post('/update',userAuthentication, usercontroller.update)
module.exports = router;
