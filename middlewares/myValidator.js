
const {body}=require('express-validator');
const validate=()=>{
    return [body('title').notEmpty().withMessage('title is required').isLength({min:2}).withMessage('minimum length is 2'),
    body('price').notEmpty().withMessage('price is required')];}
    module.exports={
        validate
    }