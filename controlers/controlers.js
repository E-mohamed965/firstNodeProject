

const {validationResult}=require('express-validator');
const httpMessage=require('../utils/httpText');
const Course=require('../model/mongoose.models');
const asyncWrappers = require('../middlewares/asyncWrappers');
const appError=require('../utils/appError');
const getAllCourses=asyncWrappers(async (req,res)=>{
    const query=req.query;
    const limit=query.limit ||10;
    const page=query.page||1;
    const skip=(page-1)*limit;
    const courses=await Course.find({},{"__v":0}).limit(limit).skip(skip);
    res.json({status:httpMessage.SUCCESS,
        data:{
        courses}});});

const getSingleCourse=asyncWrappers(
async(req,res,next)=>{
    const course=await Course.findById(req.params.courseId);
    if(!course){
        const error=appError.create("course not found",404,httpMessage.FAIL);
        return next(error);
    }
    res.json(course);
//     try{
//    }
//     catch(err){
//         return res.status(400).json({msg:"invalid Object ID"});
//     }
});

const createNewCourse=asyncWrappers(async(req,res,next)=>{
    console.log(req.body);
    const errors=validationResult(req);
if(!errors.isEmpty()){
    const error=appError.create(errors.array(),400,httpMessage.FAIL)
    return next(error);
}
 const newCourse=new Course(
    req.body
 )
   await newCourse.save();
    res.status(201).json(newCourse)
});

const updateCourse=asyncWrappers(async(req,res,next)=>{
    const Id=req.params.courseId;
     const course=await Course.updateOne({_id:Id},{$set:{...req.body}})
     if(!course.matchedCount){
        const error=appError.create("course not found",404,httpMessage.FAIL);
        return next(error);
     }
    
    res.status(200).json(course);
    

});

const deleteCourse=asyncWrappers(async(req,res)=>{
   await Course.deleteOne({_id:req.params.courseId})
    res.status(200).json({success:true});
});

module.exports={
    getAllCourses,
    getSingleCourse,
    createNewCourse,
    updateCourse,
    deleteCourse
}