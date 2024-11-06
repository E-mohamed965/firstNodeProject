const express = require('express');
const router=express.Router();
const multer=require('multer');
const diskstorage=multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file)
    cb(null,'uploads');
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split('/')[1];
        const fileName=`user-${Date.now()}.${ext}`;
        cb(null,fileName);
    }
})
const fileFilter=(req,file,cb)=>{
    const typ=file.mimetype.split('/')[0];
    if(typ=='image'){
      return  cb(null,true);
    }
    else{
        cb(appError.create('the file must be an image',400),false);
    }
}
const upload=multer({storage:diskstorage,
    fileFilter: fileFilter
});
const verifyToke = require('../middlewares/verifyToken');
const usersController=require('../controlers/user.controller');
const appError = require('../utils/appError');

router.route('/')
.get(verifyToke.verifyToken,usersController.getAllUsers)


router.route('/register')
.post(upload.single('avatar'),usersController.register)

router.route('/login')
.post(usersController.login)
module.exports= router