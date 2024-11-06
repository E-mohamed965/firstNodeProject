const asyncWrappers=require('../middlewares/asyncWrappers');
const User=require('../model/users.model');
require('dotenv').config();
const httpMessage=require('../utils/httpText');
const appError=require('../utils/appError');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');
const getAllUsers=asyncWrappers(async (req,res)=>{
   
    const query=req.query;
    const limit=query.limit ||10;
    const page=query.page||1;
    const skip=(page-1)*limit;
    const users=await User.find({},{"__v":0,"password":0}).limit(limit).skip(skip);
    res.json({status:httpMessage.SUCCESS,
        data:{
        users}});});

const register=asyncWrappers(async(req,res,next)=>{
    const {firstName,lastName,email,password,role}=req.body;
    const oldUser=await User.findOne({email:email});
    if(oldUser){
        const error=appError.create('user already exists',400,httpMessage.FAIL);
        return next(error);
    }
  const hashedPassword= await bcrypt.hash(password,8)
    const newUser=new User({
        firstName,
        lastName,
        email,
      password: hashedPassword,
      role,
      avatar:req.file.filename
    })
    const token=await generateJWT({email:newUser.email,id:newUser._id,role:newUser.role});
    newUser.token=token;


    await newUser.save();

    res.status(201).json({status:httpMessage.SUCCESS,
        data:{newUser}
    })
})


const login=asyncWrappers(async(req,res,next)=>{
     const {email,password}=req.body
     if(!email&&!password){
        const error=appError.create('email and password are required',400,httpMessage.FAIL);
        return next(error);
     }
    const user=await User.findOne({email:email});
    if(!user){
        const error=appError.create('user not found',500,httpMessage.ERROR);
        return next(error);
    }
    const matchedPassword=await bcrypt.compare(password, user.password);
    console.log(matchedPassword);
    if(user&&matchedPassword){
        const token=await generateJWT({email:user.email,id:user._id,role:user.role});
        res.json({status:httpMessage.SUCCESS,data:{token}});
    }
    else{
        const error=appError.create('something wrong',500,httpMessage.ERROR);
        return next(error);
    }
})

module.exports={
    getAllUsers,
    register,
    login
    
}