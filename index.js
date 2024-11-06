const express = require('express');
require('dotenv').config();
const app=express();
const path=require('path');
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
const mongoose=require('mongoose');
const httpMessage=require('./utils/httpText');
const cors = require('cors');
const url=process.env.MONGO_URL;
mongoose.connect(url).then(()=>{
    console.log('connected')
})
const {body,validationResult}=require('express-validator');
const route=require('./routes/courses.route');
const userRoute=require('./routes/users.route');
app.use(cors());
app.use(express.json())

app.use('/api/courses',route);
app.use('/api/users',userRoute)
app.all('*',(req,res,next)=>{
    return res.status(404).json({
        status:httpMessage.ERROR,
        Message:"Route Not Found"
    })
})

app.use((error,req,res,next)=>{
     res.status(error.statusCode || 500).json({
        status:error.statusText||httpMessage.ERROR,
        message:error.message,
        data:null
     })
})
const port=process.env.PORT;
app.listen(process.env.PORT,()=>{
    console.log(`listening on port: ${port}`);
})