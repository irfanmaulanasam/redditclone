const user = require('../models/user')
const register = require('../helpers/register')
module.exports = {
    checkfieldSign(req,res,next){
        if (!req.body.email) {
            res.status(204).json({
                message:"email can't be empty"
            })
        } else if (!req.body.password) {
                res.status(204).json({
                    message:"password can't be empty"
                })
        } else {
            next()
        }
    },
    userAuthentication(req,res,next){

        user.findOne({email:req.body.email})
        .then(data=>{
            if(!data){
            res.status(304).json({
                message:'email/password is invalid'
            });
            } else if (register.checkPassword(req.body.password, data.password)) {
                res.locals.user = data
                next()
            } else {
                res.status(304).json({
                    message:'email/password is invalid'
                });
            }
        })
    },
    userAuthorization(req,res,next){

    }
}