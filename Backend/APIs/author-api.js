const express = require('express');
const authorapp = express.Router();
const expressAsyncHandler=require('express-async-handler')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const verifytoken=require('../middlewares/verifytoken');
const { ReturnDocument } = require('mongodb');
require('dotenv').config()
authorapp.use((req,res,next)=>{
    authorcollection=req.app.get('authorcollection');
    articlecollection=req.app.get('articlecollection')
    next()
})
authorapp.get('/authors',expressAsyncHandler(async(req,res)=>{
    const authors=await authorcollection.find().toArray();
    res.send({Message:"Authors List",payload:authors})
}))
authorapp.post('/register',expressAsyncHandler(async(req,res)=>{
    const newuser=req.body;
    const dbuser=await authorcollection.findOne({username:newuser.username})
    if(dbuser!==null){
        res.send({Message:"User existed"});
    } else{
        const hashedpass=await bcrypt.hash(newuser.password,6)
        newuser.password=hashedpass;
        await authorcollection.insertOne(newuser);
        res.send({Message:"User created"});
    }
}))
authorapp.post('/login',expressAsyncHandler(async(req,res)=>{
    const newuser=req.body;
    const dbuser=await authorcollection.findOne({username:newuser.username})
    if(dbuser===null){
        res.send({Message:"Invalid user"})
    }else{
        const status=await bcrypt.compare(newuser.password,dbuser.password)
        console.log(status)
        if(status===false){
            res.send({Message:"Invalid password"})
        }else{
            const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            res.send({Message:'login success',token:signedToken,user:dbuser})
        }
    }
}))
authorapp.post('/article',verifytoken,expressAsyncHandler(async(req,res)=>{
    const newArticle=req.body;
    console.log(newArticle)
    await articlecollection.insertOne(newArticle)
    res.send({Message:"New Article created"})
 }))
 authorapp.put('/article',verifytoken,expressAsyncHandler(async(req,res)=>{
    const modifiedArticle=req.body;
    const result = await articlecollection.updateOne(
        { articleId: modifiedArticle.articleId },
        { $set: modifiedArticle }
    );
    let latestArticle=await articlecollection.findOne({articleId:modifiedArticle.articleId})
    res.send({Message:"Article modified",article:latestArticle})
   
 }))
 authorapp.put('/article/:articleId',verifytoken,expressAsyncHandler(async(req,res)=>{
    const object=req.body
    const id=parseInt(req.params.articleId);
    console.log(object)
    console.log(typeof(id))
    if(object.status===true){
        let modifiedArticle=await articlecollection.findOneAndUpdate({articleId:id},{$set:{...object,status:false}},{returnDocument:"after"})
        console.log(modifiedArticle)
        res.send({Message:"article deleted",payload:modifiedArticle})
    }
    if(object.status===false){
        let modifiedArticle=await articlecollection.findOneAndUpdate({articleId:id},{$set:{...object,status:true}},{returnDocument:"after"})
        res.send({Message:"article restored",payload:modifiedArticle})
    }
   
 }))
 authorapp.get('/articles/:username',verifytoken,expressAsyncHandler(async(req,res)=>{
    let username=req.params.username
    const articlesList=await articlecollection.find().toArray();
    res.send({Message:"List of articles",payload:articlesList})
 }))
module.exports=authorapp;
