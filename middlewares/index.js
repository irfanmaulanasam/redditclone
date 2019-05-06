const user = require('../models/user')
const register = require('../helpers/register')
const token = require('../helpers/token')
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
        if (!req.headers.token) {
            res.status(401).json({ msg: `please provide jwt token` })
        } else {
            token.verify(req.headers.token)
            .then(({id})=>{
                user.findById({
                    id
                })
            })
            .then(data=>{
                if (req.headers.email === data.email) {
                    res.locals.user = data
                    next()
                } else {
                    res.status(401).json({
                        message:'unauthorized verification'
                    })
                }
            })
            .catch(e=>{
                console.log(e)
                res.status(500).json({
                    message:'internal server error'
                })
            })
        }
    }
}