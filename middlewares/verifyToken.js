const jwt=require('jsonwebtoken');
const httpMessage=require('../utils/httpText');
const appError=require('../utils/appError');
const verifyToken=(req,res,next)=>{
    const authHeader=req.headers['Authorization']||req.headers['authorization'];
    if(!authHeader){
        const error=appError.create('token is required',401,httpMessage.ERROR);
        return next(error);
    }
    const token=authHeader.split(' ')[1];
   try{
   const currentUser= jwt.verify(token,process.env.JWT_SECRET_kEY);
  req.currentUser=currentUser;
    next();
}
   catch{
    const error=appError.create('invali token',401,httpMessage.ERROR);
        return next(error);
   }
    
}
module.exports= {verifyToken};