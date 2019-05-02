module.exports = {
    checkfieldSignUp(req,res,next){
        for (const key in req.body) {
            if (!key) {
                return res.status(201).json({message:`${key} cannot be empty`})
            }
        }
        next()
    }
}