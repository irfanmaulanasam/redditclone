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
        console.log('ini udate controlller')
       let {id , email, password, isVerified } = res.locals.user
       user.findOne({
           id
       })
       .then(data=>{
           data.email = email
           data.password = password
           data.isVerified = isVerified
           user.save(data)
       })
       .then(data=>{
           res.status(201).json(data)
       })
       .catch(e=>{
            console.log(e)
           res.status(500).status({
               message:'internal server error'
           })
       })
    }  
    static delete(req,res){
        const {id} = res.locals.user
        user.findById(id)
        .then(data=>{
            data.isActive = false
            user.save(data)
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(e=>{
            console.log(e)
            res.status(500).json({
                message:'internal server error'
            })
        })
    }
}

module.exports = UserController