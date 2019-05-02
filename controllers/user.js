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
}

module.exports = UserController