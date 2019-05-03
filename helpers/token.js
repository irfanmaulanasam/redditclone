const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.JWT_SECRET

module.exports = {
    create(id){
        return new Promise(function(resolve,reject){
            jwt.sign(id,secret,function(err,token) {
                if(!err){
                    resolve(token)
                } else {
                    reject(err)
                }
            });
        })
    },
    verify(token){
        return new Promise((resolve,reject)=>{
            jwt.verify(token,secret,(err,verified)=> {
                if(!err){
                    resolve(verified)
                } else {
                    reject(err)
                }
            })
        })
    }
}
