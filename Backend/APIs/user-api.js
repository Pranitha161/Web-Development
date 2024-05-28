const express = require('express');
const userapp = express.Router();
const bcryptjs=require('bcryptjs');
const expressAsyncHandler=require("express-async-handler")
const jwt=require('jsonwebtoken')
const verifytoken=require('../middlewares/verifytoken')
require('dotenv').config()
userapp.use((req,res,next)=>{
    usercollection=req.app.get('usercollection');
    articlecollection=req.app.get('articlecollection');
    next()
})
//reading all users
userapp.get('/users',expressAsyncHandler(async(req,res)=>{
    let users=await usercollection.find().toArray();
    res.send({message:"Users",payload:users})
}))
//registering new user
userapp.post('/users',expressAsyncHandler(async(req,res)=>{
    const newuser=req.body;
    const dbuser=await usercollection.findOne({username:newuser.username})
    if(dbuser!==null){
        res.send({Message:"User existed"});
    } else{
        const hashedpass=await bcryptjs.hash(newuser.password,6)
        newuser.password=hashedpass;
        await usercollection.insertOne(newuser);
        res.send({Message:"User created"});
    }
}))
// login of existing user
userapp.post('/login',expressAsyncHandler(async(req,res)=>{
    const newuser=req.body;
    const dbuser=await usercollection.findOne({username:newuser.username})
    if(dbuser===null){
        res.send({Message:"Invalid user"})
    }else{
        const status=await bcryptjs.compare(newuser.password,dbuser.password)
        if(status===false){
            res.send({Message:"Invalid password"})
        }else{
            const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            res.send({Message:'login success',token:signedToken,user:dbuser})
        }
    }
}))
//reading all articles 
userapp.get('/article',verifytoken,expressAsyncHandler(async(req,res)=>{
    articlecollection=req.app.get('articlecollection');
    const user=await articlecollection.find({status:true}).toArray();

    res.send({Message:"All articles",payload:user})

}))
//add comment
userapp.post('/comment/:articleId',verifytoken,expressAsyncHandler(async(req,res)=>{
    const id=parseInt(req.params.articleId);
    console.log(id)
    console.log(typeof(id))
    const usercomment=req.body;
    console.log(usercomment)
    const article=await articlecollection.findOne({articleId:id})
    console.log(article)
    if(article!==null){
        await articlecollection.updateOne({articleId:id},{$addToSet:{comments:usercomment}})
        res.send({Message:"Comment successfully added"})
    }else{
        res.send({Message:"Invalid article"})
    }

}))
// userapp.get('/protected',(req,verifyToken,res)=>{
//     console.log(req.headers)
//     res.send({Message:"This is protected info"})
// })

module.exports = userapp;
 
