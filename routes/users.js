var express = require('express');
var router = express.Router();
const {checkfieldSign, userAuthentication, userAuthorization} = require('../middlewares')
const usercontroller = require('../controllers/user')
/* GET users listing. */
router.post('/signup',checkfieldSign, usercontroller.signUp)
router.post('/signin',checkfieldSign, userAuthentication, usercontroller.signIn)
router.put('/update/:id', userAuthorization, usercontroller.update)
module.exports = router;
