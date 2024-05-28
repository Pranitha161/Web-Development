const jwt=require('jsonwebtoken')
require('dotenv').config()
function verifytoken(req,res,next){
   
    const bearerToken=req.headers.authorization;
    console.log(bearerToken)
    if(!bearerToken){
        return res.send({Message:"Unauthorized access"})
    }
    const token=bearerToken.split(' ')[1]
    try{
        jwt.verify(token,process.env.SECRET_KEY)
        next()
    }catch(err){
        next(err)
    }
}
module.exports=verifytoken;
