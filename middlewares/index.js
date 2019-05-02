module.exports = {
    checkfieldSignUp(req,res,next){
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
    }
}