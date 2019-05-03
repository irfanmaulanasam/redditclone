const user = require('../models/user')
const token = require('../helpers/token')

class UserController{
    static signUp(req,res){
        user.create(
            req.body
        )
        .then(data=>{
            // console.log(data,'ini data token')
            res.status(201).json(data)
        })
        .catch(e=>{
            console.log(e)
            res.status(500).json({
                message:"internal server error"
            })
        })
    }
    static signIn(req,res){
        token.create(res.locals.user.id)
        .then(data=>{
            res.status(201).json({
                username:res.locals.user.email.split('@')[0],
                token:data,
                email:res.locals.user.email
            })
        })
        .catch(e=>{
            console.log(e)
            res.status(500).json({
                message:'internal server error'
            })
        })
    }
    static update(req,res){
        
    }
    static delete(req,res){

    }
}

module.exports = UserController