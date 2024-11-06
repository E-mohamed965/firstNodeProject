const express = require('express');
const verifyToke = require('../middlewares/verifyToken');
const {body}=require('express-validator');
const {validate}=require('../middlewares/myValidator');
const router=express.Router();

const controler=require('../controlers/controlers');
const userRoles = require('../utils/userRoles');
const allowedTo=require('../middlewares/allowedTo');
router.route('/')
.get(controler.getAllCourses)
.post( validate(),controler.createNewCourse)

router.route('/:courseId')
 .get(controler.getSingleCourse)
.patch(controler.updateCourse)
.delete(verifyToke.verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),controler.deleteCourse)


module.exports= router